/* eslint-disable jsx-a11y/anchor-has-content */
import { useEffect, useState } from "react";
import UserModel from "./model/UserModel";
import PostModel from "./model/PostModel";
import ListArticle from "./article";
import { User, Post } from './interface/index'
import { City, District } from '../src/utils/ProvinceUtil'

import wallProImg from '../src/resource/images/insee/wall-pro.png';
import powsersImg from '../src/resource/images/insee/power-s.png';
import lavillaImg from '../src/resource/images/insee/lavilla.png';
import "./resource/App.scss";
import ListHistory from "./history";
import { useLocation } from "react-router-dom";
const owlClass = "App";

function App() {
  const { hash } = useLocation();
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<Array<Post>>()
  const [tab, setTab] = useState(hash == '#ls' ? 2 : 1)
  const fetchUser = () => {
    UserModel.getMe()
      .then(resp => {
        if (resp.error == 0) {
          setUser(resp.data)
        }
      })
  }
  const fetchPost = () => {
    PostModel.getMe()
      .then(resp => {
        if (resp.error == 0) {
          setPosts(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchUser()
    fetchPost()
  }, [])

  if (!user) {
    return <div></div>
  }

  return (
    <div className={owlClass}>
      <div className={`${owlClass}__shop`}>
        <div className={`${owlClass}__shop__left`}>
          <div className={`${owlClass}__shop__left__avatar`}>
            <img src={user.avatar} alt="" />
          </div>
          <div className={`${owlClass}__shop__left__info`}>
            <div className={`${owlClass}__shop__left__info__company`}>
              <h1 className={`${owlClass}__shop__left__info__company__name${(user.status == 8 && !user.name) ? '__waiting' : ''}`}>
                {(user.status == 8 && !user.name) ? '[Thông tin chờ duyệt]' : user.name}
              </h1>
            </div>
            <img
              src="https://stc-zoa-profile.zdn.vn/images/location.svg"
              alt=""
            />
            {user.cityId && user.districtId &&
              <span className={`${owlClass}__shop__left__info__enterprise`}>
                {City.getName(user.cityId)}
              </span>
            }
          </div>
        </div>
      </div>
      <div className={`${owlClass}__group-btn`}>
        <div onClick={() => setTab(1)} className={`${owlClass}__group-btn__item ${tab == 2 && 'follow'}`}>Khuyến mãi</div>
        <div onClick={() => setTab(2)} className={`${owlClass}__group-btn__item ${tab == 1 && 'follow'}`}>Quà tặng</div>
      </div>
      <div className={`${owlClass}__detail`}>
        <div className={`${owlClass}__detail__item`}>
          <img
            src="https://stc-zoa-profile.zdn.vn/images/location.svg"
            alt=""
          />
          <p className={`${owlClass}__detail__item__text`}>
            {(user.status == 8 && !user.address) ? '[Thông tin chờ duyệt]' : (`${user.address} - ${City.getName(user.cityId)}`)}
          </p>
        </div>
        {user.phone &&
          <div className={`${owlClass}__detail__item`}>
            <img
              src="https://stc-zoa-profile.zdn.vn/images/phone.svg"
              alt=""
            />
            <p onClick={() => window.open(`tel:${user.phone}`)} className={`${owlClass}__detail__item__text primary`}>
              {user.phone}
            </p>
          </div>
        }
      </div>
      {tab == 1 &&
        <div className={`${owlClass}__services`}>
          <hr className={`${owlClass}__services__divide`} />
          <p className={`${owlClass}__services__title`}>Sản phẩm</p>
          <div
            style={{
              display: "flex",
            }}
          >
            <div className={`${owlClass}__services__block`}>
              <div className={`${owlClass}__services__block__content`}>
                <img src={wallProImg} alt="" />
              </div>
            </div>
            <div className={`${owlClass}__services__block`}>
              <div className={`${owlClass}__services__block__content`}>
                <img src={powsersImg} alt="" />
              </div>
            </div>
            <div className={`${owlClass}__services__block`}>
              <div className={`${owlClass}__services__block__content`}>
                <img src={lavillaImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      }
      {tab == 1 && posts && <ListArticle data={posts} />}
      {tab == 2 && <ListHistory />}
    </div>
  );
}

export default App;
