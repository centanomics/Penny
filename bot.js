// setups .env files with tokens
require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

// add bots
require('./discord/discordBot');
require('./twitch/twitchBot');
