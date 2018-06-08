/* this is https://github.com/mderrick/react-html5video/blob/master/src/DefaultPlayer/DefaultPlayer.js hacked */
import React from 'react';
import PropTypes from 'prop-types';

import {Navbar, Window} from 'butter-base-components'
import Volume from './components/volume'

import videoConnect, {
    Time,
    Seek,
    Captions,
    PlayPause,
    apiHelpers,
} from 'react-html5video';

import {DefaultPlayer as VPlayer} from 'react-html5video'

const {
    setVolume,
    showTrack,
    toggleTracks,
    toggleMute,
    togglePause,
    setCurrentTime,
    getPercentagePlayed,
    getPercentageBuffered
} = apiHelpers

import 'react-html5video/dist/styles.css';
import './style.css'
import style from './style.styl'

class Overlay extends React.PureComponent {
    constructor (props){
        super(props)
        this.state = {
            show: true
        }
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

    render() {
        const {children, ...props} = this.props
        const {show} = this.state

        return  (
            <div className={style.overlay} onMouseMove={this.showBar}>
                {children.map((child, key) => React.cloneElement(child, {...props, key, show}))}
            </div>
        )
    }
}

Overlay.defaultProps = {
    timeout: 2000
}

Overlay.propTypes = {
    timeout: PropTypes.number
}

const PlayBar = ({
    video,
    onSeekChange,
    onVolumeChange,
    onVolumeClick,
    onCaptionsClick,
    onPlayPauseClick,
    onCaptionsItemClick,
    ...props
}) => (
    <Navbar type='playbar-nav' {...props}>
        <PlayPause
            onClick={onPlayPauseClick}
            {...video} />
        <Time {...video} />
        <Seek
            onChange={onSeekChange}
            {...video} />
        <Volume
            onClick={onVolumeClick}
            onChange={onVolumeChange}
            {...video} />
        <Captions
            onClick={onCaptionsClick}
            onItemClick={onCaptionsItemClick}
            {...video}/>
    </Navbar>
)

PlayBar.propTypes = {
    show: PropTypes.bool
}

const DefaultPlayer = ({
    error,
    copy,
    video,
    goBack,
    children,
    className,
    handlers,
    ...props
}) => {
    return (
        <div className={className}>
            {error ? <p>{console.error(error)} </p>: null}
            <video
                {...props}>
                { children }
            </video>
            <Overlay onClick={handlers.onPlayPauseClick}>
                <Navbar type='player-nav' goBack={goBack}/>
                <PlayBar video={video} {...handlers}/>
            </Overlay>
        </div>
    );
};

DefaultPlayer.defaultProps = {
    video: {},
    goBack: {
        action: () => {},
        title: 'Go Back'
    }
};

DefaultPlayer.propTypes = {
    video: PropTypes.object.isRequired
};

const ConnectedPlayer = videoConnect(
    DefaultPlayer,
    ({ networkState, readyState, error, ...state }) => ({
        video: {
            readyState,
            networkState,
            error: error || networkState === 3,
            // TODO: This is not pretty. Doing device detection to remove
            // spinner on iOS devices for a quick and dirty win. We should see if
            // we can use the same readyState check safely across all browsers.
            loading: readyState < (/iPad|iPhone|iPod/.test(navigator.userAgent) ? 1 : 4),
            percentagePlayed: getPercentagePlayed(state),
            percentageBuffered: getPercentageBuffered(state),
            ...state
        }
    }),
    (videoEl, {error, ...state}) => ({
        error,
        handlers: {
            onFullscreenClick: () => toggleFullscreen(videoEl.parentElement),
            onVolumeClick: () => toggleMute(videoEl, state),
            onCaptionsClick: () => toggleTracks(state),
            onPlayPauseClick: () => togglePause(videoEl, state),
            onCaptionsItemClick: (track) => showTrack(state, track),
            onVolumeChange: (e) => setVolume(videoEl, state, e.target.value),
            onSeekChange: (e) => setCurrentTime(videoEl, state, e.target.value * state.duration / 100),
        }
    })
);

const Test = (props) => (
    <Window>
        <ConnectedPlayer {...props}/>
    </Window>
)

export {
    Test as default, ConnectedPlayer
}
