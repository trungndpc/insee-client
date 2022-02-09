const data = window.data;
export default class GlobalModel {

    static updateOA(oa) {
        data["oa"] = oa;
    }

    static getAppId() {
        return data['appId']
    }

    static getOA() {
        return data['oa']
    }

    static getUser() {
        return data['user']
    }

    static getLang() {
        return data['lang']
    }

    static toast(msg) {
        return window.toast(msg);
    }

    static plesaeOpenZalo() {
        return window.pleaseOpenZalo()
    }

    static isOpenOutApp() {
        return data['is_open_out_app'] == 'true';
    }

    static isDisabledOA() {
        return data['oa']['is_disabled']
    }

    static isSupportCallOa() {
        return data['is_support_call_oa'] == 'true'
    }

    static isEnableCall2OA() {
        return data["oa"]["is_can_call"] && data["oa"]["call_msg"];
    }

    static getCallMsg() {
        return data["oa"]["call_msg"];
    }

}