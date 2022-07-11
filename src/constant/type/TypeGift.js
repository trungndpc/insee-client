export const CARD_PHONE = 1;


export function findName(value) {
    switch (value) {
        case CARD_PHONE: return 'Thẻ cào điện thoại'
        default: return null;
    }
}

export function findColor(value) {
    switch (value) {
        case CARD_PHONE: return '#20c997'
        default: return null;
    }
}