/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./public/**/*.html",
    "./src/**/*.{html,js,jsx,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "599px" },
        // => @media (max-width: 599px) { ... }

        "tablet-portrait-up": "600px",
        // => @media (min-width: 600px) { ... }

        "tablet-landscape-up": "900px",
        // => @media (min-width: 900px) { ... }

        "desktop-up": "1200px",
        // => @media (min-width: 1200px) { ... }

        "big-desktop-up": "1800px",
        // => @media (min-width: 1800px) { ... }
      },
      colors: {
        "mine-shaft": "#202020",
        tundora: "#404040",
        "wild-strawberry": "#ff379b",
        "mid-gray": "#67686C",
        emperor: "#545454",
        oregon: "#9b3600",
        "dove-gray": "#6c6c6c",
        "hot-pink": "#ff55b9",
        selago: "#f5f7fd",
        concrete: "#f2f2f2",
        tutu: "#fff4fc",
        nobel: "#b4b4b4",
        gallery: "#eaeaea",
        silver: "#cccccc",
        "fun-blue": "#1f4ea5",
        "orange-peel": "#ff9900",
        rose: "#ff006b",
        alto: "#d9d9d9",
        "pink-lace": "#fed1f1",
        "red-ribbon": "#dc0049",
        "persian-green": "#00a59b",
        "curious-blue": "#27a2d8",
        "blaze-orange": "#ff6400",
        "red-orange": "#ff2525",
        zircon: "#f9faff",
        nobel: "#b7b7b7",
        "persian-rose": "#ff199b",
        "wild-sand": "#f5f5f5",
        "milano-red": "#bf160b",
        pumpkin: "#ff7d19",
        sidecar: "#f5e3bf",
        "quill-gray": "#dededc",
        viola: "#c880b4",
        sunglow: "#ffcd39",
        razzmatazz: "#e5105e",
        "wisp-pink": "#fdebf2",
        "pale-rose": "#ffe5f2",
        "flush-orange": "#FF7800",
        madang: "#C2F2B0",
        feta: "#F1FDEF",
      },
      maxWidth: {
        container: "1200px",
      },
      fontWeight: {
        inherit: "inherit",
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("flowbite/plugin"),
  ],
  corePlugins: {
    preflight: false,
  },
};
