import { Component, Input } from '@angular/core';
import { TrelloService } from '../../shared/service/trello.service';
import { Board } from '../../shared/models/base';
import { FlashMessages } from '../../shared/service/FlashMessages';
// import { MaterializeDirective } from "angular2-materialize";
import { Location } from '@angular/common';
import  { LoginService } from '../../shared/service/login.service';

@Component({
    selector: "side-menu",
    styleUrls: ['side-menu.component.scss'],
    templateUrl: 'side-menu.component.html'
})
export class SideMenuComponent {
    @Input() board: Board;
    users: any;
    userInfo: any;
    userData: any;
    addingLabel: boolean = false;
    newLabel: string;
    newLabelColor: string;
    labelColors: string[] = ['blue', 'purple', 'red', 'orange', 'yellow', 'green'];
    labels: any[];
    newMember: string;
    constructor(
        private _trelloservice: TrelloService,
        private _flash: FlashMessages,
        private _loginService: LoginService
    ) {
        this.newLabelColor = 'blue';
    }

    ngOnInit() {

    }

    addLabel() {
        this.addingLabel = !this.addingLabel;
    }

    createLabel() {
        const parent = this;
        if(this.newLabel){
            this._trelloservice.addLabel({ title: this.newLabel, color: this.newLabelColor }, this.board._id).subscribe(function (res) {
                if (res.success) {
                    parent.getLabels();
                    parent.newLabel = '';
                }
            });
        }
    }



    removeLabel(label:any){
        const parent = this;        
         this._trelloservice.deleteLabel(label).subscribe(function (res) {
                if (res.success) {
                    parent.getLabels();
                }
            });
    }

    selectColor(color: string) {
        this.newLabelColor = color;
    }

    capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    getUsers() {
        const parent = this;
        this.users = [];
        this._trelloservice.getUsers().subscribe(function (res) {
            if (res.success) {
                parent.userInfo = {};
                parent.userData = [];
                // console.log(res.users);
                res.users.forEach(function (user: any) {
                    let repeted = false;
                    parent.board.members.forEach(function (member) {
                        if (member._id == user._id) {
                            repeted = true;
                        }
                    });
                    if (!repeted) {
                        parent.users.push(user);
                        // console.log(user);
                        // let name = {};
                        // name[user.email]=null;
                        let name = user.email;
                        let picture: any = null;

                        if (user.profile) {
                            if (user.profile.name) {
                                name = user.profile.name;
                            }
                            if (user.profile.picture && name.length < 20) {
                                picture = user.profile.picture;
                            }

                        }
                        parent.userInfo[name] = picture;
                    }
                });
                parent.userData = [{ data: parent.userInfo }]
                // setTimeout(function(){console.log(parent.userInfo);},1200);
            } else {
                parent._flash.show(res.flash, "Danger");
            }
        })
    }

    fixDropdown(event: any) {
        let parent = event.target.parentElement;
        let component = this;
        // setTimeout(function(){
        // console.log(this.userData);
        component.getUsers();
        setTimeout(function () {
            var elements = [].slice.call(parent.getElementsByClassName('autocomplete-content'));
            // console.log(elements);
            elements.forEach(function (htmlList: any) {
                // console.log(htmlList.classList);
                if (htmlList.classList.contains('autocomplete-fix')) {
                    parent.removeChild(htmlList);
                    console.log(htmlList);
                } else {
                    htmlList.classList.add('autocomplete-fix');
                    // htmlList.addEventListener('click', console.log(component.newMember));
                }
            });
        }, 200);
        // }, 200);

    }

    addMember(event:any) {
        const parent = this;
        setTimeout(function () {
            if (parent.newMember != '') {
                let member = {};
                parent.users.forEach(function (user: any) {
                    let repeted = false;
                    parent.board.members.forEach(function (existingMember) {
                        if (user._id == existingMember._id) {
                            repeted = true;
                        }
                    });
                    console.log(repeted);
                    if (!repeted) {
                        if (user.email == parent.newMember) {
                            member = user;
                        } else {
                            if (user.profile) {
                                if (user.profile.name == parent.newMember) {
                                    member = user;
                                }
                            }
                        }
                    }

                });
                if (member) {
                    parent._trelloservice.addMember(member, parent.board._id).subscribe(function (res: any) {
                        if (res.success) {
                            event.target.value = '';
                            parent.getMembers();
                        }
                    });
                }
            }
        }, 200);

    }

    getMembers() {
        const parent = this;
        this._trelloservice.getMembers(this.board._id).subscribe(function (res) {
            if (res.success) {
                parent.board.members = res.members;
            } else {
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

    createLabelOnEnter(event: any) {
        if (event.keyCode === 13) {
            this.createLabel();
        }
    }

    getRemoveMemberStatus(member:any): boolean{
        let remove = false;
        if(this._loginService.getUser()._id == this.board._owner){
            remove = true;
        }
        if(member._id == this.board._owner){
            remove = false;
        }
        return remove;
    }

}