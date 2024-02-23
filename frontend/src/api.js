// const BASE_URL = 'http://localhost:3001';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const CHAT_URL = `${BASE_URL}/chatbot`;

export const EN_INDIC = `${BASE_URL}/translate/english-to-indic`;
export const INDIC_EN = `${BASE_URL}/translate/indic-to-english`;

export const OCR_URL = `${BASE_URL}/extract_text`;