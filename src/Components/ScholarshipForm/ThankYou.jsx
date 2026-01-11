import { useEffect, useState, useRef, useCallback } from 'react'; //  ADDED useRef
import "./ThankYou.css";
import SocialIcons from '../SocialIcons/SocialIcons';
import { useNavigate } from 'react-router-dom';

// images static
// import cocoMonkey from "/assetss/flying-monkey.png"
// import CocoPops from "/assets/CocoPops.png"
// import leftCocoPops from "/assets/CocoPops.png"
// import blurredCocoPops from "/assets/CocoPops-pack-blurred.png"

const ThankYou = ({ siteSettings }) => {
    // console.log(socialLinks)
    const img = {
        // cocoMonkey: "/assetss/flying-monkey.png",
        // CocoPops: "/assetss/CocoPops.png",
        leftCocoPops: "/assetss/CocoPops.png",
        // blurredCocoPops: "/assetss/CocoPops-pack-blurred.png"
    }

    //

    const [data, setData] = useState({
        cocoPopsImage:
        {
            url: ''
        },
        cocoPopBlur: {
            url: ''
        },
        title: '',
        description: '',
        leftKelloggImage: {
            url: ''
        },
        cocoMonkey: {
            url: ''
        },

    });
    const [loading, setLoading] = useState(true);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const navigate = useNavigate()
    const sample = {
        cocoPopsImage:
        {
            url: '/assetss/CocoPops.png'
        },
        cocoPopBlur: {
            url: '/assetss/CocoPops-pack-blurred.png'
        },
        title: 'Thank you for your participation',
        description: "We wish you a healthy family with nutritious and tasty Kellogg's cereals.",
        leftKelloggImage: {
            url: '/assetss/CocoPops.png'
        },
        cocoMonkey: {
            url: "/assetss/flying-monkey.png"
        },
    }

    //  ADDED: refs for section & blurred image
    const sectionRef = useRef(null);
    const blurredRef = useRef(null);

    //  ADDED: state to control animation
    const [isInView, setIsInView] = useState(false);
    //  UPDATED: start image already shifted (so movement visible)
    const [offsetY, setOffsetY] = useState(-40);

    //  ADDED: small CocoPops animation state (ONLY UP movement)
    const [smallCocoOffsetY, setSmallCocoOffsetY] = useState(0);

    //  Small coco base position (FIXED start position)
    const COCO_BASE_Y = 0;

    //  ADDED: to detect scroll direction
    const lastScrollY = useRef(window.scrollY || 0);


    // Responsive width tracking
    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchParticipation = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/thank-you-page?populate=*`);
            const resData = await res.json();
            setData(resData.data ? resData.data : null);

        } catch (error) {
            setData(sample)
            console.error('Error  fetching Participation:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchParticipation();
    }, []);

    //  ADDED: IntersectionObserver (Option 4 core logic)
    useEffect(() => {

        if (loading) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting); // section visible ah irukka nu check
            },
            { threshold: 0.3 } //  30% section visible aana trigger
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [loading]);

    // Force isInView = true after data load
    useEffect(() => {
        if (!loading && data && sectionRef.current) {
            setIsInView(true);
        }
    }, [loading, data]);


    useEffect(() => {
        const ticking = { current: false };

        const handleScroll = () => {
            if (!isInView || !sectionRef.current || ticking.current) return;

            ticking.current = true;

            requestAnimationFrame(() => {
                //  scroll direction (ONLY for blurred image)
                const currentScrollY = window.scrollY;
                const isScrollingUp = currentScrollY < lastScrollY.current;
                lastScrollY.current = currentScrollY;

                const rect = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const sectionHeight = rect.height;

                if (rect.bottom <= 0 || rect.top >= windowHeight) {
                    ticking.current = false;
                    return;
                }

                //  stable progress (0 → 1)
                const progress = Math.min(
                    Math.max(
                        (windowHeight - rect.top) / (windowHeight + sectionHeight),
                        0
                    ),
                    1
                );


                //   BLURRED IMAGE (direction based)


                const BLUR_BASE = -40;
                const BLUR_SPEED = 55;
                const BLUR_MAX_UP = -140;
                const BLUR_MAX_DOWN = 70;

                let blurTarget = isScrollingUp
                    ? BLUR_BASE + progress * BLUR_SPEED
                    : BLUR_BASE - progress * BLUR_SPEED;

                blurTarget = Math.max(
                    BLUR_MAX_UP,
                    Math.min(blurTarget, BLUR_MAX_DOWN)
                );

                setOffsetY(prev => prev + (blurTarget - prev) * 0.18);


                // SMALL COCO ( WORKING LOGIC)


                const COCO_RANGE = 160; // mela evlo poganum (increase panna mela pogum)
                const COCO_LERP = 0.08;    //  speed control (SMALL = SLOW)

                if (isScrollingUp) {
                    // 🔼 Scroll UP → mela move
                    setSmallCocoOffsetY(prev =>
                        prev + ((-progress * COCO_RANGE) - prev) * COCO_LERP
                    );
                } else {
                    // 🔽 Scroll DOWN → fixed base position
                    setSmallCocoOffsetY(prev =>
                        prev + (COCO_BASE_Y - prev) * 0.15
                    );
                }


                ticking.current = false;
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isInView]);

    const title = data.title;
    const description = data.description;
    const cocoMonkey = data.cocoMonkey?.url ?? null;
    const CocoPops = data.cocoPopsImage?.url ?? null;
    const blurredCocoPops = data.cocoPopBlur?.url ?? null;
    const leftCocoPops = data.leftKelloggImage?.url ?? img.leftCocoPops;
    // const socialIcons = data?.socialIcons;

    //  ADDED: dynamic positions based on screen width (CocoBanner pattern)
    const getPositions = () => {

        if (screenWidth >= 1920) {
            return {
                // textAlign: "center", // for text content alignment.
                // textContentMarginLeft: "-100px",

                titleFontSize: "45px", titleMarginTop: "55px", titleLineHeight: "45px",
                titleHeight: "90px", titleWidth: "576px", // title h1
                paraFontSize: "20px", paraMarginTop: "20px", paraMarginBottom: "40px", paraLineHeight: "30px", // paragraph : description
                paraHeight: "66px", paraWidth: "576px",
                iconsSize: "30px",
                winnerBtnWidth: "300px", winnerBtnHeight: "55px",  // past winners btn 
                winnerBtnPadding: "15px 22px", winnerBtnmarginTop: "10px",
                shareHeight: "29px", shareGap: "2px", shareWidth: "576px",// share para content  and icons gap, height
                monkeyTop: "5%", monkeyRight: "-40%", monkeyWidth: "750px", monkeyHeight: "710px",
                blurTop: "6%", blurRight: "-35%", blurWidth: "470px", blurHeight: "505px",// blurred image
                cocoBottom: "-27%", cocoRight: "-32%", cocoWidth: "320px", cocoHeight: "320px",// bottom cocoimg of monkey
                leftCocoWidth: "430px",
                leftCocoRotate: "40deg",
                socialIconsGap: '12px'

            };
        }

        // newly added
        if (screenWidth >= 1600) {
            return {
                // textAlign: "center",// for text content alignment.
                // textContentMarginLeft: "80px",

                titleFontSize: "38px", titleWidth: "360px", titleMarginTop: "55px", titleLineHeight: "45px", titleHeight: "90px", // title h1
                paraFontSize: "17px", paraMarginTop: "15px", paraMarginBottom: "20px", paraLineHeight: "22px", // paragraph : description
                paraHeight: "66px", paraWidth: "360px",
                iconsSize: "28px", // share icons
                winnerBtnWidth: "300px", winnerBtnHeight: "55px",  // past winners btn 
                winnerBtnPadding: "15px 22px", winnerBtnmarginTop: "10px",
                shareHeight: "29px", shareGap: "16px", shareWidth: "360px",// share para content  and icons gap, height
                monkeyTop: "5%", monkeyRight: "-20%", monkeyWidth: "640px", monkeyHeight: "660px",
                blurTop: "14%", blurRight: "-16%", blurWidth: "425px", blurHeight: "400px",// blurred image
                cocoBottom: "-21%", cocoRight: "-14%", cocoWidth: "300px", cocoHeight: "300px",// bottom cocoimg of monkey
                leftCocoWidth: "420px",
                leftCocoRotate: "40deg",
                socialIconsGap: '12px'

            };
        }


        if (screenWidth >= 1420) {
            return {

                // textAlign: "center",// for text content alignment.
                // textContentMarginLeft: "140px",

                titleFontSize: "38px", titleWidth: "360px", titleMarginTop: "55px", titleLineHeight: "45px", titleHeight: "90px", // title h1
                paraFontSize: "17px", paraMarginTop: "15px", paraMarginBottom: "20px", paraLineHeight: "22px", // paragraph : description
                paraHeight: "66px", paraWidth: "360px",
                iconsSize: "28px", // share icons
                winnerBtnWidth: "300px", winnerBtnHeight: "55px",  // past winners btn 
                winnerBtnPadding: "15px 22px", winnerBtnmarginTop: "10px",
                shareHeight: "29px", shareGap: "16px", shareWidth: "360px",// share para content  and icons gap, height
                monkeyTop: "5%", monkeyRight: "-17%", monkeyWidth: "600px", monkeyHeight: "620px",
                blurTop: "12%", blurRight: "-12%", blurWidth: "365px", blurHeight: "380px",// blurred image
                cocoBottom: "-9%", cocoRight: "-13%", cocoWidth: "280px", cocoHeight: "280px",// bottom cocoimg of monkey
                leftCocoWidth: "400px",
                leftCocoRotate: "40deg",
                socialIconsGap: '12px'

            };
        }

        if (screenWidth >= 1200) {
            return {

                // textAlign: "flex-end", // for text content alignment.
                // textContentMarginLeft: "155px",

                titleFontSize: "36px", titleWidth: "305px", titleMarginTop: "65px", titleLineHeight: "45px", titleHeight: "90px", // title h1
                paraFontSize: "16px", paraMarginTop: "15px", paraMarginBottom: "20px", paraLineHeight: "22px", // paragraph : description
                paraHeight: "66px", paraWidth: "360px",
                iconsSize: "26px", // icons size 
                winnerBtnWidth: "300px", winnerBtnHeight: "55px",  // past winners btn 
                winnerBtnPadding: "15px 22px", winnerBtnmarginTop: "10px",
                shareHeight: "29px", shareGap: "16px", shareWidth: "360px",// share para content  and icons gap, height
                monkeyTop: "7%", monkeyRight: "0%", monkeyWidth: "550px", monkeyHeight: "620px", // hanging monkey
                blurTop: "19%", blurRight: "3%", blurWidth: "343px", blurHeight: "360px",// blurred image
                cocoBottom: "-10%", cocoRight: "5%", cocoWidth: "250px", cocoHeight: "200px",// bottom cocoimg of monkey
                leftCocoWidth: "300px", // left cocoimg
                leftCocoRotate: "40deg",
                socialIconsGap: '12px'

            };
        }

        // working on : 
        if (screenWidth >= 992) {
            return {
                // textAlign: "right",
                // textContentMarginLeft: "140px",

                titleFontSize: "36px", titleWidth: "305px", titleMarginTop: "70px", titleLineHeight: "45px", titleHeight: "90px",  // font sizes , mt, lh , h
                paraFontSize: "16px", paraLineHeight: "22px", paraHeight: "66px", paraWidth: "325px",
                paraMarginTop: "15px", paraMarginBottom: "20px", // paragraph:description
                winnerBtnWidth: "296px", winnerBtnHeight: "54px",  // past winners btn 
                winnerBtnPadding: "15px 22px", winnerBtnmarginTop: "10px",
                shareHeight: "29px", shareGap: "14px", shareWidth: "360px",// share para content  and icons gap, height
                iconsSize: "20px", // icons size 
                monkeyTop: "10%", monkeyRight: "-3%", monkeyWidth: "450px", monkeyHeight: "500px", // hanging monkey
                blurTop: "22%", blurRight: "-1%", blurWidth: "310px", blurHeight: "310px",// blurred image 
                cocoBottom: "6%", cocoRight: "0%", cocoWidth: "210px", cocoHeight: "210px", // bottom near monkey image
                leftCocoWidth: "250px", // left angle image
                leftCocoRotate: "45deg",
                socialIconsGap: '12px'

            }

        };

        if (screenWidth < 992) {
            return {
                // textAlign: "flex-end",
                // textContentMarginLeft: "120px",

                titleFontSize: "28px", titleWidth: "280px", titleMarginTop: "82px", titleLineHeight: "30px", titleHeight: "60px", // title h1
                paraFontSize: "16px", paraMarginTop: "15px", paraMarginBottom: "20px", paraLineHeight: "22px",  // paragraph:description
                paraHeight: "66px", paraWidth: "280px",
                iconsSize: "20px", // icons size
                winnerBtnWidth: "300px", winnerBtnHeight: "55px",  // past winners btn 
                winnerBtnPadding: "15px 22px", winnerBtnmarginTop: "10px",
                shareHeight: "29px", shareGap: "16px", shareWidth: "280px",// share para content  and icons gap, height
                monkeyTop: "10%", monkeyRight: "-3%", monkeyWidth: "380px", monkeyHeight: "450px",  // hanging monkey
                blurTop: "18%", blurRight: "-4%", blurWidth: "280px", blurHeight: "280px",// blurred image
                cocoBottom: "15%", cocoRight: "-1%", cocoWidth: "180px", cocoHeight: "180px",// bottom cocoimg of monkey
                leftCocoWidth: "200px",
                leftCocoRotate: "45deg",
                socialIconsGap: '0px'
            }

        };
        if (screenWidth < 925) {
            return {
                socialIconsDisplay: 'column',
                socialIconsGap: '0px'
            }

        };

    };

    const positions = getPositions(); // called

    return (
        <section
            ref={sectionRef}
            className='thank-you'
            style={{
                position: "relative",
                width: "100%",
                padding: "40px 0px", overflow: "hidden",
                // height: "auto", 
                minHeight: "800px",
                margin: "0px",
            }}
        >

            {/* Loading state */}
            {loading && (
                <div style={{ textAlign: "center", padding: "40px" }}>
                    Loading...
                </div>
            )}

            {/*  No data state */}
            {!loading && !data && (
                <div style={{ textAlign: "center", padding: "40px" }}>
                    No data available
                </div>
            )}

            {!loading && data && (

                <>
                    {/* LEFT COCO — SECTION LEVEL */}
                    {img.leftCocoPops && (
                        //  left: 0 ==> ALWAYS 0
                        <div style={{
                            position: "absolute",
                            top: "35%", // top:"50%" : chatgpt
                            left: 0,
                            transform: "translateY(-50%)",

                        }}>
                            <div style={{

                                // transform: `translateX(${positions.leftCocoTranslate}) rotate(${positions.leftCocoRotate})`,
                                transform: `translateX(clamp(-45%, -28vw, -20%)) rotate(${positions.leftCocoRotate})`,
                                transformOrigin: "center", zIndex: 3
                            }}>
                                <img width={positions.leftCocoWidth} src={leftCocoPops} alt="left coco pops" />
                            </div>
                        </div>
                    )}


                    {/* container : width for two parent */}
                    <div className='container '
                        style={{
                            width: "100%",
                            maxWidth: "1200px",   //  controls total content width
                            margin: "0px auto",
                            padding: "0 20px",    //   space
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // flexWrap: "nowrap",// for small device need only horizontally.
                            position: "relative"   //  MUST

                        }}>



                        {/* first parent div */}
                        <div style={{
                            width: "100%", maxWidth: "546px", height: "620px", position: "relative",
                            display: "flex",
                        }}>

                            {/* Text content wrapper */}
                            <div style={{
                                // display: "flex",
                                width: "100%",
                                // justifyContent: positions.textAlign,   //  NEW
                                padding: "90px 0 0 0", // for text content to occur down
                                //  marginLeft: positions.textContentMarginLeft,
                                // marginLeft: screenWidth < 1900 ? "clamp(130px, 12vw, 155px)" : "clamp(-100px, -12vw, 155px)",
                                marginLeft:
                                    screenWidth > 2200 ? "clamp(-200px, -18vw, -120px)"
                                        : screenWidth >= 1900 ? "clamp(-100px, -12vw, 155px)"
                                            : "clamp(130px, 12vw, 155px)",
                                //    marginLeft: "clamp(140px, 12vw, 350px)"

                            }}>
                                {/* text-contents */}
                                <div style={{
                                    // display: "flex", flexDirection: "column",
                                    // justifyContent: "flex-start",

                                    // paddingLeft: screenWidth >= 970 && screenWidth < 1240 ? "20px" : "0px"
                                }}>

                                    <h1 style={{
                                        height: positions.titleHeight, width: positions.titleWidth, color: "#E41F35",
                                        lineHeight: positions.titleLineHeight, textAlign: "left", fontWeight: 600,
                                        fontSize: positions.titleFontSize,
                                        margin: 0, marginTop: positions.titleMarginTop
                                    }}>
                                        {title}
                                        {/* Thank you for your participation */}
                                    </h1>

                                    <p style={{
                                        width: positions.paraWidth, height: positions.paraHeight,
                                        lineHeight: positions.paraLineHeight, textAlign: "left",
                                        fontSize: positions.paraFontSize,
                                        margin: 0, marginTop: positions.paraMarginTop,
                                        marginBottom: positions.paraMarginBottom
                                    }}>
                                        {description}
                                        {/* We wish you a healthy family with nutritious and tasty Kellogg's cereals. */}


                                    </p>


                                    <div style={{
                                        display: "flex",
                                        gap: positions.socialIconsGap,
                                        flexDirection: positions.socialIconsDisplay
                                    }}>

                                        <p style={{
                                            fontWeight: 600, fontSize: positions.paraFontSize,
                                            margin: 0,
                                        }}>
                                            Share it to the world!
                                        </p>

                                        {/* Socialicons and link from props */}
                                            <SocialIcons siteSettings={siteSettings} />

                                    </div>

                                    <button className='btn'
                                        onClick={() => navigate('/past-winners')}
                                        style={{
                                            display: "block", width: positions.winnerBtnWidth, height: positions.winnerBtnHeight,
                                            borderRadius: "12px",
                                            fontWeight: 600,
                                            padding: positions.winnerBtnPadding, cursor: "pointer",
                                            marginTop: positions.winnerBtnmarginTop,
                                        }}>
                                        Click here to view the past winners
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* second parent div */}
                        <div className='monkey-parent' style={{ width: "100%", maxWidth: "695px", height: "620px", position: "relative" }}>
                            {cocoMonkey && (
                                <div style={{ position: "absolute", top: positions.monkeyTop, right: positions.monkeyRight, zIndex: 2 }}>
                                    <img width={positions.monkeyWidth} src={cocoMonkey} height={positions.monkeyHeight} alt="cocoMonkey" />
                                </div>
                            )}

                            {blurredCocoPops && (
                                <div
                                    ref={blurredRef} //  ADDED
                                    style={{
                                        position: "absolute",
                                        top: positions.blurTop,
                                        right: positions.blurRight,
                                        zIndex: 1,
                                        transform: `translateY(${offsetY}px)`, // UPDATED: section-based parallax
                                        transition: "transform 0.25s ease-out", //  fast & smooth
                                        filter: 'blur(3px)',
                                        scale:1.4
                                    }}
                                >
                                    <img width={positions.blurWidth} height={positions.blurHeight} src={blurredCocoPops} alt="blurredCocoPops" />
                                </div>
                            )}

                            {CocoPops && (
                                <div style={{
                                    position: "absolute", bottom: positions.cocoBottom, right: positions.cocoRight, zIndex: 6,
                                    transform: `translateY(${smallCocoOffsetY}px)`, willChange: "transform",scale:1.2
                                }}>
                                    <img width={positions.cocoWidth} src={CocoPops} alt="CocoPops" />
                                </div>
                            )}
                        </div>
                    </div>
                </>

            )}

        </section>
    )
}

export default ThankYou;
