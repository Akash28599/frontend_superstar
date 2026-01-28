import { useEffect, useState } from 'react'
import ScholarshipForm from '../Components/ScholarshipForm/ScholarshipForm'
import AboutCompetition from '../Components/ScholarshipForm/AboutCompetition';
import YoutubeGallery from '../Components/ScholarshipForm/YoutubeVideo/YoutubeGallery';
import ThankYou from '../Components/ScholarshipForm/ThankYou';
import ScholarshipWaitlist from '../Components/ScholarshipForm/ScholarshipWaitlist';

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
            {!data.shouldShowForm && <ScholarshipWaitlist data={data} />}
        </>
    )
}

export default ScholarshipPage