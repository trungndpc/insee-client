import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import styles from "./style";

class BottomSheet extends Component {
  state = {
    opacity: 0,
    translate: 100,
    display: "hidden",
  };

  componentWillMount() {
    if (this.props.startHidden === false) {
      this.setState({
        opacity: 0.5,
        translate: 0,
        display: "visible",
      });
    }
  }

  lockBody = () => {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
  }

  unLockBody = () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
  }

  hideNow = () => {
    this.unLockBody()
    this.setState(
      {
        opacity: 0,
        translate: 100,
        display: "hidden"
      }
    );
  }

  animate = () => {
    if (!this.props.items || this.props.items.length <= 0) {
      this.props.onClick();
      return;
    }
    this.setState(
      {
        opacity: this.state.opacity === 0.5 ? 0 : 0.5,
        translate: this.state.opacity === 0 ? 0 : 100,
      },
      () => {
        if (this.state.opacity === 0) {
          setTimeout(() => {
            this.unLockBody();
            this.setState({
              display: "hidden",
            });
          }, 200);
        } else {
          this.lockBody();
          this.setState({
            display: "visible",
          });
        }
      }
    );
  };

  render() {
    return (
      <div
        style={
          this.props.isSameWidth
            ? { display: "inline-flex", flex: "1 1 auto", width: "0", marginRight: '12px' }
            : { display: "inline-block" }
        }
      >
        {React.cloneElement(this.props.element, {
          onClick: this.animate,
        })}
        <Motion
          style={{
            opacity: spring(this.state.opacity),
            translate: spring(this.state.translate),
          }}
        >
          {({ opacity, translate }) => (
            <div
              style={Object.assign({}, styles.container, {
                visibility: this.state.display,
              })}
              onClick={this.animate}
            >
              <div
                style={Object.assign({}, styles.backgroundContainer, {
                  opacity: opacity,
                })}
              />
              <ul
                style={Object.assign({}, styles.list, {
                  transform: `translateY(${translate}%)`,
                })}
              >
                {!!this.props.title && (
                  <li style={{
                    position: 'sticky',
                    top: '0px'
                  }}>
                    <button
                      style={{
                        ...styles.button,
                        justifyContent: "center",
                        borderBottom: "unset",
                        fontWeight: "700",
                      }}
                    >
                      <span style={styles.text}>{this.props.title}</span>
                    </button>
                  </li>
                )}
                {this.props.items.map((item, index) => {
                  return (
                    <li key={index}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          this.hideNow()
                          item.onClick.call(this);
                        }}
                        style={styles.button}
                      >
                        {item.icon &&
                          React.cloneElement(item.icon, {
                            style: {
                              marginRight: "10px",
                              width: "25px"
                            },
                          })}
                        <span
                          style={{
                            ...styles.text,
                            color: item.color ? item.color : "#222222",
                          }}
                        >
                          {item.text}
                        </span>
                      </button>
                    </li>
                  );
                })}
                {!!this.props.cancel && (
                  <li>
                    <button
                      style={{
                        ...styles.button,
                        justifyContent: "center",
                        borderBottom: "unset",
                        fontWeight: "700",
                        borderTop: "0px solid #E0E0E0",
                      }}
                    >
                      <span style={styles.text}>{this.props.cancel}</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

export default BottomSheet;
