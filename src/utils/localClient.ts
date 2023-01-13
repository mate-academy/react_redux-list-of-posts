// function wait(delay: number) {
//   return new Promise(done => setTimeout(done, delay));
// }

const localClient = {
  read(key: string) {
    const data = window.localStorage.getItem(key);

    try {
      return data && JSON.parse(data);
    } catch (error) {
      return null;
    }
  },
  write(key: string, data: string) {
    window.localStorage.setItem(key, JSON.stringify(data));
  },
  init(key: string, initialData: string) {
    if (!this.read(key)) {
      this.write(key, initialData);
    }
  },
};

export default localClient;
