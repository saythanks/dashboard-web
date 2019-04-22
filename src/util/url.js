export const publicUrlTo = path =>
  `${window.location.protocol}//${window.location.hostname}${window.location
    .port !== 80 && `:${window.location.port}`}${
    process.env.PUBLIC_URL
  }/${path}`
