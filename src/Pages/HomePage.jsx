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

                {/* Other components */}
                <CocoHead dpr={dpr}/>
                 <CocoBanner dpr={dpr}/>
                <OurProducts />
                {/* <TrendingStories/> */}
                <PrintableGames />
               
            </div>
        </>
    );
}
