import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { CredentialsConfig } from '../../../config/credentials';
import { Observable } from 'rxjs'

let user = {};

@Injectable()
export class LoginService {

    constructor(
        private _router: Router,
        private http: Http,
        private credentials: CredentialsConfig
    ) { }

    login(){
        let parent = this;
        this.getLogin().subscribe(
            function(res){
                console.log(res);
                if(res.success == true){
                    console.log('login service');
                    localStorage.setItem('loggedin', JSON.stringify(true));
                    localStorage.setItem('user', JSON.stringify(res.user));
                    parent._router.navigate(['']);
                }
            }
        );
        
    }

    logout() {
        localStorage.setItem('loggedin', JSON.stringify(false));
        localStorage.setItem('user', JSON.stringify(null));
        this.getLogout();
        this._router.navigate(['login']);
    }
    
    getLogin() {
        return this.http.get(this.credentials.api + 'login', { withCredentials: true })
        .map(res => res.json());
    }

    getUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

    getLoggedIn(){
        return JSON.parse(localStorage.getItem('loggedIn'));
        
    }

    postLogin(user: Object) {
        return this.http.post(this.credentials.api + 'login', user, { withCredentials: true })
        .map(res => res.json());
    }

    postSignup(user: Object) {
        return this.http.post(this.credentials.api + 'signup', user, { withCredentials: true })
        .map(res => res.json());
    }

    getLogout(){
        return this.http.get(this.credentials.api + 'logout', { withCredentials: true })
        .map(res => res.json());
    }

    // getAccount(){
    //     return this.http.get(this.credentials.api + 'account', { withCredentials: true })
    //     .map(res => res.json());
    // }
}