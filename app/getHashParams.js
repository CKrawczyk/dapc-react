function getHashParams(hashIn) {
  const ret = {};
  const str = hashIn.trim().replace(/^(\?|#|&)/, '').split('&');
  if (!str) {
    return ret;
  }
  str.map(hash => {
    const [key, val] = hash.split('=');
    ret[key] = val;
  });
  return ret;
}

export default getHashParams;
