import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { TrelloService } from '../shared/service/trello.service';
import { Board, Column, Card } from '../shared/models/base';
import { FlashMessages } from '../shared/service/FlashMessages';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Title }     from '@angular/platform-browser';
import { CredentialsConfig } from '../../config/credentials';

declare var jQuery: any;
@Component({
    selector: 'board',
    templateUrl: 'board.component.html',
    styleUrls: ['board.component.css']
})
export class BoardComponent {

    boardId: number;
    board: Board;
    addingColumn: boolean = false;
    columnName: string;

    constructor(
        private _credentialsService: CredentialsConfig,
        private _titleService: Title,
        private _trelloService: TrelloService,
        private _route: ActivatedRoute,
        private _flash: FlashMessages,
        private dragulaService: DragulaService
    ) {
        this._titleService.setTitle(this._credentialsService.app_name);

        dragulaService.drop.subscribe((value: any) => {
            this.handleDrop(value);
        });

        dragulaService.drag.subscribe((value: any) => {
            this.handleDrag(value);
        });

        dragulaService.setOptions('list-bag', {
            // removeOnSpill: false,
            moves: function (el: any, container: any, target: any) {
                if (target.classList) {
                    return target.classList.contains('list-draggable');
                } else {
                    return false;
                }
            }
        });

        dragulaService.setOptions('card-bag', {
            // removeOnSpill: false,
            moves: function (el: any, container: any, target: any) {
                if (target.classList) {
                    return target.classList.contains('card-draggable');
                } else {
                    return false;
                }
            }
        });
    }

    ngOnInit() {
        this.getBoard();
    }

    ngOnDestroy() {
        this.dragulaService.destroy('list-bag');
        this.dragulaService.destroy('card-bag');
    }

    getBoard() {
        let parent = this;
        this._route.params.forEach((params: Params) => {
            const id = params['id'];
            this.boardId = id;
            this._trelloService.getBoard(id).subscribe(function (res) {
                if (res.success) {
                    parent.board = res.board;
                    console.log(parent.board);
                } else {
                    parent._flash.show(res.flash, 'danger');
                }
            });
        });
    }

    updateBoard() {
        let parent = this;
        if (this.board.title != '') {
            this._trelloService.updateBoard(this.board).subscribe(function (res) {
                if (res.success) {
                    parent.board = res.board;
                } else {
                    parent._flash.show(res.flash, 'danger');
                }
            });
        }
    }

    onChange() {
        let parent = this;
        setTimeout(function () {
            parent.getBoard();
        }, 100);
    }

    newColumn() {
        this.addingColumn = !this.addingColumn;
    }

    addColumn() {
        let parent = this;
        if (this.columnName) {
            this._trelloService.createColumn(this.boardId, this.columnName).subscribe(function (res) {
                if (res.success) {
                    parent.board.columns.push(res.list);
                    console.log(parent.board);
                } else {
                    parent._flash.show(res.flash, 'danger');
                }
            });
            this.columnName = '';
        }
        this.newColumn();
    }

    blurOnEnter(event: any) {
        if (event.keyCode === 13) {
            event.target.blur();
        }
    }

    handleDrop(input: any) {
        const draggedElement = input[1];
        const component = this;
        if (draggedElement.tagName == "CARD") {
            let newContainer = input[2];
            let oldContainer = input[3];
            component.updateCardOrder(newContainer, oldContainer);
            component.updateBoard();
        } else {
            if (draggedElement.tagName == "CARD-LIST") {
                let container = input[2]
                component.updateColumnOrder(container);
                component.updateBoard();
            }
        }
    }

    handleDrag(input: any){
        console.log(input[1]);
    }

    updateCardOrder(newContainer: any, oldContainer: any) {
        let component = this;
        let newContainerCardArray = new Array<Card>();
        let oldContainerCardArray = new Array<Card>();
        let newContainerHtmlCards = [].slice.call(newContainer.getElementsByTagName('card'));
        let oldContainerHtmlCards = [].slice.call(oldContainer.getElementsByTagName('card'));
        let newList = <any>[];
        let oldList = <any>[];
        if (newContainer.id != oldContainer.id) {
            this.board.columns.forEach(function (list) {
                if (list._id == newContainer.id) {
                    newList = list;
                }
                if (list._id == oldContainer.id) {
                    oldList = list;
                }
            });
            newContainerHtmlCards.forEach(function (htmlCard: any, index: number) {
                oldList.cards.forEach(function (card: any) {
                    if (card._id == htmlCard.id) {
                        newContainerCardArray.push(card);
                    }
                });
                newList.cards.forEach(function (card: any) {
                    if (card._id == htmlCard.id) {
                        newContainerCardArray.push(card);
                    }
                });
            });
            oldContainerHtmlCards.forEach(function (htmlCard: any, index: number) {
                oldList.cards.forEach(function (card: any) {
                    if (card._id == htmlCard.id) {
                        oldContainerCardArray.push(card);
                    }
                });
            });
            this.board.columns.forEach(function (list) {
                if (list._id == newContainer.id) {
                    list.cards = newContainerCardArray;
                }
                if (list._id == oldContainer.id) {
                    list.cards = oldContainerCardArray;
                }
            });
        } else {
            let container = newContainer;
            let containerHtmlCards = newContainerHtmlCards;
            this.board.columns.forEach(function (list) {
                if (list._id == container.id) {
                    containerHtmlCards.forEach(function (htmlCard: any) {
                        list.cards.forEach(function (card: any) {
                            if (card._id == htmlCard.id) {
                                newContainerCardArray.push(card);
                            }
                        });
                    });
                    list.cards = newContainerCardArray;
                }
            })
        }
    }

    updateColumnOrder(container: any) {
        let component = this;
        let newListArray = new Array<Column>();
        let htmlColumns = [].slice.call(container.parentElement.getElementsByTagName('card-list'));
        console.log(htmlColumns);
        htmlColumns.forEach(function (htmlColumn: any, index: number) {
            component.board.columns.forEach(function (list: any) {
                if (list._id == htmlColumn.id) {
                    let repeted = false;
                    newListArray.forEach(function (item) {
                        if (item._id == htmlColumn.id) {
                            repeted = true;
                        }
                    });
                    if (!repeted) {
                        newListArray.push(list);
                    }
                }
            });
        });
        component.board.columns = newListArray;
    }
}
