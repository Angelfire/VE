/** @type {import("@types/prettier").Options} */
module.exports = {
  arrowParens: "avoid",
  endOfLine: "lf",
  printWidth: 100,
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
  plugins: [
    require("prettier-plugin-astro"),
    require("prettier-plugin-tailwindcss") /* Must come last */,
  ],
  pluginSearchDirs: false,
  overrides: [
    {
      files: "**/*astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
