import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { TrelloService } from '../../shared/service/trello.service';
import { Board } from '../../shared/models/base';
import { FlashMessages } from '../../shared/service/FlashMessages';
import {Location} from '@angular/common';

@Component({
    selector: "board-toolbar",
    // encapsulation: ViewEncapsulation.None,
    styleUrls: ['board-toolbar.component.scss'],
    templateUrl: 'board-toolbar.component.html'
})
export class BoardToolbarComponent {
    @Input() board:Board;
    editingTitle: boolean = false;
    @Output() updateBoardEvent = new EventEmitter();

    constructor(private _trelloservice: TrelloService){

    }

    updateTitle() {
        this.editingTitle = !this.editingTitle;
        this.updateBoardEvent.emit(null);
    }

    editTitle() {
        this.editingTitle = !this.editingTitle;
    }
    
    blurOnEnter(event: any) {
        if (event.keyCode === 13) {
            event.target.blur();
        }
    }
}