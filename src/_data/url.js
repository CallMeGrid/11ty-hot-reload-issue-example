function getBaseURL() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://test.com';
  } else {
    return 'http://localhost:8080';
  }
}

module.exports = {
  base: getBaseURL()
};
