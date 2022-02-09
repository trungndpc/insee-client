import React from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../popup/styles.scss";
import UploadFileUtil from "../utils/UploadFileUtil";


const owlClass = "popup";
const ERROR_LOCATION = -1;
const SUCCESS_LOCATION = 1;
const ERROR_REALTIME_PHOTO_TIME_CREATED = -2;
const SUCCESS_REALTIME_PHOTO = 2;
export default class RealtimePhotoWidget extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            error: 0,
            errorMsg: null,
            location: null,
            step: 1,
            image: null,
        }
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
        this.setState({ error: ERROR_LOCATION, errorMsg: error.message })
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.geoSuccessCallback, this.geoErrorCallback);
        }
    }

    onClickOpenCamera = () => {
        this.inputImgRef.click()
        this.timeClick = new Date().getTime();
    }

    checkValidLastModified = (lastModified) => {
        return true;
        // return lastModified >= this.timeClick;
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
                this.setState({ image: dataURL, step: 3 })
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
        return new Blob([ab], {type: mimeString});
    }

    click2Upload = () => {
        UploadFileUtil.uploadImg(this.dataURItoBlob(this.state.image))
        .then(resp => {
            if (resp.error == 200) {
                let json = {
                    url : resp.data,
                    time: this.timeClick,
                    location: this.state.location
                }
                this.props.onClose(json)
            }
        })
    } 

    render() {
        return (
            <Modal
                open={this.props.open}
                onClose={() => { }}
                center
                showCloseIcon={false}
                styles={{
                    modal: {
                        background: "rgba(242, 242, 242, 0.94)",
                        backdropFilter: "blur(54.3656px)",
                        borderRadius: "14px",
                        padding: "0",
                        maxWidth: "80%"
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
                        {this.state.image &&
                            <>
                                {this.state.error == ERROR_REALTIME_PHOTO_TIME_CREATED &&
                                    <p className="error_upload_photo">Vui lòng chụp ảnh, không chọn ảnh đã có</p>
                                }
                                <div className="photo-upload-item">
                                    <img src={this.state.image} />
                                </div>
                            </>
                        }
                    </div>
                    <div className={`${owlClass}__group-btn`}>
                        {this.state.step == 2 &&
                            <div
                                className={`${owlClass}__group-btn__item right ${this.state.error != ERROR_LOCATION ? 'btn-active' : 'btn-disable'}`}
                                onClick={this.onClickOpenCamera}
                            >
                                Chụp ảnh
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
                                <div
                                    className={`${owlClass}__group-btn__item right `}
                                    onClick={this.onClickOpenCamera}
                                >
                                    Chụp lại
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}