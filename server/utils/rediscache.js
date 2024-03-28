import redisClient from "./redisclient.js";
const DEFAULT_EXPIRATION = 30;

export const getCacheValue = async (key) => {
  const data = await redisClient.get(key);
  const parsedData = await JSON.parse(data);
  return parsedData;
};

export const setCacheValue = async (key, value) => {
  const response = await redisClient.setex(
    key,
    DEFAULT_EXPIRATION,
    JSON.stringify(value)
  );
  return value;
};
