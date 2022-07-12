import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GREETING_NEW_FRIEND_PROMOTION_TYPE, STOCK_PROMOTION_TYPE } from "./constant/PromotionType";
import { Post, Promotion } from "./interface";
import PostModel from "./model/PostModel";
import PromotionModel from "./model/PromotionModel";
import { useNavigate } from 'react-router-dom';
const owlClass = "App";


function PostPage() {
    let navigate = useNavigate();
    let { id = 19 } = useParams()
    const [post, setPost] = useState<Post>()
    const [promotion, setPromotion] = useState<Promotion>()

    const fetchPromotion = (promotionId: any) => {
        PromotionModel.get(promotionId)
            .then(resp => {
                if (resp.error === 0) {
                    setPromotion(resp.data)
                }
            })
    }

    const fetchPost = (id: any) => {
        PostModel.get(id)
            .then(resp => {
                if (resp.error === 0) {
                    setPost(resp.data);
                    if (resp.data.promotionId) {
                        fetchPromotion(resp.data.promotionId)
                    }
                }
            })
    }

    useEffect(() => {
        fetchPost(id)
    }, [])


    return (
        <div className={owlClass}>

            <img className={`${owlClass}__image`} src={post?.cover} alt="" />
            <div className={`${owlClass}__detail bv-content`}>

                <div className="sticky-bottom-content" dangerouslySetInnerHTML={{ __html: `${post?.content}` }}>
                </div>
                {promotion && promotion.type === STOCK_PROMOTION_TYPE &&
                    <div onClick={() => {
                        navigate(`/khuyen-mai/stock-promotion/${promotion.id}/dang-ky`)
                    }} className="Register__content__group-btn sticky-bottom">Tham gia ngay</div>
                }
                {promotion && promotion.type === GREETING_NEW_FRIEND_PROMOTION_TYPE &&
                    <div onClick={() => {
                        navigate(`/khuyen-mai/chao-ban-moi/${promotion.id}/dang-ky`)
                    }} className="Register__content__group-btn sticky-bottom">Tham gia ngay</div>
                }
            </div>

        </div>
    )
}

export default PostPage;