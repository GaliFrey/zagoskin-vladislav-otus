module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: ["plugin:vue/recommended", "@vue/prettier"],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    curly: ["error", "all"],
    "max-len": ["error", { code: 80, ignoreUrls: true }],
    quotes: [
      "error",
      "single",
      { avoidEscape: true, allowTemplateLiterals: false }
    ]
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  }
};
