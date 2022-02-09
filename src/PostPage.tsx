import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImgRealtimePhoto, Post, StockForm } from "./interface";
import PostModel from "./model/PostModel";
import StockFormModel from "./model/StockFormModel";
import RealtimePhotoWidget from "./widget/RealtimePhotoWidget";
const owlClass = "App";


function PostPage() {
    let { id } = useParams()
    const [post, setPost] = useState<Post>()
    const [isOpenRealtimePopup, setIsOpenRealtimePopup] = useState(false)

    const fetchPost = (id: any) => {
        PostModel.get(id)
            .then(resp => {
                if (resp.error == 0) {
                    setPost(resp.data);
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
            <RealtimePhotoWidget open={isOpenRealtimePopup} onClose={(data: any) => {
                let realtimePhoto: ImgRealtimePhoto = data;
                let form: StockForm = {
                    promotionId: post!.promotionId,
                    detail: JSON.stringify(realtimePhoto)
                }
                createStockPromotion(form)
                setIsOpenRealtimePopup(false)
            }} />
            <img className={`${owlClass}__image`} src={post?.cover} alt="" />
            <div className={`${owlClass}__detail bv-content`}>
                <div dangerouslySetInnerHTML={{ __html: `${post?.content}` }}>
                </div>
                <div onClick={() => { setIsOpenRealtimePopup(true) }} className="Register__content__group-btn">Gửi hình</div>
            </div>

        </div>
    )
}

export default PostPage;