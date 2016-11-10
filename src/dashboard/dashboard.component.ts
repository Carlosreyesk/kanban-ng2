import { Component } from "@angular/core";
import { TrelloService } from '../shared/service/trello.service';
import { LoginService } from '../shared/service/login.service';
import { Board } from '../shared/models/base';
import { FlashMessages } from '../shared/service/FlashMessages';
import { Title }     from '@angular/platform-browser';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent{
    boards: Array<Board>;
    colabs: Array<Board>;
    boardName: string;
    addingBoard: boolean = false;

    constructor(
        private titleService: Title,
        private _trelloService: TrelloService,
        private _loginService: LoginService,
        private _flash: FlashMessages,
    ){  
        
      }

    ngOnInit(){
        this.getBoards();
        this.titleService.setTitle(this.titleService.getTitle()+" Dashboard");
    }

    getBoards(){
        let parent = this;
        this._trelloService.getBoards().subscribe(function(res){
            if(res.success){
                parent.boards = res.boards;
                parent.colabs = res.colabs;
            }else{
                parent._flash.show(res.flash, "danger");
            }
        });
    }
    newBoard() {
        this.addingBoard = !this.addingBoard;
    }

    addBoard() {
        let parent = this;
        if (this.boardName) {
	        this._trelloService.createBoard(this.boardName).subscribe(function(res){
            console.log(res); 
            if(res.success == true){
                let board = new Board(
                    res.board._id,
                    res.board.title,
                    res.board._owner,
                    [],[],[]
                );
                console.log(board);
                parent.boards.push(board);
            }else{
                parent._flash.show('Board not saved. Try again', 'danger');
            }
        });
	        this.boardName = '';
        }
        this.newBoard();
    }

    addBoardOnEnter(event: any) {
	    if (event.keyCode === 13) {
	      event.target.blur();
	    }
    }

    logout() {
		this._loginService.logout();
    }
}
