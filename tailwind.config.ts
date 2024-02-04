import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#F1F1F1',
        'accent': '#F74264',
        'black': '#050505',
        'semi-black': '#1E1E1E',
        'gray': "#A0A0A0"
      }
    },
  },
  plugins: [],
};
export default config;
