import React from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import UserModel from "../model/UserModel";
import "../popup/styles.scss";
import UploadFileUtil from "../utils/UploadFileUtil";


const owlClass = "popup";
const ERROR_LOCATION = -1;
const SUCCESS_LOCATION = 1;
const PLEASE_ACCPET_LOCATION = 3;
const ERROR_REALTIME_PHOTO_TIME_CREATED = -2;
export default class RealtimePhotoWidget extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            error: 0,
            errorMsg: null,
            location: null,
            step: 1,
            images: [],
        }
        this.count_request_location = 0
        this.timeClick = 0;
    }



    geoSuccessCallback = (position) => {
        this.setState({
            error: SUCCESS_LOCATION, location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            step: 2
        })
    }

    geoErrorCallback = (error) => {
        // this.setState({ error: ERROR_LOCATION, errorMsg: error.message })
        this.setState({
            error: SUCCESS_LOCATION, location: {
                latitude: 1,
                longitude: 1
            },
            step: 2
        })
    }

    shouldComponentUpdate(nextProp, nextState) {
        if (nextProp.open == true && this.props.open == false) {
            if (navigator.geolocation && this.count_request_location == 0) {
                this.count_request_location++;
                nextState.error = PLEASE_ACCPET_LOCATION;
                navigator.geolocation.getCurrentPosition(this.geoSuccessCallback, this.geoErrorCallback);
            }
        }
        return true;
    }

    onClickOpenCamera = () => {
        this.inputImgRef.click()
        this.timeClick = new Date().getTime();
    }

    checkValidLastModified = (lastModified) => {
        // return true;
        return lastModified >= this.timeClick;
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
            if (!this.checkValidLastModified(img.lastModified)) {
                this.setState({ error: ERROR_REALTIME_PHOTO_TIME_CREATED })
            } else {
                this.setState({ error: 0 })
                this.drawImagCanvas(img, this.state.location, img.lastModified)
            }
        }
    };

    drawImagCanvas = (file, location, lastModified) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            var image = new Image();
            image.src = e.target.result;
            image.onload = (ev) => {
                var canvas = document.getElementById('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);
                ctx.font = "bold 10px Arial"
                ctx.fillRect(0, 0, image.width, 50);
                ctx.fillStyle = "white";
                ctx.fillText(`Location: ${location.latitude} - ${location.longitude}`, 20, 20);
                ctx.fillText(`Time: ${new Date(lastModified).toLocaleString('vi')}`, 20, 35);
                var dataURL = canvas.toDataURL('image/jpeg')

                //add image to list
                let images = [...this.state.images]
                images.push(dataURL)
                this.setState({ images: images, step: 3 })
            }
        }
    }

    dataURItoBlob = (dataURI) => {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    click2Upload = async () => {
        UserModel.getMe()
            .then(async resp => {
                if (resp.error == 0) {
                    let user = resp.data;
                    let jsons = []
                    let jobs = await Promise.all(this.state.images.map(image => UploadFileUtil.uploadImg(this.dataURItoBlob(image), user.phone + ".jpg")));
                    jobs.forEach((resp) => {
                        if (resp.error == 200) {
                            let json = {
                                url: resp.data,
                                time: this.timeClick,
                                location: this.state.location
                            }
                            jsons.push(json)
                        }
                    })
                    this.props.onSubmit(jsons)
                } else {
                    alert("Có lỗi xảy ra, vui lòng thử lại")
                }
            })
    }

    removeImg = (img) => {
        let images = [...this.state.images]
        images = images.filter(item => item !== img)
        this.setState({ images: images })
        if (images.length == 0) {
            this.setState({ step: 2 })
        }
    }

    render() {
        return (
            <Modal
                open={this.props.open}
                onClose={() => {
                    this.props.onClose()
                }}
                center
                showCloseIcon={false}
                styles={{
                    modal: {
                        background: "rgba(242, 242, 242, 0.94)",
                        backdropFilter: "blur(54.3656px)",
                        borderRadius: "14px",
                        padding: "0",
                        maxWidth: "90%"
                    },
                }}
            >
                <>
                    <canvas style={{ display: 'none' }} id="canvas" />
                    <input style={{ display: 'none' }} ref={e => this.inputImgRef = e} onChange={this.onImageChange} type="file" accept="image/*" capture></input>
                </>
                <div className={owlClass}>
                    <div className={`${owlClass}__wrapper`}>
                        <div className={`${owlClass}__wrapper__title`}>Realtime Photo</div>
                        <p className={`${owlClass}__wrapper__desc`}>
                            <span>1. Chấp nhận chia sẽ vị trí hiện tại </span>
                            <br />
                            <span>2. Chụp ảnh trực tiếp</span>
                        </p>
                    </div>
                    <div className="photo_preview">
                        {this.state.error == ERROR_REALTIME_PHOTO_TIME_CREATED &&
                            <p className="error_upload_photo">Vui lòng chụp ảnh, không chọn ảnh đã có</p>
                        }
                        <div style={{ display: 'flex', flexFlow: 'wrap', alignContent: 'space-between', justifyContent: 'space-between' }}>
                            {this.state.error == 0 && this.state.images &&
                                this.state.images.map((image, index) => {
                                    return (
                                        <>
                                            <div key={index} className="photo-upload-item">
                                                <span onClick={() => { this.removeImg(image) }} className="btn-x">X</span>
                                                <img src={image} />
                                            </div>
                                            {(index + 1) % 2 == 0 && <div className="line-break "></div>}
                                        </>

                                    )
                                })}
                        </div>

                    </div>
                    <div className={`${owlClass}__group-btn`}>
                        {this.state.step == 2 && this.state.error != ERROR_LOCATION && this.state.error != PLEASE_ACCPET_LOCATION &&
                            < div
                                className={`${owlClass}__group-btn__item right ${this.state.error != ERROR_LOCATION ? 'btn-active' : 'btn-disable'}`}
                                onClick={this.onClickOpenCamera}
                            >
                                Chụp ảnh
                            </div>
                        }
                        {this.state.step == 2 && this.state.error == PLEASE_ACCPET_LOCATION &&
                            <div className={`${owlClass}__group-btn__item right btn-active`} >
                                Vui lòng chấp nhận chia sẻ vị trí
                            </div>
                        }
                        {this.state.step == 3 &&
                            <>
                                <div
                                    className={`${owlClass}__group-btn__item right btn-active`}
                                    onClick={this.click2Upload}
                                >
                                    Gủi ảnh
                                </div>
                                {this.state.images && this.state.images.length < 4 &&
                                    <div
                                        className={`${owlClass}__group-btn__item right `}
                                        onClick={this.onClickOpenCamera}
                                    >
                                        Thêm ảnh
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </Modal >
        )
    }
}