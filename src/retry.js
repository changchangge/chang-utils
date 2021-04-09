function retry(asyncRequest, times) {
  return asyncRequest().catch((err) => {
    if (--times) {
      return retry(asyncRequest, times);
    } else {
      throw err;
    }
  });
}
