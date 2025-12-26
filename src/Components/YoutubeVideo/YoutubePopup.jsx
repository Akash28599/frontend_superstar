import React from 'react'
import './YoutubePopup.css'
import { Close } from '@mui/icons-material'

const YoutubePopup = ({ videoId, onClose }) => {
  if (!videoId) return null

  return (
    <div className="yt-modal" onClick={onClose} onScroll={(e) => e.stopPropagation()}>
      <Close
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '2%',
          right: '2%',
          color: '#fff',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 2,
          fontWeight: 700
        }}
      />
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
