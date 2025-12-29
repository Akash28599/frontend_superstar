import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import ScholarshipForm from '../Components/ScholarshipForm/ScholarshipForm'
import AboutCompetition from '../Components/AboutCompetition/AboutCompetition';
import YoutubeGallery from '../Components/YoutubeVideo/YoutubeGallery';
import SubmissionForm from '../Components/SubmissionForm/SubmissionForm';
import ThankYou from '../Components/ScholarshipForm/ThankYou';


const ScholarshipPage = () => {
    const [data, setData] = useState({
        IconImage: "",
        groupKellogs: { url: "" },
        bg: "",
        groupKellogs2: { url: "" },
        hangingMonkey: { url: "" },
        competitionTitle: "",
        competitionDescription: [],
        CompetitionSteps: [],
        shouldShowForm: true,
        criteria: [],
        socialLinkText: "",
        scholarshipSocialLinks: {
            youtube: "",
            instagram: "",
            facebook: "",
            twitter: "",
            tiktok:""
        }
    });

    const fetchURLs = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/scholarship-page?populate=*`)

            const json = await res.json()

            setData(json.data)
        } catch (err) {
            console.error("Fetch error:", err)
        }
    }

    useEffect(() => {
        fetchURLs()
    }, []);


    return (
        <>
            <Navbar />
            {data.shouldShowForm && <ScholarshipForm data={data} />}
            <AboutCompetition data={data} />
            <YoutubeGallery/>
            <ThankYou/>
            {!data.shouldShowForm &&<SubmissionForm groupKellogs={data.groupKellogs}/>}
        </>
    )
}

export default ScholarshipPage