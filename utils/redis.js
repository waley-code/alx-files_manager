// const redis = require("redis");

// class RedisClient {
//   constructor() {
//     // Create a Redis client
//     this.client = redis.createClient();

//     // Handle errors by displaying them in the console
//     this.client.on("error", (err) => {
//       console.error("Redis Error:", err);
//     });
//   }

//   async isAlive() {
//     // Check if the Redis client is connected
//     return new Promise((resolve) => {
//       this.client.ping("CHECK", (err, reply) => {
//         if (err || reply !== "CHECK") {
//           resolve(false);
//         } else {
//           resolve(true);
//         }
//       });
//     });
//   }

//   async get(key) {
//     // Get the value from Redis for the given key
//     return new Promise((resolve, reject) => {
//       this.client.get(key, (err, reply) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(reply);
//         }
//       });
//     });
//   }

//   async set(key, value, durationInSeconds) {
//     // Set a value in Redis with an expiration
//     return new Promise((resolve, reject) => {
//       this.client.setex(key, durationInSeconds, value, (err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve("OK");
//         }
//       });
//     });
//   }

//   async del(key) {
//     // Delete a value in Redis for the given key
//     return new Promise((resolve, reject) => {
//       this.client.del(key, (err, reply) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(reply);
//         }
//       });
//     });
//   }
// }

// // Create and export an instance of RedisClient
// const redisClient = new RedisClient();
// module.exports = redisClient;

import redis from "redis";
import { promisify } from "util";

/**
 * Class for performing operations with Redis service
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on("error", (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on("connect", () => {
      // console.log('Redis client connected to the server');
    });
  }

  /**
   * Checks if connection to Redis is Alive
   * @return {boolean} true if connection alive or false if not
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * gets value corresponding to key in redis
   * @key {string} key to search for in redis
   * @return {string}  value of key
   */
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  /**
   * Creates a new key in redis with a specific TTL
   * @key {string} key to be saved in redis
   * @value {string} value to be asigned to key
   * @duration {number} TTL of key
   * @return {undefined}  No return
   */
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /**
   * Deletes key in redis service
   * @key {string} key to be deleted
   * @return {undefined}  No return
   */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;