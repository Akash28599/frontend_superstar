import React, { useEffect, useState } from 'react'
import VideoThumbnail from './VideoThumbnail'
import VideoPopup from './VideoPopup'
import campaignThumb from './campaign_thumbnail.jpg'

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

const YoutubeGallery = () => {
    const [activeVideo, setActiveVideo] = useState(null)
    const [data, setData] = useState({
        mainVideoLink: "",
        newSnippetsLinks: [],
        editionWinnersLink: [],
        editionName: ""
    })

    useEffect(() => {
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
                    isScholarshipPage={true}
                    customThumbnail={campaignThumb}
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
            <div className='mb-48'>
                <h1 className="text-kelloggs-red text-[35px] leading-[45px] font-bold mt-[5%] mb-[2%] ml-[10%] text-left">
                    {`${data.editionName} Edition Winners`}
                </h1>

                <div className="mx-[10%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center ji">
                    {data.editionWinnersLink.map((url, i) => (
                        <div
                            key={i}
                            className="border-2 border-kelloggs-red rounded-xl overflow-hidden aspect-video"
                        >
                            <VideoThumbnail
                                url={url}
                                onClick={setActiveVideo}
                                className="w-full h-full"
                                playIconSize="mid"
                            />
                        </div>
                    ))}
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
