module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  globals: {
    process: true,
    defineEmits: 'readonly',
    defineProps: 'readonly',
    defineExpose: 'readonly',
    InstanceType: 'readonly',
    ReturnType: 'readonly',
  },
  extends: [
    'plugin:vue/vue3-essential', 
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  // parserOptions: {
  //   parser: 'babel-eslint',
  //   // parser: '@typescript-eslint/parser',
  //   // sourceType: 'module'
  // },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  parser: "vue-eslint-parser",
  plugins: ['vue', 'prettier', '@typescript-eslint'],

  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/interface-name-prefix": ["off"],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 3
      },      
      "multiline": {
        "max": 1
      }
    }],
  },
}
