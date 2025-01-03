module.exports = {
  parser: '@babel/eslint-parser', // Updated to support modern JS and React
  parserOptions: {
    ecmaVersion: 2020, // Allows parsing of modern ECMAScript features
    sourceType: 'module', // Allows the use of imports
    ecmaFeatures: {
      jsx: true, // Allows parsing of JSX
    },
    requireConfigFile: false, // For @babel/eslint-parser to work without a Babel config file
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  extends: [
    'eslint:recommended', // ESLint recommended rules
    'plugin:react/recommended', // React-specific rules
    'plugin:react-hooks/recommended', // Rules for React Hooks
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    // Enable Prettier errors as ESLint errors
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // Handles different OS line endings
        singleQuote: true, // Use single quotes
        trailingComma: 'es5', // Trailing commas where valid in ES5
        bracketSpacing: true, // Include spaces between brackets
        jsxSingleQuote: false, // Use double quotes in JSX
      },
    ],
    // React-specific rules
    'react/prop-types': 'off', // Disable prop-types as we often use TypeScript or other patterns
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    'react/jsx-uses-react': 'off', // Not needed with React 17+
    'react/jsx-uses-vars': 'error', // Prevent variables used in JSX from being marked as unused
    // React Hooks rules
    'react-hooks/rules-of-hooks': 'error', // Ensure hooks are used correctly
    'react-hooks/exhaustive-deps': 'warn', // Check dependencies in useEffect
    // Optional additional rules
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    'no-console': 'warn', // Warn about console logs
    'no-debugger': 'error', // Disallow debugger statements
  },
}
