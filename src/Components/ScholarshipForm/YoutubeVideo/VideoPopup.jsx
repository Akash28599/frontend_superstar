import { Close } from '@mui/icons-material'

const VideoPopup = ({ url, onClose }) => {
  if (!url) return null

  // Detect if the URL is a YouTube link
  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  const isYouTube = !!youtubeMatch
  const videoId = youtubeMatch ? youtubeMatch[1] : null

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
      onClick={onClose} // close when clicking outside
    >
      <Close
        onClick={onClose} // close button
        className="absolute top-2 right-2 text-white text-2xl cursor-pointer z-10"
      />
      <div
        className="relative w-4/5 max-w-[900px] aspect-video bg-black rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {isYouTube ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube player"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <video
            src={url}
            controls
            autoPlay
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  )
}

export default VideoPopup
