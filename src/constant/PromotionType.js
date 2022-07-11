export const STOCK_PROMOTION_TYPE = 20;
export const LIGHTING_QUIZ_GAME_PROMOTION_TYPE = 21;

export function findName(value) {
    switch(value) {
        case STOCK_PROMOTION_TYPE : return 'Stock Promotion'
        case LIGHTING_QUIZ_GAME_PROMOTION_TYPE : return 'Lighting Quiz Game'
        default : return null;
    }
}

export function findColor(value) {
    switch(value) {
        case STOCK_PROMOTION_TYPE : return '#20c997'
        case LIGHTING_QUIZ_GAME_PROMOTION_TYPE : return '#dc3535'
        default : return null;
    }
}