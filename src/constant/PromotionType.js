export const STOCK_PROMOTION_TYPE = 20;
export const LIGHTING_QUIZ_GAME_PROMOTION_TYPE = 21;
export const GREETING_NEW_FRIEND_PROMOTION_TYPE = 22;

export function findName(value) {
    switch (value) {
        case STOCK_PROMOTION_TYPE: return 'Stock Promotion'
        case LIGHTING_QUIZ_GAME_PROMOTION_TYPE: return 'Lighting Quiz Game'
        case GREETING_NEW_FRIEND_PROMOTION_TYPE: return 'Greeting New Friend'
        default: return null;
    }
}

export function findColor(value) {
    switch (value) {
        case STOCK_PROMOTION_TYPE: return '#20c997'
        case LIGHTING_QUIZ_GAME_PROMOTION_TYPE: return '#dc3535'
        case GREETING_NEW_FRIEND_PROMOTION_TYPE: return '#dc3535'
        default: return null;
    }
}