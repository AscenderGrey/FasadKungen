import tsParser from "@typescript-eslint/parser";

export default [
  { ignores: [".next/**", "node_modules/**", "coverage/**"] },
  { files: ["**/*.{ts,tsx}"], languageOptions: { parser: tsParser, parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } } }, rules: { "no-console": ["warn", { allow: ["warn", "error"] }], "no-constant-binary-expression": "error" } }
];
