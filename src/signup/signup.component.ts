import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/service/login.service';
import { Http } from '@angular/http';
import { credentials } from '../../config/credentials';
import { FlashMessages } from '../shared/service/FlashMessages';

@Component({
    selector: 'dl-signup',
    styleUrls: ['signup.component.css'],
    templateUrl: 'signup.component.html',
    providers: [Http, credentials, FlashMessages]
})
export class SignupComponent {

    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _flash: FlashMessages
    ) {
        if(JSON.parse(localStorage.getItem('loggedin'))){
            this._router.navigate(['']);
        }
    }

    signup(username: any, password: any, confirmPassword: any) {
        if (!username.value || !password.value || !confirmPassword.value) {
            this._flash.show('Please fill in all required fields', 'danger');
            return;
        }
        if (password.value != confirmPassword.value) {
            this._flash.show('Passwords do not match', 'danger');
            return;
        }
        const parent = this;
        this._loginService.postSignup({ email: username.value, 
                                        password: password.value, 
                                        confirmPassword: confirmPassword.value })
        .subscribe(
            function(res){ 
                if(res.success == false){
                    parent._flash.show(res.flash, 'danger');
                }else{
                    console.log(res);
                    parent._loginService.login();
                    parent._router.navigate(['/']);
                }
            });
    }
}
