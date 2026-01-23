import { Calendar, Lightbulb, Star, Trophy } from 'lucide-react';

const ExperienceSection = ({ data }) => {
  if (!data) return null;
  const { title, description, card_details } = data;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col">
        
        <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="font-bold font-kelloggs text-3xl sm:text-4xl text-kelloggs-red mb-6 leading-none">
                {title.toUpperCase()}
            </h2>
            <div className="w-20 h-2 bg-kelloggs-gold mx-auto mb-8 rounded-full"></div>
            <p className="text-2xl text-gray-500 font-light font-sans tracking-wide">
                {description}
            </p>
        </div>

        {/* 2x2 Grid */}
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {card_details?.map((card, index) => (
                    <div 
                    key={index} 
                    className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-5px_rgba(246,9,69,0.2)] hover:shadow-[0_10px_30px_-10px_rgba(246,9,69,0.25)] transition-all duration-300 border border-gray-100 flex flex-row items-start gap-5 group"
                    >
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-red-50 flex items-center justify-center text-kelloggs-red transition-colors duration-300">
                            {getIcon(card.icon)}
                        </div>
                    </div>
                    
                    <div className="flex flex-col text-left">
                        <h3 className="font-bold text-xl mb-2 text-kelloggs-red transition-colors">
                            {card.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
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
        case 'TipsAndUpdatesIcon': return <Lightbulb fontSize="large" />;
        case 'StarIcon': return <Star fontSize="large" />;
        case 'CalendarTodayIcon': return <Calendar fontSize="large" />;
        case 'EmojiEventsIcon': return <Trophy fontSize="large" />;
        default: return <Star fontSize="large" />;
    }
}

export default ExperienceSection;
