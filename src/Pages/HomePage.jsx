import HomeBanner from "../Components/HomeBanner/HomeBanner"
// import TrendingStories from "../Components/TrendingStories"
// import CocoHeads from "../Components/CocoheadOld"
import OurProducts from "../Components/OurProducts"
import PrintableGames from "../Components/PrintableGames";
import Cocohead from '../Components/Cocohead/Cocohead'
import CocoBanner from "../Components/CocoBanner/CocoBanner";
export default function HomePage({ dpr }) {
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
                <Cocohead dpr={dpr} />
                <CocoBanner dpr={dpr} />
                <OurProducts />
                {/* <TrendingStories/> */}
                <PrintableGames />

            </div>
        </>
    );
}
