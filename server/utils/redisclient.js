import Redis from "ioredis";
const redisClient = new Redis(6379, "13.233.64.99");
export default redisClient;
