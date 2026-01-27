import {FaRegCalendar} from "react-icons/fa6";
import {MdTipsAndUpdates} from "react-icons/md";
import {MdOutlineStarPurple500} from "react-icons/md";
import {FaTrophy} from "react-icons/fa";

const ExperienceSection = ({ data }) => {
    if (!data) return null;
    const { title, description, card_details } = data;

    return (
        <section className="py-10 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-yellow-50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-3 xxs:px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col">

                <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-full sm:max-w-4xl mx-auto">
                    <h2 className="font-bold font-kelloggs text-xl xxs:text-2xl sm:text-3xl lg:text-4xl text-kelloggs-red mb-4 sm:mb-6 leading-none">
                        {title.toUpperCase()}
                    </h2>
                    <div className="w-12 sm:w-16 lg:w-20 h-1.5 sm:h-2 bg-kelloggs-gold mx-auto mb-4 sm:mb-6 lg:mb-8 rounded-full"></div>
                    <p className="text-base sm:text-lg lg:text-2xl text-gray-500 font-light font-sans tracking-wide">
                        {description}
                    </p>
                </div>

                {/* 2x2 Grid */}
                <div className="max-w-full sm:max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        {card_details?.map((card, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[0_4px_20px_-5px_rgba(246,9,69,0.2)] hover:shadow-[0_10px_30px_-10px_rgba(246,9,69,0.25)] transition-all duration-300 border border-gray-100 flex flex-row items-start gap-3 sm:gap-4 lg:gap-5 group"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-red-50 flex items-center justify-center text-kelloggs-red transition-colors duration-300">
                                        {getIcon(card.icon)}
                                    </div>
                                </div>

                                <div className="flex flex-col text-left min-w-0">
                                    <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-1 sm:mb-2 text-kelloggs-red transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

const getIcon = (iconName) => {
    switch (iconName) {
        case 'TipsAndUpdatesIcon': return <MdTipsAndUpdates fontSize="large" />;
        case 'StarIcon': return <MdOutlineStarPurple500 fontSize="large" />;
        case 'CalendarTodayIcon': return <FaRegCalendar fontSize="large" />;
        case 'EmojiEventsIcon': return <FaTrophy fontSize="large" />;
        default: return <MdOutlineStarPurple500 fontSize="large" />;
    }
}

export default ExperienceSection;
