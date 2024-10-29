import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    ignores: [".nuxt", "node_modules", "tailwind.config.js", "src/components/"],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
    },
    files: ["src/**/*.{js,ts,vue}"],
    rules: {
      "no-unused-vars": "off",
      "no-undef": "error",
      "vue/no-multiple-template-root": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  }
);
