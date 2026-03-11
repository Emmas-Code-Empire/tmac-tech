const wait = (seconds: number) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, seconds * 1000);
  });
};

export default wait;
