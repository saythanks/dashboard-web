export default {
  api: {
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://api.saythanks.me'
        : 'http://localhost:5000',
  },
}
