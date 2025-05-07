/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  trailingComma: "all",
  singleQuote: true,
  useTabs: true,
  bracketSpacing: true,
  jsxSingleQuote: true,
  tabWidth: 4,
  printWidth: 160,
  arrowParens: "always",
  plugins: ["prettier-plugin-tailwindcss"],
};
