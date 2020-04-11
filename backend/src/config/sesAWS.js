module.exports = {
  aws: {
    key: process.env.ACCESS_KEY_SES,
    secret: process.env.ACCESS_SECRET_SES,
    ses: {
      from: {
        default: process.env.EMAIL_FASTFEET,
      },
      region: process.env.ACCESS_REGION_SES,
    },
  },
};
