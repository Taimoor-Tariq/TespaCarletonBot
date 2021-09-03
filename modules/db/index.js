const sqlite3 = require("sqlite3").verbose();

module.exports = class DB {
    #DB;

    constructor() {
        this.#DB = new sqlite3.Database("./modules/db/data.db");

        this.#DB.run(`CREATE TABLE IF NOT EXISTS "GAME_ROLE_MENU" (
            "ID"	    TEXT,
            "NAME"	    TEXT,
            "E_ID"	    TEXT,
            "E_NAME"	TEXT,
            PRIMARY KEY("ID")
        );`);

        this.#DB.run(`CREATE TABLE IF NOT EXISTS "IMPORTANT_IDs" (
            "ID"	        TEXT,
            "TYPE"      	INTEGER,
            "ELEMENT_ID"	TEXT,
            PRIMARY KEY("ID")
        );`);

        this.GAME_ROLE_MENU = {
            getAll: () => {
                return new Promise((resolve, reject) => {
                    this.#DB.all(`SELECT * FROM GAME_ROLE_MENU`, (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    })
                })
            },
        
            addRole: (id, name, emojiID, emojiName) => {
                return new Promise((resolve, reject) => {
                    this.#DB.run(`INSERT INTO GAME_ROLE_MENU (ID, NAME, E_ID, E_NAME) VALUES ("${id}", "${name}", "${emojiID}", "${emojiName}")`, (err) => {
                        if (err) {
                            if (err.errno == 19) this.#DB.run(`UPDATE GAME_ROLE_MENU SET (NAME, E_ID, E_NAME)=("${name}", "${emojiID}", "${emojiName}") WHERE ID="${id}"`, (err) => {
                                if (err) reject(err);
                                else resolve();
                            })
                            else reject(err);
                        }
                        else resolve();
                    })
                })
            },
        
            removeRole: (id) => {
                return new Promise((resolve, reject) => {
                    this.#DB.run(`DELETE FROM GAME_ROLE_MENU WHERE ID="${id}"`, (err) => {
                        if (err) reject(err);
                        else resolve();
                    })
                })
            },
        }

        this.IMPORTANT_IDs = {
            get: (id) => {
                return new Promise((resolve, reject) => {
                    this.#DB.all(`SELECT * FROM IMPORTANT_IDs WHERE ID="${id}"`, (err, res) => {
                        if (err) reject(err);
                        else res.length==0?resolve(null):resolve(res[0]);
                    })
                })
            },

            getAll: () => {
                return new Promise((resolve, reject) => {
                    this.#DB.all(`SELECT * FROM IMPORTANT_IDs`, (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    })
                })
            },
        
            add: (id, type, eId) => {
                return new Promise((resolve, reject) => {
                    this.#DB.run(`INSERT INTO IMPORTANT_IDs (ID, TYPE, ELEMENT_ID) VALUES ("${id}", "${type}", "${eId}")`, (err) => {
                        if (err) {
                            if (err.errno == 19) this.#DB.run(`UPDATE IMPORTANT_IDs SET (TYPE, ELEMENT_ID)=("${type}", "${eId}") WHERE ID="${id}"`, (err) => {
                                if (err) reject(err);
                                else resolve();
                            })
                            else reject(err);
                        }
                        else resolve();
                    })
                })
            },
        
            remove: (id) => {
                return new Promise((resolve, reject) => {
                    this.#DB.run(`DELETE FROM IMPORTANT_IDs WHERE ID="${id}"`, (err) => {
                        if (err) reject(err);
                        else resolve();
                    })
                })
            },
        }
    }
}