import APIUtil from '../utils/APIUtils'

export default class GreetingFriendFormModel {

    static create(form) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/greeting-friend-form/create`, JSON.stringify(form), resolve, reject);
        });
    }


}