import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Input, Output, Component, EventEmitter } from "@angular/core"
import { Column, Card, Board } from '../../shared/models/base';
import { TrelloService } from '../../shared/service/trello.service';
import { FlashMessages } from '../../shared/service/FlashMessages';
import { FlashMessagesModule } from 'angular2-flash-messages';

@Component({
    selector: 'card-modal',
    templateUrl: 'card-modal.component.html',
    styleUrls: ['card-modal.component.scss']
})
export class CardModalComponent {
    modalActions = new EventEmitter<string | MaterializeAction>();
    card: Card;
    editingDescription: boolean = false;
    editingTitle: boolean = false;
    noDescription: boolean = false;
    newComment: string;
    @Input() boardId: number;
    members: any[];
    labels: any[];
    @Output() changeEvent = new EventEmitter();

    constructor(
        private _trelloService: TrelloService,
        private _flash: FlashMessages
    ) {
    }

    openModal(cardId: number) {
        const parent = this;
        this._trelloService.getCard(cardId).subscribe(function (res) {
            if (res.success) {
                parent.card = res.card;
                console.log(parent.card);
                if (!parent.card.description) {
                    parent.noDescription = true;
                }
                parent.modalActions.emit({ action: "modal", params: ['open'] });
            } else {
                parent._flash.show(res.flash, 'danger');
            }
        });
    }

    closeModal() {
        this.card = new Card;
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

    editDescription() {
        this.editingDescription = !this.editingDescription;
    }

    editTitle() {
        this.editingTitle = !this.editingTitle;
    }

    updateTitle() {
        this.updateCard();
        this.changeEvent.emit(null);
        this.editingTitle = !this.editingTitle;
    }

    updateCard(){
        let parent = this;
        this._trelloService.updateCard(this.card).subscribe(function (res) {
            if (res.success) {
                parent._trelloService.getCard(parent.card._id).subscribe(function (res) {
                    if (res.success) {
                        if (res.card.description) {
                            parent.noDescription = false;
                        }
                        parent.card = res.card;
                    } else {
                        parent._flash.show(res.flash, 'danger');
                    }
                });
            } else {
                console.log('fuck');
            }
        });
    }

    updateDescription() {
        this.updateCard();
        this.editingDescription = !this.editingDescription;
    }

    addComment() {
        const parent = this;
        this._trelloService.addComment(this.newComment, this.card._id).subscribe(function (res) {
            if (res.success) {
                parent._trelloService.getCard(parent.card._id).subscribe(function (res) {
                    if (res.success) {
                        parent.card = res.card;
                    } else {
                        parent._flash.show(res.flash, 'danger');
                    }
                });
            } else {
                console.log('fuck');
            }
        });
    }

    getMembers() {
        const parent = this;
        this._trelloService.getMembers(this.boardId).subscribe(function (res) {
            if (res.success) {
                parent.members = res.members;
                console.log(parent.members);
            } else {
                parent._flash.show(res.flash, 'danger');
            }
        });
    }

    getLabels() {
        const parent = this;
        this._trelloService.getLabels(this.boardId).subscribe(function (res) {
            if (res.success) {
                if (res.labels.length > 0) {
                    parent.labels = res.labels;
                    console.log(parent.labels);
                }else{
                    parent.labels = [];
                }
            } else {
                parent._flash.show(res.flash, 'danger');
            }
        });
    }

    addMember(member: any) {
        const parent = this;
        this.card.members.push(member);
        this._trelloService.updateCard(this.card).subscribe(function (res) {
            if (res.success) {
                parent.card = res.card;
            } else {
                parent._flash.show(res.flash, 'danger');
                parent.card.members.pop();
            }
        });
    }

     addLabel(label:any) {
            let parent = this;
            this.card.labels.push(label);
            this._trelloService.updateCard(this.card).subscribe(function (res) {
                if (res.success) {
                    parent._trelloService.getCard(parent.card._id).subscribe(function (res) {
                        if (res.success) {
                            if (res.card.description) {
                                parent.noDescription = false;
                            }
                            parent.card = res.card;
                        } else {
                            parent._flash.show(res.flash, 'danger');
                        }
                    });
                } else {
                    console.log('fuck');
                }
            });
     }

    blurOnEnter(event: any) {
        if (event.keyCode === 13) {
            event.target.blur();
        }
    }


}