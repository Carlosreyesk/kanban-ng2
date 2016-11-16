import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MaterializeDirective } from "angular2-materialize";
import { TrelloService } from '../../shared/service/trello.service';

@Component({
    selector: 'member-icon',
    styleUrls: ['member-icon.component.scss'],
    templateUrl: 'member-icon.component.html'
})
export class MemberIconComponent {
	  @Input() member: any;
      @Input() boardId: any;
      @Input() removable:boolean;
      @Output() removeEvent = new EventEmitter();

    constructor(private _trelloService: TrelloService) { }
    
    deleteMember(){
        const component = this;
        this._trelloService.deleteMember(this.member, this.boardId).subscribe(function (res) {
                if (res.success) {
                    component.removeEvent.emit(null);
                }
            });
    }
}