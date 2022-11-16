const { Client } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    /*
      different types for statuses can be a number and they as follows:
      Playing: 0
      Streaming: 1
      Listening: 2
      Watching: 3
      Competing: 5
          
      Want a changing status? Just change line 56 to `status: obj[key].status` and insert your own status into each object below.
      Different statuses include "online", "idle", "dnd", and "invisible"
    */
    let obj = [
      {
        name: `Eat a mango`,
        type: 3,
        // status: ""
      },
      {
        name: `Impualsive`,
        type: 2,
        // status: ""
      },
    
    ];
    i = 0;
    setInterval(() => {
      for (const key of Object.keys(obj)) {
        client.user.setPresence({
          activities: [
            {
              name: `${obj[key].name}`,
              type: obj[key].type,
            },
          ],
          status: "idle",
        });
      }
    }, 3000);

  },
};
