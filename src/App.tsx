import { useEffect, useState } from "react";
import UserModel from "./model/UserModel";
import PostModel from "./model/PostModel";
import ListArticle from "./article";
import { User, Post } from './interface/index'
import { City } from '../src/common/province'
import * as UserStatus from '../src/constant/UserStatus'

import productsImg from './resource/images/insee/products.png';
import "./resource/App.scss";
import ListHistory from "./history";
import { useLocation } from "react-router-dom";
const owlClass = "App";

const TAB_PROMOTION = 1;
const TAB_HISTORY = 2;

function App() {
  const { hash } = useLocation();
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<Array<Post>>()
  const [tab, setTab] = useState(hash === '#ls' ? 2 : 1)


  const fetchUser = () => {
    UserModel.getMe()
      .then(resp => {
        if (resp.error === 0) {
          setUser(resp.data)
        }
      })
  }
  const fetchPost = () => {
    PostModel.getMe()
      .then(resp => {
        if (resp.error === 0) {
          setPosts(resp.data)
        }
      })
  }

  const scroll = (id: any) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView()
    }, 100)
  }

  useEffect(() => {
    fetchUser()
    fetchPost()
  }, [])

  if (!user) {
    return <div></div>
  }

  const city = new City(user.cityId)
  return (
    <div className={owlClass}>
      <div className={`${owlClass}__shop`}>
        <div className={`${owlClass}__shop__left`}>
          <div className={`${owlClass}__shop__left__avatar`}>
            <img src={user.avatar} alt="" />
          </div>
          <div className={`${owlClass}__shop__left__info`}>
            <div className={`${owlClass}__shop__left__info__company`}>
              <h1 className={`${owlClass}__shop__left__info__company__name${(user.status === UserStatus.WAIT_APPROVAL && !user.name) ? '__waiting' : ''}`}>
                {user.name}
              </h1>
            </div>
            <img src="https://stc-zoa-profile.zdn.vn/images/location.svg" alt="" />
            {user.cityId && user.districtId &&
              <span className={`${owlClass}__shop__left__info__enterprise`}>
                {city && city.isValid() && city.getName()}
              </span>
            }
          </div>
        </div>
      </div>
      <div className={`${owlClass}__group-btn`}>
        <div onClick={() => {
          setTab(TAB_PROMOTION)
          scroll('khuyen-mai')
        }} className={`${owlClass}__group-btn__item ${tab === TAB_HISTORY && 'follow'}`} style={{ marginRight: '5px' }}>Khuyến mãi</div>
        <div onClick={() => setTab(TAB_HISTORY)} className={`${owlClass}__group-btn__item ${tab === TAB_PROMOTION && 'follow'}`} style={{ marginLeft: '5px' }}>Lịch sử</div>
      </div>
      <div className={`${owlClass}__detail`}>
        <div className={`${owlClass}__detail__item`}>
          <img src="https://stc-zoa-profile.zdn.vn/images/location.svg" alt="" />
          <p className={`${owlClass}__detail__item__text`}>
            {city && city.isValid() && `${user.address} - ${city.getDistrict()?.getName()} - ${city.getName()}`}
          </p>
        </div>
        {user.phone &&
          <div className={`${owlClass}__detail__item`}>
            <img src="https://stc-zoa-profile.zdn.vn/images/phone.svg" alt="" />
            <p onClick={() => window.open(`tel:${user.phone}`)} className={`${owlClass}__detail__item__text primary`}>
              {user.phone}
            </p>
          </div>
        }
      </div>
      {tab === TAB_PROMOTION &&
        <div className={`${owlClass}__services`}>
          <hr className={`${owlClass}__services__divide`} />
          <p style={{ marginBottom: '5px' }} className={`${owlClass}__services__title`}>Dịch vụ</p>
          <div
            style={{
              textAlign: 'center',
              display: "block",
            }}
          >
            <img onClick={() => { window.location.href = "https://insee.com.vn/vn" }} style={{ height: '100px', paddingRight: '15px' }} alt="" src={productsImg} />
          </div>
        </div>
      }
      {tab === TAB_PROMOTION && user.status === UserStatus.APPROVED && posts && <ListArticle data={posts} />}
      {tab === TAB_HISTORY && user.status === UserStatus.APPROVED && <ListHistory />}
    </div>
  );
}

export default App;
