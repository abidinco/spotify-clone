import styles from './PlayerBar.module.css'
import React from 'react';
import Icon from '../UI/Icon';

const PlayerBar = () => {
    return (
        <div className={styles.bar}>
            <div className={styles['now-playing']}>
                <img className={styles['now-playing-cover']} alt="Song Cover" src="/browse-card-images/new-releases.jfif" />
                <div className={styles['now-playing-info']}>
                    <div className={styles['now-playing-info-title']}>Bregovic: Ederlezi</div>
                    <div className={styles['now-playing-info-artist']}>Goran Bregovic, Nigel Kennedy, The Kroke Band</div>
                </div>
                <div className={styles['now-playing-action-button']}>
                    <Icon name="player-heart" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                </div>
                <div className={styles['now-playing-action-button']}>
                    <Icon name="player-pip-toggle" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                </div>
            </div>
            <div className={styles['player-controls']}>
                <div className={styles['player-control-buttons']}>
                    <Icon name="player-shuffle" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                    <Icon name="player-skip-back" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                    <div className={styles['player-control-play']}>
                        <Icon name="player-play" color="black" width={16} height={16} />
                    </div>
                    <Icon name="player-skip-forward" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                    <Icon name="player-repeat" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                </div>
                <div className={styles['player-control-bar']}>
                    <div className={styles['player-control-position']}>
                        7:51
                    </div>
                    <div className={styles['player-control-progress']}>
                        <input className={styles['player-control-progress-input']} type="range" min={0} max={100} step={2} />
                    </div>
                    <div className={styles['player-control-duration']}>
                        9:40
                    </div>
                </div>
            </div>
            <div className={styles.controls}>
                Volume control
            </div>
        </div>
    )
}

export default PlayerBar;