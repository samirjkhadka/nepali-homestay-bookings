import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { rule } from "postcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  rules({
    "@typescript-eslint/no-explicit-any": "off",
  }),
  "zones":[
    {
      "target": "./src/domain",
      "from": ["./src/infrastructure", "./src/repositories", "./src/application"]
    },
    {
      "target": "./src/application",
      "from": ["./src/infrastructure"]
    },
    {
      "target": "./app",
      "from": ["./src/infrastructure", "./src/repositories"]
    }
  ]
]);

export default eslintConfig;
