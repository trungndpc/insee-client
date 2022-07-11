export const INIT = 1;
export const APPROVED = 2;
export const REJECTED = 3;
export const SENT_GIFT = 4;
export const RECEIVED = 5;


export function findName(value) {
    switch(value) {
        case INIT : return 'Chờ duyệt'
        case APPROVED : return 'Đã duyệt'
        case REJECTED : return 'Từ chối'
        case SENT_GIFT: return 'Đã gửi quà'
        case RECEIVED : return 'Đã nhận'
        default : return null;
    }
}

export function findColor(value) {
    switch(value) {
        case INIT : return '#20c997'
        case APPROVED : return '#dc3535'
        case REJECTED : return '#999'
        default : return null;
    }
}