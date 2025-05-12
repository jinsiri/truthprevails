/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  useTabs: false,
  bracketSpacing: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  printWidth: 160,
  arrowParens: 'always',
  plugins: ['prettier-plugin-tailwindcss'],
};
