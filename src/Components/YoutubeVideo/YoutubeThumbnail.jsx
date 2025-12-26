import React from 'react'
import './YoutubeThumbnail.css'

const YoutubeThumbnail = ({ url, onPlay, styleIcon, overlayText, shouldBlur = false ,styleThumb,styleThumbImage}) => {
    const ytIcon = '/assetss/youtube-icon.png'
    const videoId = url.split('v=')[1]?.split('&')[0]

    return (
        <div className="yt-thumb" onClick={() => onPlay(videoId)} style={styleThumb}>
            <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="youtube thumbnail"
                className='yt-vid'
                style={styleThumbImage}
            />
            {shouldBlur && <div className='yt-overlay'></div>}
            <p className='yt-txt'>{overlayText}</p>
            <span className="yt-play" style={styleIcon}><img src={ytIcon} /></span>
        </div>
    )
}

export default YoutubeThumbnail