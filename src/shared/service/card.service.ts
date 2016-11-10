import {Injectable} from '@angular/core';
import { Card } from '../models/base';

@Injectable()
export class CardService {
    card: Card;

    pushCard(newcard: Card){
        this.card = newcard;
    }

    getCard():Card{
        return this.card;
    }
}