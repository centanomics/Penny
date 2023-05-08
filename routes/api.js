const router = require('express').Router();

let discordClient;

module.exports = (client) => {
    discordClient = client;
    return router;
};
