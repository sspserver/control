const KEBAB_CASE = '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$';
const CAMEL_CASE = '^[a-z][a-zA-Z0-9]+$';

module.exports = {
  extends: ['stylelint-prettier/recommended'],
  rules: {
    'selector-max-specificity': [
      '0,3,0',
      {
        ignoreSelectors: [':global', ':local'],
      },
    ],
    'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
    'font-family-no-missing-generic-family-keyword': null,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'custom-media-pattern': [
      KEBAB_CASE,
      {
        message: 'Expected custom media query name to be kebab-case',
      },
    ],
    'custom-property-pattern': [
      KEBAB_CASE,
      {
        message: 'Expected custom property name to be kebab-case',
      },
    ],
    'keyframes-name-pattern': [
      KEBAB_CASE,
      {
        message: 'Expected keyframe name to be kebab-case',
      },
    ],
    'selector-class-pattern': [
      `(${CAMEL_CASE}|^ring-ui-theme-dark$)`,
      {
        message: 'Expected class selector to be camelCase',
      },
    ],
    'selector-id-pattern': [
      CAMEL_CASE,
      {
        message: 'Expected id selector to be camelCase',
      },
    ],
    'declaration-block-no-duplicate-properties': [true, { ignoreProperties: ['composes'] }],
  },
};
