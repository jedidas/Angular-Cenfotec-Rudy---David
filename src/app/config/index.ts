export const CONFIG = {
  i18nPath: "assets/i18n/",
  defaultLang: "en",
  api: 'http://localhost:8000/',
  settings: {
    access_token: ''
  },
  patterns: {
    email: /^[a-z0-9._%+=]+@[a-z0-9.-]+\.[a-z]{2,3}$/
  },
  notLoginRoutes: ['login', 'signup']
};
