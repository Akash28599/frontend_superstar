import React from 'react'
import './YoutubePopup.css'

const YoutubePopup = ({ videoId, onClose }) => {
  if (!videoId) return null

  return (
    <div className="yt-modal" onClick={onClose}>
      <div
        className="yt-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default YoutubePopup
