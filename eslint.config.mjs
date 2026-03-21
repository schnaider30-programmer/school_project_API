import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      import: require("eslint-plugin-import"),
      prettier: require("eslint-plugin-prettier"),
    },
    extends: [
      "js/recommended",
      "plugin:import/recommended",
      "plugin:prettier/recommended",
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: "module",
    },
    rules: {
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      semi: ["error", "always"],
      "no-unused-vars": ["warn"],
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
]);
