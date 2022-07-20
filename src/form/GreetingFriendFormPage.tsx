import { useEffect, useState } from "react";

import "../resource/App.scss";
import { ImgRealtimePhoto, Promotion, GreetingFriendForm } from "../interface";
import { ErrorPopup } from "../popup";
import PromotionModel from "../model/PromotionModel";
import { useParams } from "react-router-dom";
import Select from "react-select";
import * as  CementUtil from "../utils/CementUtil";
import RealtimePhotoWidget from "../widget/RealtimePhotoWidget";
import GreetingFriendFormModel from "../model/GreetingFriendFormModel";
import { APPROVED, INIT, RECEIVED, WAITING_SUBMIT } from "../constant/FormStatus";


const owlClass = "Stock-form";
function GreetingFriendFormPage() {
    const { promotionId } = useParams() as {
        promotionId: string;
    }
    const [form, setForm] = useState<GreetingFriendForm>({} as GreetingFriendForm)
    const [errorMsg, setErrorMsg] = useState<string>()
    const [isError, setIsError] = useState(false)
    const [promotion, setPromotion] = useState<Promotion>()
    const [isOpenRealtimePopup, setIsOpenRealtimePopup] = useState(false)

    const fetchPromotion = () => {
        PromotionModel.get(promotionId)
            .then(resp => {
                if (resp.error === 0) {
                    setPromotion(resp.data)
                }
            })
    }

    const isValidForm = () => {
        if (!form.cements || form.cements.length <= 0) {
            setErrorMsg('Vui lòng chọn xi măng');
            return false;
        }
        if (!form.bags || form.bags <= 0) {
            setErrorMsg('Vui lòng nhập số bao xi măng')
            return false;
        }
        setErrorMsg('')
        return true;
    }

    const createGreetingFriendForm = (form: GreetingFriendForm) => {
        GreetingFriendFormModel.create(form)
            .then(resp => {
                if (resp.error === 0) {
                    window.location.href = "/#ls"
                }
            })
    }


    useEffect(() => {
        fetchPromotion()
    }, [])

    const statusSubmitedForm = promotion?.forms[0].status
    console.log(statusSubmitedForm)

    return (
        <div className={owlClass}>
            {isError && <ErrorPopup open={isError} onCloseModal={() => { setIsError(false) }} />}
            <div className={`${owlClass}__title`}>
                <h2 style={{ textTransform: 'uppercase' }}>{promotion?.title}</h2>
                <div className="line-title">
                    <ul>
                        <li className={`line-item 'active'}`}></li>
                    </ul>
                </div>
            </div>
            {statusSubmitedForm == RECEIVED && <div className={`${owlClass}__msg_center`}>Cảm ơn anh chị đã tham gia chương trình</div>}
            {statusSubmitedForm == INIT && <div className={`${owlClass}__msg_center`}>Cảm ơn anh chị đã tham gia chương trình, vui lòng chờ duyệt đơn!</div>}
            {statusSubmitedForm == APPROVED && <div className={`${owlClass}__msg_center`}>Cảm ơn anh chị đã tham gia chương trình, đơn của anh chị đã được duyệt, chúng tôi sẽ gửi quà tới anh chị sớm nhất có thể.</div>}
            {statusSubmitedForm === WAITING_SUBMIT &&
                <div className={`${owlClass}__content`}>
                    <div className={`${owlClass}__content___form-group`}>
                        <p>Loại xi măng</p>
                        <Select
                            onChange={(e) => {
                                let list = e.map((x: any) => Number(x.value));
                                setForm({ ...form, cements: list })
                            }}
                            styles={customStyles}
                            isClearable={true}
                            isMulti={true}
                            options={CementUtil.getOption()}
                        />
                    </div>
                    <div className={`${owlClass}__content___form-group`}>
                        <p>Số bao</p>
                        <input value={form.bags}
                            type="number"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, bags: Number(e.currentTarget.value) }) }} />
                    </div>
                    <div style={{ paddingTop: '40px', textAlign: 'center' }}>
                        {errorMsg && <p className="error">{errorMsg}</p>}
                        <div onClick={() => {
                            if (isValidForm()) {
                                setIsOpenRealtimePopup(true)
                            }
                        }} className={`${owlClass}__content__group-btn`}>Chụp hình</div>
                    </div>
                </div>
            }
            <div className={`${owlClass}__footer`}>
                <div className={`${owlClass}__footer__wrapper`}>
                    <img src="https://ximanginsee.gapit.com.vn/html/images/logo.png" height={'30px'} alt="Insee" />
                </div>
            </div>
            <RealtimePhotoWidget
                open={isOpenRealtimePopup} onClose={() => {
                    setIsOpenRealtimePopup(false)
                }}
                onSubmit={(data: any) => {
                    let realtimePhoto: Array<ImgRealtimePhoto> = data;
                    let reqForm: GreetingFriendForm = {
                        promotionId: Number(promotionId),
                        detail: JSON.stringify(realtimePhoto),
                        bags: form.bags,
                        cements: form.cements
                    }
                    createGreetingFriendForm(reqForm)
                    setIsOpenRealtimePopup(false)
                }} />
        </div >
    );
}

export default GreetingFriendFormPage;

const customStyles = {
    control: (base: any) => ({
        ...base,
        minHeight: '47px',
        borderRadius: '12px'
    })
}
