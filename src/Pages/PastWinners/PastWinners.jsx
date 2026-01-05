import { useNavigate } from 'react-router-dom'
import './PastWinners.css'
import { FaArrowCircleLeft } from "react-icons/fa";
import { useEffect, useState } from 'react';

export const PastWinners = () => {
    const navigate = useNavigate()
    const [pwData, setPwData] = useState(null)

    const getData = async () => {
        const res = await fetch(
            `${process.env.REACT_APP_STRAPI_URL}/api/past-winner?populate=*`
        )
        const json = await res.json()
        setPwData(json.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const bgUrl =
        pwData?.bg?.url
    const cocoMonkeyUrl =
        pwData?.cocoMonkey?.url
    const milkDecorUrl =
        pwData?.milkDecor?.url
    console.log("sam", pwData)

    return (
        <div className='pw-container'>


            {bgUrl && (
                <div
                    className='pw-banner'
                    style={{
                        backgroundImage: `url(${bgUrl})`
                    }}
                >
                    <div className='pw-btn'>
                        <button onClick={() => navigate('/scholarship')}>
                            <FaArrowCircleLeft />
                            back
                        </button>
                    </div>
                    <div
                        className='pw-monkey'
                        style={{
                            backgroundImage: `url(${cocoMonkeyUrl})`
                        }}
                    />
                    <h1>Winners</h1>
                    <div
                        className='pw-milkDecor'
                        style={{
                            backgroundImage: `url(${milkDecorUrl})`
                        }}
                    />
                </div>
            )}
            <div className='pw-grid'>
                {pwData?.winnersList?.map((item) => (
                    <div key={item.id} className='pw-box'>
                        <h1 style={{color:'grey'}}>{item.id}</h1>
                        <h1>{item.name}</h1>
                        <h5>{item.schoolName}</h5>
                    </div>
                ))}
            </div>
        </div>
    )
}
