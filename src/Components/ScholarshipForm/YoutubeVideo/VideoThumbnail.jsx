import React, { useEffect, useState } from 'react'

const VideoThumbnail = ({ url, onClick, className, overlayText, shouldBlur = false, playIconSize = 'mid', isScholarshipPage = false, customThumbnail }) => {
    const [thumb, setThumb] = useState(null)
    const playIcon = '/assetss/youtube-icon.png' // can rename to generic play icon if you want

    // Detect YouTube
    const youtubeMatch = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    const isYouTube = !!youtubeMatch
    const videoId = youtubeMatch ? youtubeMatch[1] : null

    const iconTailwind = {
        small: 'w-6 h-6',       // 1.5rem
        mid: 'w-12 h-12',       // 3rem
        large: 'w-20 h-20',     // 5rem
        'x-large': 'w-[88px] h-[88px]' // custom arbitrary size
    }[playIconSize?.trim()] || 'w-12 h-12'

    useEffect(() => {
        if (!url || isYouTube) return // no need for first frame for YouTube

        const video = document.createElement('video')
        video.src = url
        video.crossOrigin = 'anonymous'
        video.muted = true

        const captureFrame = () => {
            const canvas = document.createElement('canvas')
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext('2d')
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            const imageUrl = canvas.toDataURL('image/jpeg')
            setThumb(imageUrl)
        }

        video.addEventListener('loadedmetadata', () => {
            video.currentTime = 0
        })
        video.addEventListener('seeked', captureFrame)
        video.load()

        return () => {
            video.removeEventListener('seeked', captureFrame)
        }
    }, [url, isYouTube])

    const thumbnailSrc = customThumbnail || (isYouTube
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : thumb)

    return (
        <div
            className={`relative cursor-pointer ${className}`}
            onClick={() => onClick(url)}
        >
            {thumbnailSrc ? (
                <img
                    src={thumbnailSrc}
                    alt="video thumbnail"
                    className="w-full h-full object-contain bg-black rounded-2xl"
                />
            ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-2xl text-white">
                    Loading...
                </div>
            )}

            {/* Play icon or Custom Scholarship Icon */}
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {isScholarshipPage ? (
                    <div className="kelloggs-superstar" style={{
                         width: '230px',
                         height: '230px',
                         marginBottom: '10px',
                         backgroundImage: "url('/assetss/kelloggH1.png'), url('https://kelloggsnigeria.ng/_nuxt/img/super-stars.a47ecf0.png')",
                         backgroundPosition: '50% 0, 50% 100%',
                         backgroundSize: 'contain, 80%',
                         backgroundRepeat: 'no-repeat'
                    }}>
                        {/* Centered Play Button for usability */}
                         <img src={playIcon} alt="play" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 opacity-80" />
                    </div>
                ) : (
                    <img src={playIcon} alt="play icon" className={iconTailwind} />
                )}
            </span>


            {/* Optional overlay blur */}
            {shouldBlur && <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>}

            {/* Optional overlay text */}
            {overlayText && (
                <p className="absolute bottom-2 left-2 text-white font-bold text-sm">{overlayText}</p>
            )}
        </div>
    )
}

export default VideoThumbnail
