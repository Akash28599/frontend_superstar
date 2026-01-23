import { create } from "zustand";
import { fetchSiteSettingsAPI } from "../api/apiList";

export const useAppStore = create((set) => ({
  siteSettingsLoading: false,
  siteSettingsError: null,
  siteSettings: null,

  scale: window.devicePixelRatio,
  setScale: (value) => set({ scale: value }),

  fetchSiteSettings: async () => {
    set({ siteSettingsLoading: true, siteSettingsError: null });
    try {
      const res = await fetchSiteSettingsAPI();
      console.log(res)
      set({ siteSettings: res.data.data[0], siteSettingsLoading: false });
    } catch (e) {
      console.error(e);
      set({ siteSettingsError: e.message, siteSettingsLoading: false });
    }
  },
}));
