module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'no-descending-specificity': null,
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': [
          'extend',
          'ignores'
        ]
      }
    ],
    'number-leading-zero': null,
    'unit-whitelist': [
      'em',
      'rem',
      's',
      'px',
      '%',
      'vh',
      'vw',
      'dpi',
      'deg',
      'fr'
    ]
  }
};
