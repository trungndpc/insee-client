import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const owlClass = "App";

export default class ListArticle extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            list: this.props.data
        }
    }

    render() {
        return (
            <div id="khuyen-mai" className={`${owlClass}__blogs`}>
                <hr className={`${owlClass}__blogs__divide`} />
                <p className={`${owlClass}__blogs__title`}>Khuyến mãi độc quyền</p>
                {this.state.list.map((article) => (
                    <Link key={article.id} to={`/bai-viet/${article.id}`}>
                        <div key={article.id} className={`${owlClass}__blogs__article`}>
                            <Img src={article.cover} alt="" />
                            <p className={`${owlClass}__blogs__article__title`}>
                                {article.title}
                            </p>
                            <p className={`${owlClass}__blogs__article__summary`}>
                                {article.summary}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}

class Img extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            src: props.src,
            errored: false,
        };
    }


    onError = () => {
        if (!this.state.errored) {
            this.setState({
                src: 'https://ia-stc-1.zdn.vn/images/img_default.png',
                errored: true,
            });
        }
    }

    render() {
        const { src } = this.state;
        const {
            src: _1,
            fallbackSrc: _2,
            ...props
        } = this.props;

        return (
            <img
                alt=''
                src={src}
                onError={this.onError}
                {...props}
            />
        );
    }
}


Img.propTypes = {
    src: PropTypes.string,
};