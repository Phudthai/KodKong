/**
 * Prettier configuration for KodKong monorepo
 *
 * @description
 * Consistent code formatting across the entire codebase
 *
 * @see https://prettier.io/docs/en/configuration.html
 * @author KodKong Team
 * @created 2026-03-05
 */

module.exports = {
  // Line width
  printWidth: 100,

  // Indentation
  tabWidth: 2,
  useTabs: false,

  // Semicolons
  semi: false,

  // Quotes
  singleQuote: true,
  quoteProps: 'as-needed',

  // JSX
  jsxSingleQuote: false,
  jsxBracketSameLine: false,

  // Trailing commas
  trailingComma: 'es5',

  // Bracket spacing
  bracketSpacing: true,

  // Arrow function parentheses
  arrowParens: 'always',

  // Line endings
  endOfLine: 'lf',

  // Embedded language formatting
  embeddedLanguageFormatting: 'auto',

  // HTML whitespace sensitivity
  htmlWhitespaceSensitivity: 'css',

  // Prose wrap
  proseWrap: 'preserve',
}
