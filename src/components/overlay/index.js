import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.styl';
import PlayArrow from '../../icons/play_arrow.svg';
import Spin from '../../icons/spin.svg';
import Report from '../../icons/report.svg';

class Overlay extends React.PureComponent {
    constructor (props){
        super(props)
        this.state = {
            show: true
        }
        this.clickTimer = null
    }

    componentDidMount() {
        this.timer = setTimeout(this.hideBar, this.props.timeout)
    }

    showBar = (e) => {
        clearTimeout(this.timer)
        this.setState(state => ({
            show: true
        }))

        this.timer = setTimeout(this.hideBar, this.props.timeout)
    }

    hideBar = () => {
        this.setState(state => ({
            show: false
        }))
    }

    renderContent ({ error, paused, loading }) {
        const iconProps = {
            className: styles.icon,
            height: 40,
            width: 40,
            fill: '#fff'
        };
        if (error) {
            return (
                <span className={styles.inner}>
                    <Report {...iconProps} />
                </span>
            );
        } else if (loading) {
            return (
                <span className={styles.inner}>
                    <Spin {...iconProps} />
                </span>
            );
        } else if (paused) {
            return (
                <span className={styles.inner}>
                    <PlayArrow {...iconProps} />
                </span>
            );
        }
    }

    onClick (e) {
        e.stopPropagation()
        if (this.clickTimer) {
            clearTimeout(this.clickTimer)
            this.clickTimer = null

            return this.props.onDoubleClick()
        }

        this.clickTimer = setTimeout(() => {
            this.props.onClick()
            this.clickTimer = null
        }, 150)
        return
    }

    render () {
        const { children, className, onClick, onDoubleClick, ...props } = this.props;
        const {show} = this.state
        return (
            <div className={[
                styles.overlay,
                className
            ].join(' ')}
                 onClick={this.onClick.bind(this)}
                 onMouseMove={this.showBar}>
                { this.renderContent(props.video) }
                {children.map((child, key) => React.cloneElement(child, {...props, key, show}))}
            </div>
        );
    }
}

Overlay.defaultProps = {
    timeout: 2000
}

Overlay.propTypes = {
    timeout: PropTypes.number
}

export { Overlay as default }
