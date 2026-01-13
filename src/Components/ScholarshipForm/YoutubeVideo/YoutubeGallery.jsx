import React, { useEffect, useState } from 'react'
import VideoThumbnail from './VideoThumbnail'
import VideoPopup from './VideoPopup'

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
    }, [])

    return (
        <div className="yt-cont font-kelloggs">
            {/* Main Video */}
            <div className="flex justify-center my-5">
                <VideoThumbnail
                    url={data.mainVideoLink}
                    onClick={setActiveVideo}
                    className="h-[100vh] w-full"
                    shouldBlur={true}
                    playIconSize='x-large'
                />
            </div>

            {/* News Snippets */}
            <div>
                <h1 className="text-kelloggs-red text-[35px] leading-[45px] font-bold mt-[5%] mb-[2%] ml-[10%] text-left">
                    News Snippets
                </h1>
                <div className="flex justify-between mx-[10%]">
                    {data.newSnippetsLinks.map((url, i) => (
                        <VideoThumbnail
                            key={i}
                            url={url}
                            onClick={setActiveVideo}
                            className="h-[30vh] w-[45%]"
                            playIconSize='large'
                        />
                    ))}
                </div>
            </div>

            {/* Edition Winners */}
            <div>
                <h1 className="text-kelloggs-red text-[35px] leading-[45px] font-bold mt-[5%] mb-[2%] ml-[10%] text-left">
                    {`${data.editionName} Edition Winners`}
                </h1>
                <div className="flex flex-row justify-end gap-[2%] mx-[10%]">
                    <div className="w-[40%] flex flex-col gap-4 border-l border-r border-kelloggs-red px-[2%]">
                        {data.editionWinnersLink.slice(1).map((url, i) => (
                            <VideoThumbnail
                                key={i}
                                url={url}
                                onClick={setActiveVideo}
                                className="w-full flex-1 min-h-0 overflow-hidden"
                                playIconSize='mid'

                            />
                        ))}
                    </div>

                    <div className="w-full gap-[2%]">
                        <VideoThumbnail
                            url={data.editionWinnersLink[0]}
                            onClick={setActiveVideo}
                            className="w-full h-full"
                            playIconSize='large'
                        />
                    </div>
                </div>
            </div>

            {/* Video Popup */}
            <VideoPopup
                url={activeVideo}
                onClose={() => setActiveVideo(null)}
            />
        </div>
    )
}

export default YoutubeGallery
