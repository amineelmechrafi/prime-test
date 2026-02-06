export const BinService2 = {
    async getBinsData (start , limit) {
        let url = `http://localhost:3000/bins`;
        if (start & limit) {
        url += `?_start=${start}&_limit=${limit}`;
        }
        const response = await fetch (url)
        const data = await response.json ();
        return data;
    },  
     async  getBins(start , limit) {
        const data = await this.getBinsData(start , limit);
        return data; 
    },
}