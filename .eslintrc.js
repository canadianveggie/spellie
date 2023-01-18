module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  plugins: [
    "html", // lint index.html too
    "only-warn", // downgrade all to warnings for now
  ],
  extends: ["eslint:recommended", "airbnb-base", "plugin:compat/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "2019", // no optional chaining / nullish coalescing
  },
  rules: {
    // allow warn and error
    "no-console": ["error", { allow: ["warn", "error"] }],

    // sometimes it's more readable
    "arrow-body-style": "off",
    "consistent-return": "off",
    "no-continue": "off",

    // allow it in for loops
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],

    // override airbnb default to allow for...of
    // see https://github.com/airbnb/javascript/issues/1271#issuecomment-281254652
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      // {
      //   selector: 'ForOfStatement',
      //   message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
      // },
      {
        selector: "LabeledStatement",
        message: "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message: "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],

    // function declarations are hoisted and it leads to more readable code
    "no-use-before-define": ["error", { functions: false, classes: true, variables: true }],
  },
};
