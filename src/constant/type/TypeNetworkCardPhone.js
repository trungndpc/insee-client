export const VIETTEL = 1;
export const MOBILE = 2;
export const VINA = 3;


export function findName(value) {
    switch (value) {
        case VIETTEL: return 'Viettel'
        case MOBILE: return 'Mobile'
        case VINA: return 'Vinaphone'
        default : return null;
    }
}

export function findColor(value) {
    switch (value) {
        case VIETTEL: return '#EE0033'
        case MOBILE: return '#0a4874'
        case VINA: return '#00abe9'
        default : return '';
    }
}