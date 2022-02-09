import APIUtil from '../utils/APIUtils'

export default class PostModel {

    static getMe() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/post/get-for-me`, resolve, reject);
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/post/get?id=${id}`, resolve, reject);
        });
    }
  
}