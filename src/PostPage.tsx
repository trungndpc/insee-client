import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { STOCK_PROMOTION_TYPE } from "./constant/PromotionType";
import { ImgRealtimePhoto, Post, Promotion, StockForm } from "./interface";
import PostModel from "./model/PostModel";
import PromotionModel from "./model/PromotionModel";
import StockFormModel from "./model/StockFormModel";
import RealtimePhotoWidget from "./widget/RealtimePhotoWidget";
const owlClass = "App";


function PostPage() {
    let { id } = useParams()
    const [post, setPost] = useState<Post>()
    const [isOpenRealtimePopup, setIsOpenRealtimePopup] = useState(false)
    const [promotion, setPromotion] = useState<Promotion>()

    const fetchPromotion = (promotionId: any) => {
        PromotionModel.get(promotionId)
            .then(resp => {
                if (resp.error == 0) {
                    setPromotion(resp.data)
                }
            })
    }

    const fetchPost = (id: any) => {
        PostModel.get(id)
            .then(resp => {
                if (resp.error == 0) {
                    setPost(resp.data);
                    fetchPromotion(resp.data.promotionId)
                }
            })
    }

    const createStockPromotion = (form: StockForm) => {
        StockFormModel.create(form)
            .then(resp => {
                if (resp.error == 0) {
                    window.location.href = "/#ls"
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
                {promotion && promotion.type == STOCK_PROMOTION_TYPE &&
                    <>
                        {!isOpenRealtimePopup && <div onClick={() => { setIsOpenRealtimePopup(true) }} className="Register__content__group-btn sticky-bottom">Gửi hình</div>
                        }

                        <RealtimePhotoWidget open={isOpenRealtimePopup} onClose={() => {
                            setIsOpenRealtimePopup(false)
                        }}
                            onSubmit={(data: any) => {
                                let realtimePhoto: Array<ImgRealtimePhoto> = data;
                                let form: StockForm = {
                                    promotionId: post!.promotionId,
                                    detail: JSON.stringify(realtimePhoto)
                                }
                                createStockPromotion(form)
                                setIsOpenRealtimePopup(false)
                            }} />
                    </>
                }
            </div>

        </div>
    )
}

export default PostPage;