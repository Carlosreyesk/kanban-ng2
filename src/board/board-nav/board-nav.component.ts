import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TrelloService } from '../../shared/service/trello.service';
import { Board } from '../../shared/models/base';
import { FlashMessages } from '../../shared/service/FlashMessages';
import { CredentialsConfig } from '../../../config/credentials';

@Component({
    selector: "board-nav",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['board-nav.component.scss'],
    templateUrl: 'board-nav.component.html'
})
export class BoardNavComponent {
    @Input() board:Board;
    @Input() owner:any;
    logo: String;
    constructor(
        private _trelloservice: TrelloService,
        private _credentialsService: CredentialsConfig
    ){
        this.logo = this._credentialsService.app_name.toUpperCase();
    }
}