module.exports = {
  port: process.env.PORT || 5000,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret',
};
