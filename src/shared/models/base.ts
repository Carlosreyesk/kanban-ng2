export interface ListI<T> {
    id: number;
    name: string;
    items: Array<T>;
}

export interface CardI {
    _id: number;
    title: string;
    description: string;
    tags: Array<Tag>;
}

export class Card {
    _id: number;
    title: string;
    description: string;
    tags: Array<Tag>;
    members:any;
    duedate:any;
    labels:any;
    comments:any;
    attatchents: Array<String>;
}

export interface TextCardI<T> {
    elements: Array<T>
}

export class Board {
    constructor(
        public _id: number,
        public title: string,
        public _owner: string,
		public columns: Array<Column>,
        public members: Array<any>,
        public labels: Array<any>,
    ) {}
}

export class Column {
    constructor(
        public _id: number,
        public title: string,
        public cards: Array<Card>
    ) {}
}

export class TextCard implements CardI {
    constructor(
        public _id: number,
        public title: string,
        public description: string,
        public tags: Array<Tag>,
        public elements: Array<TextElement>
    ) {}
}

export class TextElement {
    constructor(
        public name: string
    ) {}
}

export class Tag {
    constructor(
        public name: string
    ) {}
}

// export class User{
//     constructor(
//         public _id: string,
//         public updatedAt: string,
//         public createdAt: string,
//         public email: string,

//     ) {}
// }