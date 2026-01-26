// Centralized configuration for the application

// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337',
    ENDPOINTS: {
        HOME_BANNERS: '/api/homebanners?populate=*',
        COCO_HEADS: '/api/coco-heads?populate=*',
        QUIZ_LANDING: '/api/quiz-landing-page?populate=*',
        CLUB_LANDING: '/api/clubs-landing-page?populate=*',
        STORIES: '/api/stories?populate=*',
        BLOGS: '/api/blogs?populate=*',
        PRODUCTS: '/api/products?populate=*',
        GAMES: '/api/games?populate=*',
        FOOTER: '/api/footer?populate=*',
    }
};

// Theme Colors
export const COLORS = {
    red: '#F60945',
    gold: '#FBCA05',
    white: '#FFFFFF',
    black: '#000000',
    kelloggs: {
        red: '#F60945',
        gold: '#FBCA05',
    }
};

// Font Configuration
export const FONTS = {
    primary: '"Kellogg\'s Sans", Arial, sans-serif',
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
    mobile: '320px',
    mobileLarge: '480px',
    tablet: '768px',
    tabletLarge: '1024px',
    laptop: '1280px',
    laptopLarge: '1366px',
    desktop: '1440px',
    desktopLarge: '1536px',
    wide: '1920px',
};

// External URLs
export const EXTERNAL_URLS = {
    youtube: 'https://www.youtube.com/@kelloggsnigeria2248',
    facebook: 'https://www.facebook.com/KelloggsNG',
    instagram: 'https://www.instagram.com/kelloggs_ng/',
    twitter: 'https://twitter.com/Kelloggs_NG',
};

// Asset Paths
export const ASSETS = {
    pdfs: '/assets/pdfs',
    images: '/assets/images',
    videos: '/assetss',
};

// App Routes
export const ROUTES = {
    home: '/',
    scholarship: '/scholarship',
    quiz: '/quiz',
    club: '/club',
    games: '/games',
    stories: '/stories',
    blog: '/blog',
    contact: '/contact',
};

export default {
    API_CONFIG,
    COLORS,
    FONTS,
    BREAKPOINTS,
    EXTERNAL_URLS,
    ASSETS,
    ROUTES,
};
