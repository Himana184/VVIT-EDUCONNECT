import redisClient from "./redisclient.js";
const DEFAULT_EXPIRATION = 30;

export const getCacheValue = async (key) => {
  console.log("Cache HIT");
  const data = await redisClient.get(key);
  const parsedData = await JSON.parse(data);
  return parsedData;
};

export const setCacheValue = async (key, value) => {
  console.log("Cache MISS");
  const response = await redisClient.setex(
    key,
    DEFAULT_EXPIRATION,
    JSON.stringify(value)
  );
  return value;
};
