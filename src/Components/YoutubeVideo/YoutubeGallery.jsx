import React, { useState } from 'react'
import YoutubeThumbnail from './YoutubeThumbnail'
import YoutubePopup from './YoutubePopup'
import './YoutubeGallery.css'


const YoutubeGallery = () => {
    const [activeVideo, setActiveVideo] = useState(null)
    const data = {
        main: "https://www.youtube.com/watch?v=odO24fa2AqA",

        snippets: [

            "https://www.youtube.com/watch?v=sO6yTKuALmM",
            "https://www.youtube.com/watch?v=Do-7YsqtaX4"
        ],
        editionWinners: [

            "https://www.youtube.com/watch?v=cxCjNytDL7g",
            "https://www.youtube.com/watch?v=NlgJr5gGCro&t=1s",
            "https://www.youtube.com/watch?v=3P8YKZUy7iQ",
            "https://www.youtube.com/watch?v=cBSVyCAlTfk",
            "https://www.youtube.com/watch?v=Co23nyyPWUc&t=1s",
        ],
        editionWinnerTitle: 'Second'
    }
    return (
        <div className='yt-cont'>
            <div>
                <YoutubeThumbnail
                    url={data.main}
                    onPlay={setActiveVideo}
                    overlayText="Kelloggs Superstars Scholarship 6.0"
                    styleIcon={{ width: '260px', height: '260px' }}
                    shouldBlur={true}
                />
            </div>
            <div>
                <h1 className='yt-h1'>News Snippets</h1>
                <div className="yt-snip-grid">
                    {data.snippets.map((url, i) => (
                        <YoutubeThumbnail
                            key={i}
                            url={url}
                            onPlay={setActiveVideo}
                            styleThumb={{ width: '45%', height: '200px', objectFit: 'contain' }}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h1 className='yt-h1'>{`${data.editionWinnerTitle} Edition Winners`}</h1>
                <div className="yt-winners">

                    <div className='yt-winleft'>
                        <YoutubeThumbnail
                            url={data.editionWinners[0]}
                            onPlay={setActiveVideo}
                            styleThumbImage={{ objectFit: 'cover' }}

                        />
                    </div>
                    <div className='yt-winright'>

                        {data.editionWinners.slice(1).map((url, i) => (
                            <YoutubeThumbnail
                                key={i}
                                url={url}
                                onPlay={setActiveVideo}
                                styleThumb={{ width: '80%', margin: '0 10%' }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <YoutubePopup
                videoId={activeVideo}
                onClose={() => setActiveVideo(null)}
            />
        </div>
    )
}

export default YoutubeGallery
