module.exports = {
  extends: ['react-app'],
  rules: {},
  ignorePatterns: ['/public/filters/src/*.js'],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'react-hooks/exhaustive-deps': 'off'
      }
    }
  ]
};
