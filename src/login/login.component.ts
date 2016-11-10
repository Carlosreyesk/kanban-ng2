import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../shared/service/login.service';
import { Http } from '@angular/http';
import { credentials } from '../../config/credentials';
import { FlashMessages } from '../shared/service/FlashMessages';

@Component({
    selector: 'dl-login',
    styleUrls: ['login.component.scss'],
    templateUrl: 'login.component.html',
    providers: [Http, credentials, FlashMessages]
})
export class LoginComponent {

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _loginService: LoginService,
        private _flash: FlashMessages,
        private _credentials: credentials
    ) {
        if(JSON.parse(localStorage.getItem('loggedin'))){
            this._router.navigate(['']);
        }
        let parent = this;
        this._route.queryParams.map(params => params['success'] || 'None').subscribe(
            function(params){
                console.log(params);
                if(params == true){
                    parent._loginService.login();
                }
            }
        );
    }

    login(username: any, password: any) {
        if (!username.value || !password.value) {
            return;
        }
        let parent = this;
        let user = { email: username.value, password: password.value };
        this._loginService.postLogin(user).subscribe(function(res){
            if(res.success == true){
                parent._loginService.login();
             }else{
                parent._flash.show(res.flash, 'danger')
             }
        });
    }

    loginWithFacebook(){
        window.location.href = this._credentials.api + 'auth/facebook';
    }
}
