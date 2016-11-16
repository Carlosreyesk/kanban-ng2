import { Injectable } from '@angular/core';
import { Column, Board, TextCard, TextElement, Tag, Card } from '../models/base';
import { Http } from '@angular/http';
import { CredentialsConfig } from '../../../config/credentials';
import { Observable } from 'rxjs';

let boards: Array<Board>;

@Injectable()
export class TrelloService {

    constructor(private _http: Http,
                private _credentials: CredentialsConfig,
    ) {}

    getBoards(): Observable<any> {
        return this._http.get(this._credentials.api + 'boards', { withCredentials: true })
        .map(res => res.json());
    }

    getBoard(boardId: number): Observable<any> {
		return this._http.get(this._credentials.api + 'board/'+boardId, { withCredentials: true })
        .map(res => res.json());
    }

    createColumn(boardId: number, columnName: string): Observable<any> {
        return this._http.post(this._credentials.api + 'list', { list: { title: columnName, boardId: boardId }}, { withCredentials: true })
        .map(res => res.json());
    }

    createBoard(boardName: string):Observable<any> {
        return this._http.post(this._credentials.api + 'board', { board: { title: boardName }}, { withCredentials: true })
        .map(res => res.json());
    }

    updateBoard(board: Board):Observable<any> {
        return this._http.put(this._credentials.api + 'board', { board: board }, { withCredentials: true })
        .map(res => res.json());
    }

    createCard(boardId: number, columnId: number, cardText: string): Observable<any> {
        return this._http.post(this._credentials.api + 'card', { card: { title: cardText, _list: columnId }}, { withCredentials: true })
        .map(res => res.json());
    }

    updateCard(card: Card): Observable<any> {
        return this._http.put(this._credentials.api + 'card', { card: card }, { withCredentials: true })
        .map(res => res.json());
    }

    getUsers(): Observable<any> {
		return this._http.get(this._credentials.api + 'users', { withCredentials: true })
        .map(res => res.json());
    }

    addMember(user: any, boardId:number){
        return this._http.post(this._credentials.api + 'member', { user: user, boardId: boardId }, { withCredentials: true })
        .map(res => res.json());
    }

    getMembers(boardId:number){
        return this._http.get(this._credentials.api + 'members/'+boardId, { withCredentials: true })
        .map(res => res.json());
    }

    getLabels(boardId:number){
        return this._http.get(this._credentials.api + 'labels/'+boardId, { withCredentials: true })
        .map(res => res.json());
    }

    addComment(comment:string, cardId:number){
        return this._http.post(this._credentials.api + 'comment', { comment:comment, cardId:cardId }, { withCredentials: true })
        .map(res => res.json());
    }

    addLabel(label:any, boardId:number){
        return this._http.post(this._credentials.api + 'label', { label:label, boardId:boardId }, { withCredentials: true })
        .map(res => res.json());
    }

    deleteLabel(label:any){
        return this._http.delete(this._credentials.api + 'label/'+ label._id, { withCredentials: true })
        .map(res => res.json());
    }

    deleteMember(member:any, boardId:any){
        return this._http.delete(this._credentials.api + 'member/'+ member._id+'/board/'+boardId, { withCredentials: true })
        .map(res => res.json());
    }

    getCard(cardId:number){
        return this._http.get(this._credentials.api + 'card/'+cardId, { withCredentials: true })
        .map(res => res.json());
    }

    updateColumn(list:Column){
        return this._http.put(this._credentials.api + 'list', { list: list }, { withCredentials: true })
        .map(res => res.json());
    }
}

