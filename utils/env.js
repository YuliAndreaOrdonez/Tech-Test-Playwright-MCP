function getBaseUrl() {
  return process.env.BASE_URL || 'http://localhost:3000';
}

module.exports = { getBaseUrl };
