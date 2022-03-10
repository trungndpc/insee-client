import { useState } from "react";
import { CardPhoneGift } from "../interface";
import "../resource/App.scss";
import * as TypeNetworkCardPhone from '../constant/type/TypeNetworkCardPhone'

function PhoneCard(data: any) {
    const [giftCards, setGiftCards] = useState<Array<CardPhoneGift>>(data.cards)

    const click = (code: string) => {
        let value = encodeURIComponent('*100*' + code + '#')
        window.open('tel:' + value, '_system');
    }

    return (
        <div className="phone_card_gifts">
            <div className="container">
                {giftCards && giftCards.map((item, index) => {
                    return (
                        <div onClick={() => {
                            click(item.code)
                        }} key={index} className="item">
                            <p style={{backgroundColor: TypeNetworkCardPhone.findColor(item.network)}}
                             className="header">#{index + 1} Thẻ {TypeNetworkCardPhone.findName(item.network)} {item.value}.000 đ</p>
                            <p className="content"><input className="code-cardphone" readOnly={true} value={item.code} /></p>
                        </div>
                    )
                })}
            </div>
        </div >
    );
}

export default PhoneCard;


