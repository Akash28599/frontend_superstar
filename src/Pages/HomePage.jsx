import HomeBanner from "../Components/HomeBanner/HomeBanner"
// import TrendingStories from "../Components/TrendingStories"
// import CocoHeads from "../Components/CocoheadOld"
import PrintableGames from "../Components/Games"
import OurProducts from "../Components/OurProducts"
import CocoBanner from "../Components/Cocobanner"
import { CocoHead } from "../Components/Cocohead/Cocohead"

export default function HomePage({dpr}) {
    return (
        <>
            <div style={{ overflowX: "hidden", width: "100%" }}>
                
                {/* Red background ONLY for HomeBanner */}
                <div
                    style={{
                        backgroundColor: "#dd2120",
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
