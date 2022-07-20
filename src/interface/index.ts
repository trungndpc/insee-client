export interface Address {
    name: string
}

export interface StoreStatus {
    status: number;
    openTime: string;
    closeTime: string;
}


export interface PageArticle {
    index: number,
    list: Array<Article>;
}

export interface Article {
    created_time: string;
    id: string;
    thumb_url: string;
    title: string;
    url: string
}

export interface Menu {
    id: string;
    name: string;
    type: number;
    value: string;
    sub_menus: Array<Menu>
    emoji: string;
}

export interface RegisterForm {
    phone: string,
    name: string,
    cityId: number,
    districtId: number,
    address: string,
    cements: Array<number>
}

export interface User {
    id: number,
    phone: string,
    status: number,
    name: string,
    avatar: string,
    cityId: number,
    districtId: number,
    address: string,
    products: Array<number>
}

export interface Post {
    id: number,
    title: string,
    cover: string,
    content: string,
    summary: string,
    status: number,
    promotionId: number
}

export interface Form {
    type: number;
    status: number
}

export interface ImgRealtimePhoto {
    url: string,
    time: number,
    location: JSON
}

export interface StockForm {
    promotionId: number,
    detail: string,
    bags: number,
    cements: Array<number>
}

export interface GreetingFriendForm {
    promotionId: number,
    detail: string,
    bags: number,
    cements: Array<number>,
}

export interface Promotion {
    id: number,
    title: string;
    type: number;
    status: number;
    forms: Array<Form>;
}


export interface Gift {
    id: number,
    content: string,
    status: number,
    title: string,
    type: number
}

export interface CardPhoneGift {
    id: number,
    network: number,
    value: number,
    seri: string,
    code: string
}