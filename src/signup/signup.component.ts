import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/service/login.service';
import { Http } from '@angular/http';
import { CredentialsConfig } from '../../config/credentials';
import { FlashMessages } from '../shared/service/FlashMessages';

@Component({
    selector: 'dl-signup',
    styleUrls: ['signup.component.scss'],
    templateUrl: 'signup.component.html',
    providers: [Http, CredentialsConfig, FlashMessages]
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

    signup(email: any, password: any, confirmPassword: any) {
        if (!email.value || !password.value || !confirmPassword.value) {
            this._flash.show('Please fill in all required fields', 'danger');
            return;
        }
        if (password.value != confirmPassword.value) {
            this._flash.show('Passwords do not match', 'danger');
            return;
        }
        const parent = this;
        this._loginService.postSignup({ email: email.value, 
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
