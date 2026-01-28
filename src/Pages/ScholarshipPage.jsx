import { useEffect, useState } from 'react'
import ScholarshipForm from '../Components/ScholarshipForm/ScholarshipForm'
import AboutCompetition from '../Components/ScholarshipForm/AboutCompetition';
import YoutubeGallery from '../Components/ScholarshipForm/YoutubeVideo/YoutubeGallery';
import ThankYou from '../Components/ScholarshipForm/ThankYou';
import ScholarshipWishlist from '../Components/ScholarshipForm/ScholarshipWishlist';


const sample = {
    IconImage: { url: "/assetss/iconNoHeader.png" },
    groupKellogs: { url: "/assetss/group.png" },
    bg: { url: "/assetss/cloud.png" },
    groupKellogs2: { url: "/assetss/group2.png" },
    hangingMonkey: { url: "/assetss/hangingMonkey.png" },
    competitionTitle: "About the competition",
    competitionDescription: [
        {
            title: "Kellogg’s Super Stars",
            des: "is our dream for the future generation in Nigeria: a generation of well-nurtured, healthy children."
        },
        {
            title: "Kellogg’s Super Stars Scholarship",
            des: "Competition is an initiative to bring out the best expressions from our Super Stars and motivate them by sponsoring their school expenses worth N150,000.This year, we are launching the 6th edition of our competition. It’s a lot easier with a simple 2-step process."
        }

    ],
    competitionSteps: [
        "Share your Breakfast to Greatness story with us: How breakfast habits Lead to Greatness?",
        "Fill in the necessary details, Snap and upload 5 packs of your favorite Kellogg’s cereal."
    ],
    shouldShowForm: true,
    criteria: ["Creativity", "Story-telling",
        "Grammar",
        "Vocabulary"],
    socialLinkText: "Follow us on",
    siteSettings: {
    }
}

const ScholarshipPage = ({settingsData}) => {
    const [data, setData] = useState({
        IconImage: { url: "" },
        groupKellogs: { url: "" },
        bg: "",
        groupKellogs2: { url: "" },
        hangingMonkey: { url: "" },
        competitionTitle: "",
        competitionDescription: [],
        competitionSteps: [],
        shouldShowForm: true,
        criteria: [],
        socialLinkText: "",
        siteSettings: {
            instagramurl: "",
            facebookurl: "",
            twitterurl: "" ,
            tiktokurl:"",
            youtubeurl:""
        }
    });
    const [isLoading,setIsLoading]=useState(true);
   useEffect(() => {
    const fetchURLs = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/scholarship-page?populate=*`);
            const json = await res.json();
            setData({
                ...json.data,
                siteSettings: { ...settingsData }
            });
        } catch (err) {
            console.log("hello");
            setData(sample);
            console.error("Fetch error:", err);
        }
        finally{
            setIsLoading(false)
        }
    };

    fetchURLs();
}, [settingsData]); 

if(isLoading)return(<div>Loading...</div>)

    return (
        <>
            {data.shouldShowForm && <ScholarshipForm data={data} siteSettings={settingsData} />}
            <AboutCompetition data={data} siteSettings={settingsData}/>
            <YoutubeGallery />
            <ThankYou siteSettings={data.siteSettings} />
            {!data.shouldShowForm && <ScholarshipWishlist groupKellogs={data.groupKellogs} />}
        </>
    )
}

export default ScholarshipPage