// Datos del negocio: una sola fuente de verdad. Rellenar SOLO con datos confirmados del PRD.
export const BUSINESS = "Nombre del Negocio";
export const PHONE = "600000000"; // sin prefijo ni espacios
export const PHONE_PRETTY = "600 000 000";
export const WHATSAPP_URL = `https://wa.me/34${PHONE}?text=${encodeURIComponent(
  `¡Hola ${BUSINESS}! Quiero hacer un pedido:`
)}`;
export const INSTAGRAM_URL = "https://instagram.com/usuario";
export const TIKTOK_URL = "https://www.tiktok.com/@usuario";
export const ADDRESS = "Calle Ejemplo, 1, 00000 Ciudad, Provincia";
const q = encodeURIComponent(ADDRESS);
export const MAPS_EMBED = `https://www.google.com/maps?q=${q}&output=embed`;
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${q}`;
export const SINCE = 2000; // solo si el PRD lo confirma
