import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';

export default [
    {
        // Flat config: ignore patterns
        ignores: [
            "node_modules",
            "scripts/*",
            "config/*",
            "pnpm-lock.yaml",
            "pnpm-workspace.yaml",
            ".DS_Store",
            "package.json",
            "tsconfig.json",
            "**/*.md",
            "build",
            ".eslintrc.cjs",
            "eslint.config.js",
            "**/.*" // Ignore all dotfiles (like .gitignore)
        ],
    },
    {
        // Language options (ES Modules, JSX)
        languageOptions: {
            ecmaVersion: 2021,  // ES2021 syntax support
            sourceType: 'module',
            globals: {
                window: 'readonly', // For browser-based globals
                document: 'readonly',
                Edit: 'writable',
                console: 'writable',
                _: 'writable',
                $: 'writable',
            },
            ecmaFeatures: {
                jsx: true, // Enable JSX parsing
            },
        },

        // Plugins to be used
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            prettier: prettierPlugin,
            '@typescript-eslint': typescriptPlugin,
            'react-refresh': reactRefreshPlugin,
            import: importPlugin,
        },

        // ESLint rule configurations (extends equivalent in Flat Config)
        extends: [
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended'
        ],

        settings: {
            react: {
                version: 'detect',  // Automatically detect the React version
            },
        },
    },
];
