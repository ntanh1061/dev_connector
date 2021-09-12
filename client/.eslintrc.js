module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-debugger": "warn",
    "jsx-quotes": ["error", "prefer-double"],
    "keyword-spacing": ["error", { before: true }],
    semi: [2, "always"],
    curly: [2, "all"],
    "react/prop-types": [0],
    "switch-colon-spacing": ["error", { after: true, before: false }],
  },
  globals: {
    arguments: true,
  },
};
