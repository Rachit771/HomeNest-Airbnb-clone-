const Redis = require("ioredis");

const redis = new Redis(
  process.env.REDIS_URL || {
  host: "redis",
  port: 6379,
});

module.exports = redis;
