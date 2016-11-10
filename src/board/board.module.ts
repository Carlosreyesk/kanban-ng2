import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule }from "@angular/forms"; 
import { SharedModule } from '../shared/shared.module';
import { BoardComponent } from "./board.component";
import { CardComponent } from "./card/card.component";
import { CardListComponent } from "./card-list/card-list.component";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { BoardNavComponent } from "./board-nav/board-nav.component";
import { CardModalComponent } from "./card-modal/card-modal.component";
import { DndModule } from 'ng2-dnd';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import routes from "./board.routes";
import { FlashMessagesModule } from 'angular2-flash-messages';
// import { MaterialModule } from '@angular/material';
import {MaterializeDirective} from "angular2-materialize";

@NgModule({
    imports:[
        CommonModule, 
        FormsModule, 
        DndModule, 
        SharedModule , 
        routes, 
        FlashMessagesModule, 
        DragulaModule    
    ],
    declarations: [
        BoardComponent, 
        CardComponent, 
        CardListComponent, 
        SideMenuComponent,
        MaterializeDirective,
        BoardNavComponent,
        CardModalComponent 
    ],
    providers: []
})
export default class BoardModule{}