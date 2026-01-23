import api from "./api";

//SiteSettings
export const fetchSiteSettingsAPI = () =>
  api.get("/sitesettings?populate=*")

// HOME

export const fetchHomeBannerAPI = () =>
  api.get("/homebanners?populate=*")
export const fetchCocoHeadAPI = () =>
  api.get("/coco-heads?populate=*")
export const fetchCocoBannerAPI = () =>
  api.get("/cocobanners?populate=*")
export const fetchOurProductsAPI = () =>
  api.get("/our-products?populate=*")
export const fetchPrintableGamesAPI = () =>
  api.get("/games?populate=*")

// CONTEST
export const fetchContestAPI = () =>
  api.get("/api/contest?populate=*");

// AUTH (if needed later)
export const loginAPI = (data) =>
  api.post("/api/auth/local", data);
