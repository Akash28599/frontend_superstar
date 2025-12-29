import React, { useEffect, useState } from 'react'
import YoutubeThumbnail from './YoutubeThumbnail'
import YoutubePopup from './YoutubePopup'
import './YoutubeGallery.css'


const YoutubeGallery = () => {
    const [activeVideo, setActiveVideo] = useState(null)
    const [data, setData] = useState({
        mainVideoLink: "",
        newSnippetsLinks: [],
        editionWinnersLink: [],
        editionName: ""
    })
    const sample = {
        mainVideoLink: "https://www.youtube.com/watch?v=odO24fa2AqA",

        newSnippetsLinks: [

            "https://www.youtube.com/watch?v=sO6yTKuALmM",
            "https://www.youtube.com/watch?v=Do-7YsqtaX4"
        ],
        editionWinnersLink: [

            "https://www.youtube.com/watch?v=cxCjNytDL7g",
            "https://www.youtube.com/watch?v=NlgJr5gGCro&t=1s",
            "https://www.youtube.com/watch?v=3P8YKZUy7iQ",
            "https://www.youtube.com/watch?v=cBSVyCAlTfk",
            "https://www.youtube.com/watch?v=Co23nyyPWUc&t=1s",
        ],
        editionName: 'Second'
    }
    const fetchURLs = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/youtube-url?populate=*`)
        const json = await res.json()

        setData(json.data)
    } catch (err) {
                setData(sample)

        console.error("Fetch error:", err)
    }
}

    useEffect(() => {
        fetchURLs()
    }, []);
    return (
        <div className='yt-cont'>
            <div>
                <YoutubeThumbnail
                    url={data.mainVideoLink}
                    onPlay={setActiveVideo}
                    overlayText="Kelloggs Superstars Scholarship 6.0"
                    styleIcon={{ width: '260px', height: '260px' }}
                    shouldBlur={true}
                />
            </div>
            <div>
                <h1 className='yt-h1'>News Snippets</h1>
                <div className="yt-snip-grid">
                    {data.newSnippetsLinks.map((url, i) => (
                        <YoutubeThumbnail
                            key={i}
                            url={url}
                            onPlay={setActiveVideo}
                            styleThumb={{ width: '45%', height: '30vh', objectFit: 'contain' }}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h1 className='yt-h1'>{`${data.editionName} Edition Winners`}</h1>
                <div className="yt-winners">

                    <div className='yt-winleft'>
                        <YoutubeThumbnail
                            url={data.editionWinnersLink[0]}
                            onPlay={setActiveVideo}
                            styleThumbImage={{}}

                        />
                    </div>
                    <div className='yt-winright'>

                        {data.editionWinnersLink.slice(1).map((url, i) => (
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
