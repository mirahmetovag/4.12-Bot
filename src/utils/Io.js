const fs = require('fs').promises;

class Io {
    #dir
    constructor (dir) {
        this.#dir = dir
    }

    async read() {
        let str;
        try {
          str = await fs.readFile(this.#dir, 'utf-8');
        } catch (error) {
        }
        let data = [];
        if (str) {
            try {
                data = JSON.parse(str);
            } catch (error) {
            }
        }
        return data;
    }

    async write(data) {
        const str = JSON.stringify(data, null, 2);
        try {
            await fs.writeFile(this.#dir, str, 'utf-8');
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = Io;