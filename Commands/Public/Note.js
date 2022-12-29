const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("note")
    .setDescription("Create yourself a Note.")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setTitle("Create a Note")
      .setCustomId("note_modal")

    const NoteTitleModal = new TextInputBuilder()
      .setLabel("What's your Note Title gonna be?")
      .setCustomId("notetitlemodal")
      .setPlaceholder("Set a Note Title.")
      .setRequired(true)
      .setStyle(TextInputStyle.Short)
      .setMinLength(1);

    const NoteTextModal = new TextInputBuilder()
      .setLabel("What do you want to Note?")
      .setCustomId("notetextmodal")
      .setPlaceholder("Leave your note here...")
      .setRequired(true)
      .setMinLength(1)
      .setStyle(TextInputStyle.Short);

    const actionrow1 = new ActionRowBuilder().addComponents(NoteTitleModal);
    const actionrow2 = new ActionRowBuilder().addComponents(NoteTextModal);

    modal.addComponents(actionrow1, actionrow2);

    interaction.showModal(modal);
  },
};
