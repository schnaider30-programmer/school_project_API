// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
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
    ...js.configs.recommended,
  },
]);
