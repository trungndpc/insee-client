import APIUtil from '../utils/APIUtils'
import ZOAUtil from '../utils/ZOAUtil'

export default class OAModel {
    static getProfile(oaid) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/oa?v=${process.env.REACT_APP_VERSION}&action=get-profile-oa&oaid=${oaid}`, resolve, reject);
        });
    }

    static follow(oaid, continuteUrl) {
        var extrSrc = ZOAUtil.getSRC()
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/oa?v=${process.env.REACT_APP_VERSION}&action=follow-oa&oaid=${oaid}&extrSrc=${extrSrc}&act=1${continuteUrl ? '&continuteUrl=' + encodeURIComponent(continuteUrl) : ''}`, resolve, reject);
        });
    }

    static unfollow(oaid) {
        var extrSrc = ZOAUtil.getSRC()
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/oa?v=${process.env.REACT_APP_VERSION}&action=follow-oa&oaid=${oaid}&extrSrc=${extrSrc}&act=2`, resolve, reject);
        });
    }

    static getListArticle(index, oaid) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/oa?v=${process.env.REACT_APP_VERSION}&action=get-list-article&oaid=${oaid}&index=${index}`, resolve, reject);
        });
    }

    static call2Menu(menuId, oaid) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/oa?v=${process.env.REACT_APP_VERSION}&action=call-to-menu&oaid=${oaid}&menuId=${encodeURIComponent(menuId)}`, resolve, reject);
        });
    }

    static profiler(action, data) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/profiler?v=${process.env.REACT_APP_VERSION}&action=${action}&data=${encodeURIComponent(data)}`, resolve, reject);
        });
    }
}