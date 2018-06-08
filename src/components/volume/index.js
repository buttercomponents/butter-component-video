import React from 'react'
import styles from './style.styl'
import VolumeOff from '../../icons/volume_off.svg'
import VolumeUp from '../../icons/volume_up.svg'

export default ({ onChange, onClick, volume, muted, className, ariaLabelMute, ariaLabelUnmute, ariaLabelVolume }) => {
  const volumeValue = muted || !volume
    ? 0
    : +volume
  const isSilent = muted || volume <= 0
  return (
    <div className={[
      styles.component,
      className,
      'Volume_component'
    ].join(' ')}>
      <button
        aria-label={isSilent
          ? ariaLabelUnmute
          : ariaLabelMute}
        className={styles.button}
        onClick={onClick}
        type='button'>
        { isSilent
          ? <VolumeOff
            height={20}
            width={20}
            className={styles.icon}
            fill='#fff' />
          : <VolumeUp
            height={20}
            width={20}
            className={styles.icon}
            fill='#fff' /> }
      </button>
      <div className={styles.slider}>
        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{
              width: `${volumeValue * 100}%`
            }} />
          <input
            min='0'
            step={0.1}
            max='1'
            type='range'
            orient='horizontal'
            onChange={onChange}
            aria-label={ariaLabelVolume}
            className={styles.input}
            value={volumeValue} />
        </div>
      </div>
    </div>
  )
}
