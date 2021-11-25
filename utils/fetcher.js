// TODO: consider deleting (used with swr)
export const fetcher = async (url, ...args) => {
  return fetch(...args).then(async (res) => {
    let payload;
    try {
      if (res.status === 204) return null;
      payload = await res.json();
      if (res.ok) {
        return payload;
      } else {
        return Promise.reject(payload.error || new Error('Something went wrong'));
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Sever Error. ${err.message}`);
    }
  });
};