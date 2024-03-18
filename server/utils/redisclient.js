import Redis from "ioredis";
const redisClient = new Redis(6379, "13.232.150.72");
export default redisClient;
