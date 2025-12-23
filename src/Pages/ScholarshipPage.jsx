import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import ScholarshipForm from '../Components/ScholarshipForm/ScholarshipForm'
import AboutCompetition from '../Components/AboutCompetition/AboutCompetition';

const ScholarshipPage = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(
            "https://correct-prize-f0a5924469.strapiapp.com/api/scholarship-page?populate=*"
        )
            .then(res => res.json())
            .then(json => setData(json.data || {}));
    }, []);
    return (
        <>
            <Navbar />
            {data.shouldShowForm&&<ScholarshipForm data={data} />}
            <AboutCompetition data={data}/>
        </>
    )
}

export default ScholarshipPage