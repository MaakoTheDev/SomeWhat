const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
} = require("discord.js");
const DB = require("../../Structures/models/NoteDB");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("note-remove")
    .setDescription("Remove a note from your To-Do-List.")
    .addStringOption((option) =>
      option
        .setName("note-id")
        .setDescription("Provide the id of the note you want to remove.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const user = interaction.user;
    const noteId = interaction.options.getString("note-id");
    const data = await DB.findById(noteId);
    const userDB = await DB.findOne({
      UserID: user.id,
    });
    
    if (!userDB)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              "<:No:1040517021772828683> **Error:** <:No:1040517021772828683>\n **This note doesn't belong to you.**"
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    const error = new EmbedBuilder()
      .setDescription(
        `<:No:1040517021772828683> **Error:** <:No:1040517021772828683>\n **No Notes matching with \`${noteId}\` in my database.**`
      )
      .setColor("Red");

    // if (!data) return await interaction.reply({ embeds: [error], ephemeral: true });
    if (!data) {
      await interaction.reply({ embeds: [error], ephemeral: true });
    }
    data.delete();

      const success = new EmbedBuilder()
      .setTitle("Note Removed")
      .setColor("50C878")
      .setDescription(
        `<:Yes:1040517019147182121> **Sucessfully Removed A Note**\n**NoteID:** ${noteId}`
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [success],
      ephemeral: true,
    });
  },
};
