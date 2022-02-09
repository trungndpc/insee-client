import APIUtil from '../utils/APIUtils'

export default class FormModel {

    static list() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/me`, resolve, reject);
        });
    }


}