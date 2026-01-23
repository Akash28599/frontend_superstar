import { create } from "zustand";
import {
    fetchCocoBannerAPI,
    fetchCocoHeadAPI,
    fetchHomeBannerAPI,
    fetchPrintableGamesAPI,
    fetchOurProductsAPI,
} from "../api/apiList";

export const useHomeStore = create((set, get) => ({
    loading: false,
    error: null,

    homeBanner: null,
    cocoHead: null,
    cocoBanner: null,
    ourProducts: null,
    printableGames: null,

    homeBannerLoading: false,
    cocoHeadLoading: false,
    cocoBannerLoading: false,
    ourProductsLoading: false,
    printableGamesLoading: false,

    homeBannerError: null,
    cocoHeadError: null,
    cocoBannerError: null,
    ourProductsError: null,
    printableGamesError: null,

    fetchHomeBanner: async () => {
        set({ homeBannerLoading: true, homeBannerError: null });
        try {
            const res = await fetchHomeBannerAPI();
            set({ homeBanner: res.data.data, homeBannerLoading: false });
        } catch (e) {
            console.error(e);
            set({ homeBannerError: e.message, homeBannerLoading: false });
        }
    },
    fetchCocoHead: async () => {
        set({ cocoHeadLoading: true, cocoHeadError: null });
        try {
            const res = await fetchCocoHeadAPI();
            set({ cocoHead: res.data.data, cocoHeadLoading: false });
        } catch (e) {
            console.error(e);
            set({ cocoHeadError: e.message, cocoHeadLoading: false });
        }
    },
    fetchCocoBanner: async () => {
        set({ cocoBannerLoading: true, cocoBannerError: null });
        try {
            const res = await fetchCocoBannerAPI();
            set({ cocoBanner: res.data.data, cocoBannerLoading: false });
        } catch (e) {
            console.error(e);
            set({ cocoBannerError: e.message, cocoBannerLoading: false });
        }
    },
    fetchOurProducts: async () => {
        set({ ourProductsLoading: true, ourProductsError: null });
        try {
            const res = await fetchOurProductsAPI();
            set({ ourProducts: res.data.data, ourProductsLoading: false });
        } catch (e) {
            console.error(e);
            set({ ourProductsError: e.message, ourProductsLoading: false });
        }
    },
    fetchPrintableGames: async () => {
        set({ printableGamesLoading: true, printableGamesError: null });
        try {
            const res = await fetchPrintableGamesAPI();
            set({ printableGames: res.data.data, printableGamesLoading: false });
        } catch (e) {
            console.error(e);
            set({ printableGamesError: e.message, printableGamesLoading: false });
        }
    },
    fetchHomePage: async () => {
        set({ loading: true, error: null });
        try {
            await Promise.all([
                get().fetchHomeBanner(),
                get().fetchCocoHead(),
                get().fetchCocoBanner(),
                get().fetchOurProducts(),
                get().fetchPrintableGames(),
            ]);
            set({ loading: false });
        } catch (e) {
            console.error("Homepage fetch failed", e);
            set({ error: e.message, loading: false });
        }
    }

}));
