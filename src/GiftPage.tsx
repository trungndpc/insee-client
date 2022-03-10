import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhoneCard from "./gift/PhoneCard";
import { CardPhoneGift, Gift, RegisterForm } from './interface/index';
import GiftModel from "./model/GiftModel";
import { ConfirmPhonePopup, ErrorPopup } from './popup/index';
import * as GiftStatus from './constant/GiftStatus'
import * as TypeGift from './constant/type/TypeGift'

import "./resource/App.scss";
import { Card } from "material-ui";
const owlClass = "Register";

function GiftPage() {
  let { id } = useParams()
  const [gift, setGift] = useState<Gift>()
  const [isError, setIsError] = useState(false)

  const fetchGift = () => {
    GiftModel.get(id)
      .then((resp) => {
        if (resp.error == 0) {
          setGift(resp.data)
        }
      })
  }

  const updateStatus = () => {
    GiftModel.updateStatus(id, GiftStatus.RECEIEVED)
      .then((resp) => {
        if (resp.error == 0) {
          fetchGift()
        }
      })
  }

  const onClickButton = () => {
    updateStatus()
  }

  useEffect(() => {
    fetchGift()
  }, [])




  return (
    <div className={owlClass}>
      {isError && <ErrorPopup open={isError} onCloseModal={() => { setIsError(false) }} />}
      <div className={`${owlClass}__title`}>
        <h2>THẺ CÀO ĐIỆN THOẠI</h2>
        <div className="line-title">
          <ul>
            <li className={`line-item active`}></li>
          </ul>
        </div>
      </div>
      {gift?.status == GiftStatus.SENT &&
        <>
          <div className={`${owlClass}__content`}>
            <p style={{ lineHeight: '20px', marginBottom: '10px' }}>Chúc mừng quý cửa hàng đã nhận được phần thưởng <span style={{ fontWeight: '600' }}>{gift.title}</span></p>
            <p style={{ lineHeight: '20px' }}>Vui lòng nhấn nút xác nhận để nhận quà</p>
          </div>
          <div className={`${owlClass}__content`}>
            <div style={{ paddingTop: '40px', textAlign: 'center' }}>
              <div onClick={() => { onClickButton() }} className={`${owlClass}__content__group-btn`}>Xác nhận</div>
            </div>
          </div>
        </>
      }
      {gift?.status == GiftStatus.RECEIEVED &&
        <div className={`${owlClass}__content`}>
          {gift.type == TypeGift.CARD_PHONE &&
            <PhoneCard cards={gift.content} />
          }
        </div>
      }
      <div className={`${owlClass}__footer`}>
        <div className={`${owlClass}__footer__wrapper`}>
          <img src="https://ximanginsee.gapit.com.vn/html/images/logo.png" height={'30px'} alt="Insee" />
        </div>
      </div>
    </div >
  );
}

export default GiftPage;
