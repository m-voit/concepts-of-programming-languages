module.exports = {
  extends: "eslint:recommended",
  env: {
    browser: true,
    node: true,
    es2020: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
};
