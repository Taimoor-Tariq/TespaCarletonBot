if (!process.env.TOKEN) require('dotenv').config();

module.exports = {
    BOT_TOKEN: process.env.TOKEN,
    BOT_PREFIX: ".",
    SERVER_ID: process.env.SERVER_ID,
    DEV_SERVER_ID: process.env.DEV_SERVER_ID,
}