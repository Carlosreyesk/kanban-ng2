import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup.component';
import { HttpModule } from '@angular/http';
import routes from "./signup.routes";
import { CredentialsConfig } from '../../config/credentials';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
    imports: [CommonModule, FormsModule, SharedModule, routes, HttpModule, FlashMessagesModule],
    declarations: [SignupComponent],
    providers: []
})
export default class SignupModule {}