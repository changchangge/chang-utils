function retryRequest(asyncRequest, params, times) {
  return asyncRequest(params).catch((err) => {
    if (--times) {
      return retryRequest(asyncRequest, params, times);
    } else {
      throw err;
    }
  });
}
