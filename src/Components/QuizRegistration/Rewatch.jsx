import { useState } from "react";
import { COLORS, FONTS } from '../../common/config';
import VideoPopup from "../ScholarshipForm/YoutubeVideo/VideoPopup"
import VideoThumbnail from "../ScholarshipForm/YoutubeVideo/VideoThumbnail"

const Rewatch = ({ data }) => {
    const [activeVideo, setActiveVideo] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    return (
        <section className="mt-16 md:mt-[120px] text-center">
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#333] mb-6 md:mb-8">Missed an episode or two? Catch up with the Superstars</h2>
            <p className="text-sm sm:text-base md:text-lg text-[#555] max-w-full md:max-w-[700px] mx-auto mb-8 md:mb-10">
                {data.third_component.image_section.description}
            </p>

            {/* Media Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
                {data.third_component?.images?.map((image, index) =>
                    <div
                        className="gallery-image w-full h-[200px] md:h-[220px] bg-gray-300 rounded-2xl overflow-hidden"
                        key={index}
                        onClick={() => setActiveImage(image)}
                    >
                        <img
                            src={image}
                            alt={`Gallery moment ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Image Lightbox */}
            {activeImage && (
                <div className="image-lightbox" onClick={() => setActiveImage(null)}>
                    <div className="lightbox-close" onClick={() => setActiveImage(null)}>
                        ✕
                    </div>
                    <img src={activeImage} alt="Full view" onClick={(e) => e.stopPropagation()} />
                </div>
            )}

            {/* Video Grid - Responsive */}
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-8 md:mb-10">
                    {data.third_component.videos.map((video, i) => (
                        <VideoThumbnail
                            customThumbnail={video.thumbnail}
                            key={i}
                            url={video.url}
                            onClick={setActiveVideo}
                            className="h-[200px] md:h-[250px]"
                            playIconSize='large'
                        />
                    ))}
                </div>

                <VideoPopup
                    url={activeVideo}
                    onClose={() => setActiveVideo(null)}
                />
            </div>

            <a
                href={data.third_component.image_section.youtube_url}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-auto px-8 md:px-10 py-3 md:py-4 no-underline text-sm md:text-base"
                style={redBtn}
            >
                {data.third_component.image_section.button_text}
            </a>
        </section>
    )
}
export default Rewatch

const redBtn = {
    backgroundColor: COLORS.red,
    color: '#fff',
    border: 'none',
    padding: '14px',
    borderRadius: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: FONTS.primary
};
