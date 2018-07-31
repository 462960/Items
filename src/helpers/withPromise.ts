const withPromise = (func, ...args) => {
  return new Promise((resolve, reject) => {
    func(...args, { resolve, reject });
  });
};

export default withPromise;
