const cache = new Map();

export const setCache = (key, data, ttl = 600000) => {
  cache.set(key, {
    data,
    expiry: Date.now() + ttl,
  });
};

export const getCache = (key) => {
  const item = cache.get(key);

  if (!item) return null;

  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }

  return item.data;
};