import APIUtil from '../utils/APIUtils'

export default class GiftModel {

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/gift/get?id=${id}`, resolve, reject);
        });
    }

    static updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/gift/update-status?id=${id}&status=${status}`, resolve, reject);
        });
    }


}