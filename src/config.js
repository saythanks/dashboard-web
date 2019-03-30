export default {
  api: {
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://api.saythanks.me'
        : 'http://localhost:5000',
  },
  wallet: {
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://wallet.saythanks.me'
        : process.env.PORT === '3001'
        ? 'http://localhost:3000'
        : 'http://localhost:3001',
  },
}
