/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        wood: "url(https://img.freepik.com/free-photo/wooden-textured-background_53876-14865.jpg?w=1380&t=st=1685888888~exp=1685889488~hmac=902e66f57fd0350a19ba9667cd52bcc3fdf1762b6a6f6823a913d9401da49941)",
      },
    },
  },
  plugins: [],
};
