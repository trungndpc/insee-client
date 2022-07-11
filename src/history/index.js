import React from 'react'
import FormModel from '../model/FormModel';
import * as FormStatus from '../constant/FormStatus'
import DateTimeUtil from '../utils/DateTimeUtil';

const owlClass = "App";

export default class ListHistory extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            list: null
        }
    }

    fetchHistory = () => {
        FormModel.list()
            .then(resp => {
                if (resp.error === 0) {
                    this.setState({ list: resp.data })
                }
            })
    }

    componentDidMount() {
        this.fetchHistory()
    }

    render() {
        return (
            <div className={`${owlClass}__blogs`}>
                <hr className={`${owlClass}__blogs__divide`} />
                <p className={`${owlClass}__blogs__title`}>Lịch sử</p>
                {this.state.list && this.state.list.map((item, index) => {
                    return (
                        <div key={index} className={`${owlClass}__blogs__history_item`}>
                            <div className={`${owlClass}__blogs__history_item__header`}>
                                {item.promotionName}
                            </div>
                            <div onClick={() => {
                                if (item.status === FormStatus.RECEIVED) {
                                    window.location.href = "/qua-tang/" + item.giftId
                                }
                            }} className={`${owlClass}__blogs__history_item_content`}>
                                <ul>
                                    <li>ID: {item.id}</li>
                                    <li>Thời gian: {DateTimeUtil.diffTime(item.time)}</li>
                                    <li>Trạng thái: {FormStatus.findName(item.status)}</li>
                                </ul>
                            </div>
                            {item.status === FormStatus.SENT_GIFT &&
                                <div onClick={() => { window.location.href = "/qua-tang/" + item.giftId }} className={`${owlClass}__blogs__history_item__footer`}>
                                    <div className={`${owlClass}__blogs__history_item__footer__btn`}>Quà tặng</div>
                                </div>
                            }
                        </div>
                    )
                })}

            </div>
        )
    }
}
