module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  settings: { 'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } } },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-param-reassign': [1, { // TODO: Enable as error
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ],
    }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [1], // TODO: Enable as error
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': [1], // TODO: Enable as error
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [1], // TODO: Enable as error
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-props-no-spreading': [1, { // TODO: Enable as error
      html: 'enforce',
      custom: 'enforce',
      explicitSpread: 'enforce',
      exceptions: [ // TODO: Remove exceptions
        'Swiper',
        'ToastContainer',
        'BRBNotification',
        'input',
        'Button',
      ],
    }],
    'max-len': [0, { // TODO: Enable as warning
      code: 120,
    }],
    'object-curly-newline': [1, { // TODO: Enable as error
      ObjectExpression: { multiline: true, minProperties: 4, consistent: true },
      ObjectPattern: { multiline: true, minProperties: 5, consistent: true },
      ImportDeclaration: { multiline: true, minProperties: 5, consistent: true },
      ExportDeclaration: { multiline: true, minProperties: 3, consistent: true },
    }],
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],

    // TODO: Remove these overrides (CRITICAL PRIORITY)
    // (Switched off [0] or to warnings [1] to allow build to complete)
    // 'import/no-extraneous-dependencies': [1],
    // 'import/no-cycle': [1],
    // 'import/order': [1],
    // 'no-unused-expressions': [1],
    // 'consistent-return': [1],
    // 'no-useless-concat': [1],
    // 'no-cond-assign': [1],
    // 'react/jsx-no-bind': [1],
    // 'import/no-unresolved': [1],
    // 'react-hooks/exhaustive-deps': [1],

    // TODO: Remove these overrides (HIGH PRIORITY)
    // (Switched off [0] or to warnings [1] to allow build to complete)
    // 'react/destructuring-assignment': [1],
    'import/prefer-default-export': [0],
    'react/no-array-index-key': [1],
    'no-nested-ternary': [1],
    'no-empty': [1],

    // TODO: Remove these overrides (MEDIUM PRIORITY)
    // (Switched off [0] or to warnings [1] to allow build to complete)
    'no-lone-blocks': [1],
    'no-multi-spaces': [1],
    'object-curly-spacing': [1],
    'react/prop-types': [1],
    'react/require-default-props': [1],
    'template-curly-spacing': [1],
    'react/jsx-indent-props': [1],
    'react/jsx-indent': [1],
    'react/jsx-props-no-multi-spaces': [1],
    quotes: [1],
    camelcase: [1],

    // TODO: Remove these overrides (LOW PRIORITY)
    // (Switched off [0] or to warnings [1] to allow build to complete)
    'jsx-a11y/alt-text': [1],
    'jsx-a11y/anchor-is-valid': [1],
    'jsx-a11y/click-events-have-key-events': [1],
    'jsx-a11y/label-has-associated-control': [1],
    'jsx-a11y/no-noninteractive-element-interactions': [1],
    'jsx-a11y/no-static-element-interactions': [1],
    'no-console': [0],

  },
};
