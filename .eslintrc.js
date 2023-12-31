module.exports = {
    env: {
        browser: true,

        es2021: true,

        node: true
    },

    extends: [
        'eslint:recommended',

        'plugin:react/recommended',

        'plugin:prettier/recommended'
    ],

    overrides: [
        {
            env: {
                node: true
            },

            files: ['.eslintrc.{js,cjs}'],

            parserOptions: {
                sourceType: 'script'
            }
        }
    ],

    parserOptions: {
        ecmaVersion: 'latest',

        sourceType: 'module'
    },

    plugins: ['react'],

    rules: {
        'react/prop-types': 'off', // Disable prop-types validation if you use PropTypes from Material-UI

        'react/react-in-jsx-scope': 'off', // No need for this rule if you are using React 17+

        'react/display-name': 'off', // Disable display-name rule if not needed

        'react/jsx-indent': ['error', 4],

        'react/jsx-indent-props': ['error', 4],

        indent: [
            'error',

            4,

            {
                SwitchCase: 1
            }
        ],

        'linebreak-style': ['error', 'unix'],

        quotes: ['error', 'single'],

        semi: ['error', 'always'],

        eqeqeq: ['warn', 'always']
    }
};
