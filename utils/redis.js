const redis = require("redis");

class RedisClient {
  constructor() {
    // Create a Redis client
    this.client = redis.createClient();

    // Handle errors by displaying them in the console
    this.client.on("error", (err) => {
      console.error("Redis Error:", err);
    });
  }

  async isAlive() {
    // Check if the Redis client is connected
    return new Promise((resolve) => {
      this.client.ping("CHECK", (err, reply) => {
        if (err || reply !== "CHECK") {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  async get(key) {
    // Get the value from Redis for the given key
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async set(key, value, durationInSeconds) {
    // Set a value in Redis with an expiration
    return new Promise((resolve, reject) => {
      this.client.setex(key, durationInSeconds, value, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("OK");
        }
      });
    });
  }

  async del(key) {
    // Delete a value in Redis for the given key
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
