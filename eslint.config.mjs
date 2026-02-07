// @ts-check

import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    
    rules: {
      "@typescript-eslint/no-non-null-assertion": ["warn"],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        { ignoreVoidReturningFunctions: true },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
    },
  },
  globalIgnores(["scripts/**", "*.js", "*.mjs"]),
);
