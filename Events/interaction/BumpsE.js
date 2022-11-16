const { CommandInteraction, EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    if(interaction.isChatInputCommand) {
        if(interaction.commandName === 'commadname') {
            await interaction.reply({content: 'This is a event!'})
        } 
    }
  }
}