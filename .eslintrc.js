module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    "plugin:react/recommended"
  ], 
  // 使用推荐的React代码检测规范
  plugins: [
    "react-hooks"
  ],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  settings: { // 自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  parserOptions: { // 指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    requireConfigFile: false
  },
  globals: {
    document: false,
    navigator: false,
    window: false,
    location: false,
    PropTypes: false,
    serverData: false,
    React: false,
    ReactDOM: false,
    useState: false,
    useEffect: false,
    useCallback: false,
    useMemo: false,
    useReducer: false,
    useRef: false,
    useContext: false
  },
  rules: {
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'prefer-rest-params': 0,
  },
}
