import HomeBanner from "../Components/HomeBanner/HomeBanner"
// import TrendingStories from "../Components/TrendingStories"

import PrintableGames from "../Components/Games"
import OurProducts from "../Components/OurProducts"
import CocoBanner from "../Components/Cocobanner"
import { CocoHead } from "../Components/Cocohead/Cocohead"
import { constants } from "../Utils/constants"

export default function HomePage({dpr}) {
    return (
        <>
            <div style={{  width: "100%" }}>
                
                {/* Red background ONLY for HomeBanner */}
                <div
                    style={{
                        backgroundColor: constants.red,
                        position: "relative",
                    }}
                >
                    <HomeBanner />
                </div>

                {/* Other components with proper spacing */}
                <div style={{ paddingTop: '80px' }}>
                    <CocoHead dpr={dpr}/>
                </div>
                <div style={{ paddingTop: '60px' }}>
                    <CocoBanner dpr={dpr}/>
                </div>
                {/* White separator for visual gap */}
                <div style={{ height: '80px', backgroundColor: 'white' }}></div>
                
                <div style={{ paddingTop: '60px' }}>
                    <OurProducts />
                </div>
                {/* <TrendingStories/> */}
                <div style={{ paddingTop: '80px', paddingBottom: '60px' }}>
                    <PrintableGames />
                </div>
               
            </div>
        </>
    );
}
