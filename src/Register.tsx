import { useState } from "react";
import { RegisterForm } from '../src/interface/index';
import { getListForRetailer } from "./utils/CementUtil";
import { ConfirmPhonePopup, ErrorPopup } from '../src/popup/index';
import UserModel from '../src/model/UserModel'
import { City } from '../src/common/province'

import "./resource/App.scss";
const owlClass = "Register";
const STEP_PHONE = 1;
const STEP_PROVINCE = 2;
const STEP_PRODUCTS = 3;

function Register() {
  const [form, setForm] = useState<RegisterForm>({} as RegisterForm)
  const [step, setStep] = useState(1)
  const [errorMsg, setErrorMsg] = useState<string>()
  const [isOpenConfirmPhonePopup, setIsOpenConfirmPhonePopup] = useState(false)
  const [isError, setIsError] = useState(false)

  const onSelectCement = (cementId: number) => {
    let cements = [...form.cements];
    if (cements.includes(cementId)) {
      cements = cements.filter((e) => e !== cementId);
    } else {
      cements.push(cementId)
    }
    setForm({ ...form, cements: cements })
  }

  const validate = () => {
    if (step === STEP_PHONE) {
      let phone = form.phone;
      let name = form.name;
      if (phone == null || phone.length <= 1) {
        setErrorMsg('Vui lòng nhập số điện thoại')
        return false;
      }
      if (name == null || name.length <= 1) {
        setErrorMsg('Vui lòng nhập chính xác tên của hàng của bạn')
        return false;
      }

    } else if (step === STEP_PROVINCE) {

      let cityId = form.cityId;
      let districtId = form.districtId;
      let address = form.address;
      if (!cityId || cityId === 0) {
        setErrorMsg('Vui chọn thành phố')
        return false;
      }
      if (!districtId || districtId === 0) {
        setErrorMsg('Vui lòng chọn quận huyện')
        return false;
      }

      if (!address) {
        setErrorMsg('Vui lòng nhập địa chỉ cửa hàng')
        return false;
      }
    }

    setErrorMsg('')
    return true;
  }

  const onClickOkConfirmPhonePopup = () => {
    setIsOpenConfirmPhonePopup(false);
    UserModel.checkPhone(form.phone)
      .then(resp => {
        if (resp.error === 10) {
          setErrorMsg('Anh chị không thể sử dụng số điện thoại này để đăng ký')
          return;
        } else if (resp.error === 7) {
          UserModel.register(form)
            .then(resp => {
              if (resp.error === 0) {
                window.location.href = "/"
              } else {
                setIsError(true)
              }
            })
        } else {
          setStep(STEP_PROVINCE)
        }
      })
  }

  const onClickButton = () => {
    if (validate()) {
      if (step === STEP_PHONE) {
        setIsOpenConfirmPhonePopup(true)
        return;
      }

      if (step === STEP_PROVINCE) {
        UserModel.register(form)
          .then(resp => {
            if (resp.error === 0) {
              window.location.href = "/"
            } else {
              setIsError(true)
            }
          })
        return;
      }
      setStep(step + 1)
    }
  }

  var city = new City(form.cityId)
  return (
    <div className={owlClass}>
      {form.phone && form.name &&
        <ConfirmPhonePopup phone={form.phone} storeName={form.name}
          onAgree={() => {
            onClickOkConfirmPhonePopup()
          }
          }
          onCloseModal={() => { setIsOpenConfirmPhonePopup(false) }}
          open={isOpenConfirmPhonePopup} />
      }
      {isError && <ErrorPopup open={isError} onCloseModal={() => { setIsError(false) }} />}
      <div className={`${owlClass}__title`}>
        <h2>ĐĂNG KÝ THÔNG TIN</h2>
        <div className="line-title">
          <ul>
            <li className={`line-item ${step === STEP_PHONE && 'active'}`}></li>
            <li className={`line-item ${step === STEP_PROVINCE && 'active'}`}></li>
            <li className={`line-item ${step === STEP_PRODUCTS && 'active'}`}></li>
          </ul>
        </div>
      </div>
      <div className={`${owlClass}__content`}>
        {step === STEP_PHONE &&
          <>
            <div className={`${owlClass}__content___form-group`}>
              <p>Số điện thoại</p>
              <input value={form.phone} type="tel" pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
                onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, phone: e.currentTarget.value }) }} />
            </div>
            <div className={`${owlClass}__content___form-group`}>
              <p>Tên cửa hàng</p>
              <input value={form.name}
                onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, name: e.currentTarget.value }) }} />
            </div>
          </>
        }
        {step === STEP_PROVINCE &&
          <>
            <div className={`${owlClass}__content___form-group`}>
              <p>Tỉnh/thành</p>
              <select value={form.cityId} onChange={(e: React.FormEvent<HTMLSelectElement>) => { setForm({ ...form, cityId: Number(e.currentTarget.value) }) }}>
                {(!form.cityId || form.cityId === 0) &&
                  <option value={0}></option>
                }
                {City.getOptions().map((city) => {
                  return (
                    <option key={city.value} value={city.value}>{city.label}</option>
                  )
                })}
              </select>
            </div>

            <div className={`${owlClass}__content___form-group`}>
              <p>Quận/huyện</p>
              <select value={form.districtId} onChange={(e: React.FormEvent<HTMLSelectElement>) => { setForm({ ...form, districtId: Number(e.currentTarget.value) }) }}>
                {(!form.districtId || form.districtId === 0) &&
                  <option value={0}></option>
                }
                {city && city.isValid() && city.getDistrictOptions().map((district) => {
                  return (
                    <option key={district.value} value={district.value}>{district.label}</option>

                  )
                })}
              </select>
            </div>
            <div className={`${owlClass}__content___form-group`}>
              <p>Địa chỉ</p>
              <input value={form.address}
                onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, address: e.currentTarget.value }) }} />
            </div>
          </>
        }
        {step === STEP_PRODUCTS &&
          <>
            <div className={`${owlClass}__content___form-group`}>
              <p>Sản phẩm</p>
              {getListForRetailer().map(value => {
                return (
                  <div className={`${owlClass}__content___form-group__cement-item`} onClick={() => { onSelectCement(Number(value.id)) }}>
                    <input checked={form.cements ? form.cements.includes(Number(value.id)) : false} type="checkbox" />
                    <p>{value.name}</p>
                  </div>
                )
              })}
            </div>
          </>
        }
        <div style={{ paddingTop: '40px', textAlign: 'center' }}>
          {errorMsg && <p className="error">{errorMsg}</p>}
          <div onClick={() => { onClickButton() }} className={`${owlClass}__content__group-btn`}>Đăng ký</div>
        </div>
      </div>
      <div className={`${owlClass}__footer`}>
        <div className={`${owlClass}__footer__wrapper`}>
          <img src="https://ximanginsee.gapit.com.vn/html/images/logo.png" height={'30px'} alt="Insee" />
        </div>
      </div>
    </div >
  );
}

export default Register;
