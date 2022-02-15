export const INIT = 1;
export const APPROVED = 2;


export function findName(value) {
    switch(value) {
        case INIT : return 'Chờ duyệt'
        case APPROVED : return 'Đã duyệt'
    }
}

export function findColor(value) {
    switch(value) {
        case INIT : return '#20c997'
        case APPROVED : return '#dc3535'
    }
}