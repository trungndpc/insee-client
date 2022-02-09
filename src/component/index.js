
import LangUtil from '../utils/LangUtil'
const owlClass = "App";

export function StatusStore({ store_status }) {
    if (store_status.status == 24) {
        return (
            <div className={`${owlClass}__detail__item`}>
            <img src="https://stc-zoa-profile.zdn.vn/images/clock.svg" alt="" />
            <span className={`${owlClass}__detail__item__text green closed`}>
                {LangUtil.get('lb-operating-24-24')}
            </span>
        </div>
        )
    }
    const status = store_status.status == 0;
    const close = store_status.closeTime;
    const open = store_status.openTime;
    return (
        <div style={{marginLeft: '2px'}} className={`${owlClass}__detail__item`}>
            <img src="https://stc-zoa-profile.zdn.vn/images/clock.svg" alt="" />
            <span  className={`${owlClass}__detail__item__text ${status ? 'green' : 'red'} closed`}>
                {status ? LangUtil.get('lb-opening') : LangUtil.get('lb-closed')}
            </span>{" "}
            <span>- {status ? `${LangUtil.get('lb-close-at')} ${close}`  : `${LangUtil.get('lb-open-at')} ${open}`}</span>
        </div>
    )
}