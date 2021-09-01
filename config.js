if (!process.env.TOKEN) require('dotenv').config();

module.exports = {
    BOT_TOKEN: process.env.TOKEN,
    BOT_PREFIX: ".",
}