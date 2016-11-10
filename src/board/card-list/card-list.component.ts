import { Component, Input } from '@angular/core';
import { TrelloService } from '../../shared/service/trello.service';
import { Column, Card, Board } from '../../shared/models/base';
import { FlashMessages } from '../../shared/service/FlashMessages';

@Component({
    selector: 'card-list',
    styleUrls: ['card-list.component.scss'],
    templateUrl: 'card-list.component.html'
})
export class CardListComponent {
    editingColumn: boolean = false;
    addingCard: boolean = false;
    cardText: string;
    @Input() list: Column;
    @Input() board: Board;
    @Input() showStatus: Function;
    @Input() cardModal: any;

    constructor(
      private _trelloService: TrelloService,
      private _flash: FlashMessages
    ) {}

    editColumn() {
	    this.editingColumn = !this.editingColumn;
    }

    updateColumn() {
		this.editingColumn = !this.editingColumn;
        let parent = this;
        if (this.list.title) {
	        this._trelloService.updateColumn(this.list)
            .subscribe(function(res){
                if(res.success){
                    parent.list = res.list;
                }else{
                    parent._flash.show(res.flash, 'danger');
                }
            });
        }
    }

    newCard() {
        this.addingCard = !this.addingCard;
    }

    addCard() {
        let parent = this;
        if (this.cardText) {
	        this._trelloService.createCard(this.board._id, this.list._id, this.cardText)
            .subscribe(function(res){
                if(res.success){
                    parent.list.cards.push(res.card);
                    console.log(parent.list);
                }else{
                    parent._flash.show(res.flash, 'danger');
                }
            });
	        this.cardText = '';
        }
        this.newCard();
    }

    blurOnEnter(event: any) {
	    if (event.keyCode === 13) {
	      event.target.blur();
	    }
    }

    dropSuccess(){
        this.updateBoard();
    }

    updateBoard(){
        let parent = this;
        this._trelloService.updateBoard(this.board)
        .subscribe(function(res){
            if(res.success){
                console.log(res.board);
            }else{
                // todo : fix flash problem
                // parent._flash.show(res.flash, 'danger');
            }
        });
    }
    
    dragSuccess(event: any){
        console.log('drag');        
        console.log(event);
    }

}