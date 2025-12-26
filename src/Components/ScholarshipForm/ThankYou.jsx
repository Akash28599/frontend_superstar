import React, { useEffect, useState, useRef } from 'react'; // 🔥 ADDED useRef

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FiFacebook } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";

// images static
// import cocoMonkey from "/assetss/flying-monkey.png"
// import CocoPops from "/assets/CocoPops.png"
// import leftCocoPops from "/assets/CocoPops.png"
// import blurredCocoPops from "/assets/CocoPops-pack-blurred.png"

const ThankYou = () => {
    const img = {
        cocoMonkey: "/assetss/flying-monkey.png",
        CocoPops: "/assetss/CocoPops.png",
        leftCocoPops: "/assetss/CocoPops.png",
        blurredCocoPops: "/assetss/CocoPops-pack-blurred.png"
    }

    //

    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // 🔥 ADDED: refs for section & blurred image
    const sectionRef = useRef(null);
    const blurredRef = useRef(null);

    // 🔥 ADDED: state to control animation
    const [isInView, setIsInView] = useState(false);
    // 🔥 UPDATED: start image already shifted (so movement visible)
    const [offsetY, setOffsetY] = useState(-40);

    // 🔥 ADDED: small CocoPops animation state (ONLY UP movement)
    const [smallCocoOffsetY, setSmallCocoOffsetY] = useState(0);

    // 🔥 ADDED: to detect scroll direction
    const lastScrollY = useRef(window.scrollY);


    // Responsive width tracking
    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // const fetchParticipation = async () => {
    //     try {
    //         const res = await fetch('https://correct-prize-f0a5924469.strapiapp.com/api/thank-you-page?populate=*');
    //         //api : correct-prize-f0a5924469.strapiapp.com/api/thank-you-page?populate=*
    //         const resData = await res.json();
    //         console.log(resData);
    //         setData(resData.data ? resData.data : null);

    //     } catch (error) {
    //         console.error('Error  fetching Participation:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchParticipation();
    // }, []);

    // 🔥 ADDED: IntersectionObserver (Option 4 core logic)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting); // section visible ah irukka nu check
            },
            { threshold: 0.4 } // 🔥 30% section visible aana trigger
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            if (!isInView || !sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // for small cocopops
            // 🔥 ADDED: detect scroll direction
            const currentScrollY = window.scrollY;
            const isScrollingUp = currentScrollY < lastScrollY.current;
            lastScrollY.current = currentScrollY;


            // 🔥 section enter progress (0 → 1)
            const progress =
                Math.min(
                    Math.max((windowHeight - rect.top) / windowHeight, 0),
                    1
                );

            // 🔥 STRONG & CLEAR movement (top + bottom)
            const movement = -40 + progress * 140;
            // -40  → start little UP
            // +140 → scroll pannumbodhu DOWN clear-ah pogum

            setOffsetY(movement);

            // 🔥 ADDED: small CocoPops ONLY scroll UP animation
            if (isScrollingUp) {
                // scroll UP → move UP only
                const upMovement = Math.min(progress * 12, 12); // adjust strength here
                setSmallCocoOffsetY(-upMovement); // negative = UP
            } else {
                // scroll DOWN → reset to base position
                setSmallCocoOffsetY(0);
            }

        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isInView]);


    // for icons 
    const getSocialIcon = (type) => {
        switch (type) {
            case "instagram":
                return <InstagramIcon />;

            case "twitter":
                return <TwitterIcon />;

            case "facebook":
                return <FacebookIcon />;

            default:
                return null; // unknown icon safe guard
        }
    };

    // if (loading) return <div>Loading...</div>;
    // if (!data) return <div>No data available</div>;

    // const title = data.title;
    // const description = data.description;
    // const cocoMonkey = data.cocoMonkey?.url ?? null;
    // const CocoPops = data.cocoPopsImage?.url ?? null;
    // const blurredCocoPops = data.cocoPopBlur?.url ?? null;
    // const socialIcons = data?.socialIcons;

    // 🔥 ADDED: dynamic positions based on screen width (CocoBanner pattern)
    const getPositions = () => {

        if (screenWidth >= 1920) {
            return {
                titleFontSize: "40px", paraFontSize: "18px",iconsSize:"30px",
                monkeyTop: "3%", monkeyRight: "0%", monkeyWidth: "600px",monkeyHeight:"600px",
                blurTop: "0%", blurRight: "6%", blurWidth: "390px",
                cocoBottom: "0%", cocoRight: "2%", cocoWidth: "360px",
                leftCocoTop: "10%", leftCocoLeft: "0%", leftCocoWidth: "320px",
                leftCocoRotate: "55deg",
            };
        }

        if (screenWidth >= 1440) {
            return {
                titleFontSize: "38px", paraFontSize: "17px",  iconsSize:"28px",
                monkeyTop: "3%", monkeyRight: "0%", monkeyWidth: "600px",monkeyHeight:"600px",
                blurTop: "0%", blurRight: "0%", blurWidth: "365px",
                cocoBottom: "0%", cocoRight: "2%", cocoWidth: "240px",
                leftCocoTop: "5%", leftCocoLeft: "-12%", leftCocoWidth: "400px",
                leftCocoRotate: "55deg",
            };
        }


        if (screenWidth >= 1200) {
            return {
                titleFontSize: "36px", paraFontSize: "16px", iconsSize:"26px",
                monkeyTop: "3%", monkeyRight: "0%", monkeyWidth: "550px",monkeyHeight:"600px",
                blurTop: "0%", blurRight: "0%", blurWidth: "345px",
                cocoBottom: "0%", cocoRight: "0%", cocoWidth: "220px",
                leftCocoTop: "10%", leftCocoLeft: "-8%", leftCocoWidth: "280px",
                leftCocoRotate: "53deg",

            };
        }

        //  fallback
        return {
            monkeyTop: "10%", monkeyRight: "25%", monkeyWidth: "300px",
            blurTop: "12%", blurRight: "-12%", blurWidth: "360px",
            cocoBottom: "-55%", cocoRight: "-56%", cocoWidth: "260px",
            leftCocoTop: "12%", leftCocoLeft: "0%", leftCocoWidth: "260px",
            leftCocoRotate: "45deg",
        };
    };

    const positions = getPositions(); // called


    return (
        <section
            ref={sectionRef} //  ADDED: section ref
            className='thank-you'
            style={{
                width: "100%",  // 🔥 IMPORTANT
                display: "flex", justifyContent: "center",gap:"200px", // // ✅ FIX
                padding: "20px 0px", height: "auto", overflow: "hidden", margin: "0px"
            }}
        >

            {/* container : width for two parent */}
            <div className='container '
                style={{
                    width: "100%",
                    maxWidth: "1200px",   // 🔥 controls total content width
                    margin:"0px auto",
                    padding: "0 24px",    // 🔥 breathing space
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>

                {/* first parent div */}
                <div style={{
                    width: "100%", maxWidth: "546px", height: "620px", position: "relative",
                    display: "flex",justifyContent: "flex-end",paddingTop: "90px", 
                }}>

                    {img.leftCocoPops && (
                        <div style={{ position: "absolute", top:positions.leftCocoTop, left: positions.leftCocoLeft }}>
                            <div style={{ transform: `translateX(-40%) rotate(${positions.leftCocoRotate})` }}>
                                <img width={positions.leftCocoWidth} src={img.leftCocoPops} alt="left coco pops" />
                            </div>
                        </div>
                    )}

                    {/* text-contents */}
                    <div style={{  display: "flex", flexDirection: "column" , justifyContent:"flex-start"}}>

                        <h1 style={{ height: "90px", width: "360px", color: "#dd2120", 
                             lineHeight: "45px",textAlign:"left", fontWeight: 600,
                              fontSize:positions.titleFontSize ,
                              margin: 0, marginTop:"55px"}}> 
                               {/* remove default margin */}
                            Thank you for your participation
                        </h1>

                        <p style={{ width: "360px", height: "66px",
                             lineHeight: "22px" ,textAlign:"left", 
                             fontSize:positions.paraFontSize ,
                             margin: 0, marginTop:"15px", marginBottom:"20px"}}>
                            We wish you a healthy family with nutritious and tasty Kellogg's cereals.
                        </p>

                        <div style={{ display: "flex", alignItems: "center", gap: "16px",
                               height: "29px" }}>

                            <p style={{ fontWeight: 600, fontSize:positions.iconsSize, 
                                margin:0,
                            }}>
                                Share it to the world!
                            </p>

                            <button
                                style={{ border: "none", background: "transparent", cursor: "pointer", 
                                    padding: 0, fontSize:positions.iconsSize }}
                                aria-label="twitter"
                            >
                                <FaTwitter />
                            </button>

                            <button
                                style={{ border: "none", background: "transparent", cursor: "pointer",
                                     padding: 0, fontSize:positions.iconsSize }}
                                aria-label="facebook"
                            >
                                <FiFacebook />
                            </button>
                        </div>

                        <button
                            style={{
                                width: "300px", height: "55px", borderRadius: "12px", background: "red", color: "white",
                                fontWeight: 600, border: "none", cursor: "pointer", marginTop: "10px",
                            }}>
                            Click here to view the past winners
                        </button>
                    </div>
                </div>

                {/* second parent div */}
                <div className='monkey-parent' style={{ width: "100%", maxWidth: "695px", height: "620px", position: "relative" }}>

                    {img.cocoMonkey && (
                        <div style={{ position: "absolute", top: positions.monkeyTop, right: positions.monkeyRight, zIndex: 2 }}>
                            <img width={positions.monkeyWidth} src={img.cocoMonkey} height={positions.monkeyHeight} alt="cocoMonkey" />
                        </div>
                    )}

                    {img.blurredCocoPops && (
                        <div
                            ref={blurredRef} //  ADDED
                            style={{
                                position: "absolute",
                                top: positions.blurTop,
                                right: positions.blurRight,
                                zIndex: 1,
                                transform: `translateY(${offsetY}px)`, // UPDATED: section-based parallax
                                transition: "transform 0.25s ease-out", //  fast & smooth
                            }}
                        >
                            <img width={positions.blurWidth} src={img.blurredCocoPops} alt="blurredCocoPops" />
                        </div>
                    )}

                    {img.CocoPops && (
                        <div style={{
                            position: "absolute", bottom: positions.cocoBottom, right: positions.cocoRight, zIndex: 3,
                            transform: `translateY(${smallCocoOffsetY}px)`, transition: "transform 0.45s ease-out",
                        }}>
                            <img width={positions.cocoWidth} src={img.CocoPops} alt="CocoPops" />
                        </div>
                    )}
                </div>

            </div>

        </section>
    )
}

export default ThankYou;
