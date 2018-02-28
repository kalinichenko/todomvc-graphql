const baseRules = {
  // disabled (we don't care about these rules)
  'arrow-parens': 'off',
  'arrow-body-style': 'off',
  'max-len': 'off',
  'no-prototype-builtins': 'off',
  'no-plusplus': 'off',
  'default-case': 'off',
  'no-use-before-define': 'off',
  'consistent-return': 'off',
  'class-methods-use-this': 'off',
  'import/prefer-default-export': 'off',

  // modified (we have different preferences)
  // 'object-curly-spacing': ['error', 'never'],
  'one-var': ['error', {
    initialized: 'never'
  }],
  'one-var-declaration-per-line': ['error', 'initializations'],
  'no-underscore-dangle': ['error', {
    allow: [
      '_snaq', // snowplow
      '_ga', // google analytics
      '_gaq', // google analytics
      '_GTM', // google tag manager
    ]
  }]
};

const reactRules = {
  // disabled
  'react/jsx-space-before-closing': 'off',
  'react/forbid-prop-types': 'off',
  'react/prefer-stateless-function': 'off',
  'jsx-a11y/no-static-element-interactions': 'off',

  // TODO to be enabled (disabled due to lots of errors, should be fixed gradually)
  'react/no-array-index-key': 'off',
  'react/prop-types': 'off',
  'react/no-multi-comp': 'off',
  'react/sort-comp': 'off',
  'react/require-default-props': 'off',
  // 'react/sort-comp': ['error', {
  //    order: [
  //      'static-methods',
  //      'lifecycle',
  //      'rendering',
  //      'everything-else'
  //    ],
  //    groups: {
  //      rendering: [
  //        'render',
  //        '/^render.+$/'
  //      ]
  //    }
  // }],

  // modified
  'react/jsx-filename-extension': ['error', {
    extensions: ['.js']
  }],
  'react/jsx-tag-spacing': ['error', {
    closingSlash: 'never',
    beforeSelfClosing: 'allow',
    afterOpening: 'never'
  }],
  'react/jsx-max-props-per-line': ['error', {maximum: 2}],
  "jsx-a11y/anchor-is-valid": [ "error", {
    "components": [ "Link" ],
    "specialLink": [ "to" ]
  }]
};

const importRules = {
  // disabled
  'import/no-named-as-default':  'off',

  // modified
  'import/no-extraneous-dependencies': ['error', {
    'devDependencies': [
      'webpack/**/*.js',
      'git-hooks/**/*.js',
      '**/*.test.js',
    ],
    'optionalDependencies': false,
    'peerDependencies': false
  }]
};

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb'
  ],
  env: {
    browser: true,
    jest: true
  },
  globals: {
    defs: false
  },
  rules: Object.assign({},
    baseRules,
    importRules,
    reactRules
  )
};
