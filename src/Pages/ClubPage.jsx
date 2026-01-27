import React, { useEffect, useState } from 'react';
import HeroSection from '../Components/ClubPage/HeroSection';
import ExperienceSection from '../Components/ClubPage/ExperienceSection';
import SummerCampSection from '../Components/ClubPage/SummerCampSection';
import PastMomentsSection from '../Components/ClubPage/PastMomentsSection';
import TestimonialsSection from '../Components/ClubPage/TestimonialsSection';
import WaitlistSection from '../Components/ClubPage/WaitlistSection';
import OpportunitiesSection from '../Components/ClubPage/OpportunitiesSection';
import { API_CONFIG } from '../common/config';

const ClubPage = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLUB_LANDING}`);
                if (res.ok) {
                    const json = await res.json();
                    setPageData(json.data);
                } else {
                    console.error("API failed");
                }
            } catch (error) {
                console.error("Error fetching Club Page data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-kelloggs-red font-kelloggs text-2xl">Loading...</div>;
    if (!pageData) return null;

    return (
        <div className="w-full overflow-x-hidden">
            <HeroSection data={pageData} />
            <ExperienceSection data={pageData.club_experience_section} />
            <SummerCampSection data={pageData.summer_camp_section} />
            <PastMomentsSection data={pageData.past_club_moments_section} />
            <TestimonialsSection data={pageData.testimonials_section} />
            <WaitlistSection data={pageData.waitlist_section} />
            <OpportunitiesSection data={pageData.opportunities_section} />
            {/* White space before footer */}
            <div className="h-16 bg-white"></div>
        </div>
    );
};

export default ClubPage;