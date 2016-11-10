import { Component, Input } from '@angular/core';
import { TrelloService } from '../../shared/service/trello.service';
import { Board } from '../../shared/models/base';
import { FlashMessages } from '../../shared/service/FlashMessages';
// import { MaterializeDirective } from "angular2-materialize";
import {Location} from '@angular/common';

@Component({
    selector: "board-nav",
    styleUrls: ['board-nav.component.scss'],
    templateUrl: 'board-nav.component.html'
})
export class BoardNavComponent {
    @Input() board:Board;
    @Input() owner:any;
    constructor(private _trelloservice: TrelloService){

    }
}