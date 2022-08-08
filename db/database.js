const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

const DBSOURCE = "db.sqlite";

const createAndInsertTable = async(query) => {
    try {
        const db = await sqlite.open({
            filename: DBSOURCE,
            driver: sqlite3.Database
        });
        await db.exec(query);
        await db.close();
    } catch (err) {
        console.error(err);
    }
}

const selectQuery = async(query) => {
    try {
        const db = await sqlite.open({
            filename: DBSOURCE,
            driver: sqlite3.Database
        });
        const result = await db.all(query);
        await db.close();
        return result;
    } catch (err) {
        console.error(err);
        return { err };
    }
}

module.exports = { selectQuery, createAndInsertTable };