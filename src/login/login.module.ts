import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { HttpModule } from '@angular/http';
import routes from "./login.routes";
import { credentials } from '../../config/credentials';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
    imports: [CommonModule, FormsModule, SharedModule, routes, HttpModule, FlashMessagesModule],
    declarations: [LoginComponent],
    providers: [credentials]
})
export default class LoginModule {}