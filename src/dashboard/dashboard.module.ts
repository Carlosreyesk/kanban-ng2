import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule }from "@angular/forms"; 
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from "./dashboard.component";
import routes from "./dashboard.routes";
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MaterialModule } from '@angular/material';


@NgModule({
    imports:[CommonModule, FormsModule, SharedModule, routes, FlashMessagesModule, MaterialModule.forRoot()],
    declarations: [DashboardComponent],
    providers: []
})
export default class BoardsModule{}