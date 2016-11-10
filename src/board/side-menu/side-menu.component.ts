import { Component, Input } from '@angular/core';
import { TrelloService } from '../../shared/service/trello.service';
import { Board } from '../../shared/models/base';
import { FlashMessages } from '../../shared/service/FlashMessages';
// import { MaterializeDirective } from "angular2-materialize";
import {Location} from '@angular/common';

@Component({
    selector: "side-menu",
    styleUrls: ['side-menu.component.scss'],
    templateUrl: 'side-menu.component.html'
})
export class SideMenuComponent {
    @Input() board: Board;
    users: any;
    addingLabel:boolean = false;
    newLabel: string;
    newLabelColor: string;
    labelColors: string[] = ['red', 'green', 'yellow'];
    labels:any[];
    constructor(
        private _trelloservice: TrelloService,
        private _flash: FlashMessages
    ){
        this.newLabelColor = 'blue';
    }

    addLabel(){
        this.addingLabel = !this.addingLabel;
    }

    createLabel(){
        const parent = this;
        this._trelloservice.addLabel({ title: this.newLabel, color: this.newLabelColor }, this.board._id).subscribe(function(res){
            if(res.success){
                parent.getLabels();
            }
        });
    }

    selectColor(color:string){
        this.newLabelColor = color;
    }

    capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    getUsers(){
        const parent = this;
        this.users = [];
        this._trelloservice.getUsers().subscribe(function(res){
            if(res.success){
                res.users.forEach(function(user: any){
                    let repeted = false;
                    parent.board.members.forEach(function(member){
                        if(member._id == user._id){
                            repeted = true;
                        }
                    });
                    if(!repeted){
                        parent.users.push(user);
                    }
                });
            }else{
                parent._flash.show(res.flash, "Danger");
            }
        })
    }

    addMember(user: any){
        const parent = this;
        this.users = [];
        this._trelloservice.addMember(user, this.board._id).subscribe(function(res){
            if(res.success){
                parent.getMembers();
            }
        });
    }

    getMembers(){
        const parent = this;
        this._trelloservice.getMembers(this.board._id).subscribe(function(res){
            if(res.success){
                parent.board.members = res.members;
            }else{
                parent._flash.show(res.flash, 'danger');
            }
        });
    }

    getLabels() {
        const parent = this;
        this._trelloservice.getLabels(this.board._id).subscribe(function (res) {
            if (res.success) {
                if (res.labels.length > 0) {
                    parent.board.labels = res.labels;
                }
            } else {
                parent._flash.show(res.flash, 'danger');
            }
        });
    }

    blurOnEnter(event: any) {
	    if (event.keyCode === 13) {
	      event.target.blur();
	    }
	}

}