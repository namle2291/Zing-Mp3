module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      playpen: ["Playpen Sans"],
      roboto: ["Roboto"],
    },
    extend: {

    },
  },
  plugins: [require("flowbite/plugin")],
};
