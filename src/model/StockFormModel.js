import APIUtil from '../utils/APIUtils'

export default class StockFormModel {

    static create(form) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/stock-form/create`, JSON.stringify(form), resolve, reject);
        });
    }

    
}