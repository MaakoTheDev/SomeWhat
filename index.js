require("dotenv/config");
const { Client, Collection, ChatInputCommandInteraction } = require("discord.js");
const Util = require("./Structures/Utils");
const { ClientToken } = process.env;
const { loadEvents } = require("./Handlers/Events");
const { loadCommands } = require("./Handlers/Commands");
const { loadComponents } = require("./Handlers/Components");
// const discordModals = require('discord-modals');
// discordModals(client);
const chalk = require("chalk");

const client = new Client({
  intents: 3276799,
  partials: [require("./Structures/config.json").partials],
});

client.config = require("./Structures/config.json");
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();
global.components = {
  buttons: new Collection(),
  selectMenus: new Collection(),
  modals: new Collection()
};

global.utils = new Util(client);
global.chalk = chalk;

(async () => {
  await loadEvents(client);
  await client.login(ClientToken).then(() => {
    console.log(
      chalk.bold.yellowBright(
        `[CLIENT] - ${client.user.tag} has looged into Discord. `
      )
    );
  });
  await loadCommands(client);
  await loadComponents(client);
  await utils.logger();
})();

module.exports = client;

