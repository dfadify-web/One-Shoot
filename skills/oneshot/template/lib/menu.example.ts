// Estructura de carta/servicios que usa Menu.example.tsx. Copiar fiel al PRD, sin inventar precios.
export type MenuItem = {
  name: string;
  desc?: string;
  price: string | string[]; // array = varios tamaños (ver priceLabels)
  tag?: string; // badge corto: "De la casa", "Smash", "Nuevo"
};

export type MenuCategory = {
  id: string;
  label: string;
  note?: string; // subtítulo manuscrito: "Comida venezolana"
  priceLabels?: string[]; // p.ej. ["Peq.", "Med.", "Fam."]
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "ejemplo",
    label: "Ejemplo",
    items: [
      { name: "Producto", desc: "Ingredientes", price: "4,50€", tag: "De la casa" },
      { name: "Con tamaños", desc: "…", price: ["6", "11", "13€"] },
    ],
  },
];
