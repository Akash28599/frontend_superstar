import HomeBanner from "../Components/HomeBanner/HomeBanner"
import TrendingStories from "../Components/TrendingStories"
import CocoHeads from "../Components/cocohead"
import PrintableGames from "../Components/games"
import OurProducts from "../Components/zigzag"
import CocoBanner from "../Components/cocobanner"

export default function HomePage() {
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
                <CocoHeads />
                 <CocoBanner/>
                <OurProducts />
                {/* <TrendingStories/> */}
                <PrintableGames />
               
            </div>
        </>
    );
}
