import HomeBanner from "../Components/HomeBanner/HomeBanner"
import PrintableGames from "../Components/Games"
import OurProducts from "../Components/OurProducts"
import CocoBanner from "../Components/Cocobanner"
import CocoHead from "../Components/Cocohead/Cocohead";
import { useHomeStore } from "../store/homeStore";
import { useEffect } from "react";

export default function HomePage({ dpr }) {
    const { loading, error, fetchHomePage } = useHomeStore();

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchHomePage();
            } catch (e) {
                console.error("Failed to fetch home page:", e);
            }
        }
        fetchData();
    }, [fetchHomePage]);

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ width: "100%" }}>
            {/* Red background ONLY for HomeBanner */}
            <div className="relative bg-kelloggs-red">
                <HomeBanner />
            </div>

            {/* Other components */}
            <CocoHead dpr={dpr} />
            <CocoBanner dpr={dpr} />
            <OurProducts />
            <PrintableGames />
        </div>
    );
}
