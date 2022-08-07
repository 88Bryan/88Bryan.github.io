const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

const DBSOURCE = "db.sqlite";

const selectQuery = async(query) => {
    try {
        const db = await sqlite.open({
            filename: DBSOURCE,
            driver: sqlite3.Database
        });
        const result = await db.get(query);
        return result;
    } catch (err) {
        console.error(err);
        return { err };
    }
}

module.exports = { selectQuery };