import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule }from "@angular/forms"; 
import { SharedModule } from '../shared/shared.module';
// import { MemberIconComponent } from '../../shared/components/member-icon/member-icon.component';
import { BoardComponent } from "./board.component";
import { CardComponent } from "./card/card.component";
import { CardListComponent } from "./card-list/card-list.component";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { BoardNavComponent } from "./board-nav/board-nav.component";
import { BoardToolbarComponent } from "./board-toolbar/board-toolbar.component";
import { CardModalComponent } from "./card-modal/card-modal.component";
import { MemberIconComponent } from "./member-icon/member-icon.component";
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
        SharedModule, 
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
        CardModalComponent,
        BoardToolbarComponent,
        MemberIconComponent
    ],
    providers: []
})
export default class BoardModule{}