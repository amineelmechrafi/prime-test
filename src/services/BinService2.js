export const BinService2 = {
  async getBinsData(start, limit) {
    const url = new URL('http://localhost:3000/bins');

    url.search = new URLSearchParams({
      _start: start,
      _limit: limit
    });

    const response = await fetch(url);
    const data = await response.json();
    const total = 13;

    return { data, total };
  },

  async getBins(start, limit) {
    return this.getBinsData(start, limit);
  }
};
