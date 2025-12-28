import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import ScholarshipForm from '../Components/ScholarshipForm/ScholarshipForm'
import AboutCompetition from '../Components/AboutCompetition/AboutCompetition';
import YoutubeGallery from '../Components/YoutubeVideo/YoutubeGallery';
import SubmissionForm from '../Components/SubmissionForm/SubmissionForm';

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
    // const testData = {
    //     IconImage: "/assetss/icon.png",
    //     groupKellogs: {
    //         url: "/assetss/group.png"
    //     },
    //     bg: "/assetss/cloud.png",
    //     groupKellogs2: {
    //         url: "/assetss/group2.png"
    //     },
    //     hangingMonkey: {
    //         url: '/assetss/hangingMonkey.png'
    //     },
    //     competitionTitle: "About the Competition",
    //     competitionDescription: [
    //         {
    //             title: "Kellogg’s Super Stars",
    //             des: "is our dream for the future generation in Nigeria: a generation of well-nurtured, healthy children."
    //         },
    //         {
    //             title: "Kellogg’s Super Stars Scholarship",
    //             des: "Competition is an initiative to bring out the best expressions from our Super Stars and motivate them by sponsoring their school expenses worth N150,000. This year, we are launching the 6th edition of our competition. It’s a lot easier with a simple 2-step process."
    //         }
    //     ],
    //     CompetitionSteps: [
    //         "Share your Breakfast to Greatness story with us: How breakfast habits Lead to Greatness?",
    //         "Fill in the necessary details, Snap and upload 5 packs of your favorite Kellogg’s cereal."
    //     ],
    //     shouldShowForm: true,
    //     criteria: [
    //         'Creativity', 'Story-telling', 'Grammar', 'Vocabulary'
    //     ]
    // };

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_STRAPI_URL}/api/scholarship-page?populate=*`)
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error(`HTTP error! Status: ${res.status}`);
    //             }
    //             return res.json();
    //         })
    //         .then(json => setData(json.data || testData))
    //         .catch(err => {
    //             console.error("Fetch error:", err);
    //             console.log(testData.IconImage)
    //             setData(testData);
    //         });
    // }, []);


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
            <YoutubeGallery />

            {data.shouldShowForm && <SubmissionForm groupKellogs={data.groupKellogs} />}
            <br />
        </>
    )
}

export default ScholarshipPage