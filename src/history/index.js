import React from 'react'
import { Link } from 'react-router-dom';
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
                if (resp.error == 0) {
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
                        <div className={`${owlClass}__blogs__history_item`}>
                            {/* <Link to={"/bai-viet/" + item.promotionId}> */}
                                <div className={`${owlClass}__blogs__history_item__header`}>
                                    {item.promotionName}
                                </div>
                            {/* </Link> */}
                            <div className={`${owlClass}__blogs__history_item_content`}>
                                <ul>
                                    <li>ID: {item.id}</li>
                                    <li>Thời gian: {DateTimeUtil.diffTime(item.time)}</li>
                                    <li>Trạng thái: {FormStatus.findName(item.status)}</li>
                                </ul>
                            </div>
                            <div className={`${owlClass}__blogs__history_item__footer`}>
                                <div className={`${owlClass}__blogs__history_item__footer__btn`}>Đã nhận quà</div>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }
}
