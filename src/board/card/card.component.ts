import { Component, Input, EventEmitter } from '@angular/core';
import { Card } from '../../shared/models/base';
import { CardService } from '../../shared/service/card.service';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

@Component({
    selector: 'card',
    styleUrls: ['card.component.scss'],
    templateUrl: 'card.component.html'
})
export class CardComponent {
	  @Input() card: Card;
    @Input() cardModal: any;

    constructor(
      private _cardService: CardService
    ) { }

    openModal(){
      this.cardModal.openModal(this.card._id);
    }

    blurOnEnter(event: any) {
	    if (event.keyCode === 13) {
	      event.target.blur();
	    }
	}
}