const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://alumni-backup-dot-tutorial-262713.el.r.appspot.com'
    : 'http://localhost:4000';
console.log(apiUrl, process.env);
const config = {
  apiUrl,
};

export default config;
