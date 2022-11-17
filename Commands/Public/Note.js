const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");
const NoteSchema = require("../../Structures/Models/NoteDB");
const { Types } = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("note")
    .setDescription("Make a note.")
    .addStringOption((option) =>
      option
        .setName("note-title")
        .setDescription("Set a title for the Note your making.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("note")
        .setDescription("Set a note for your self")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const NoteS = interaction.options.getString("note");
    const NoteSID = interaction.options.getString("note-title");
    const user = interaction.user;

    const NoteDB = new NoteSchema({
      _id: Types.ObjectId(),
      NoteID: NoteSID,
      Note: NoteS,
      UserID: user.id,
    });

    NoteDB.save().then(console.log);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL(),
      })
      .setColor("2f3136")
      .addFields(
        { name: NoteDB.NoteID, value: `**Note:** ${NoteDB.Note}\n**NoteID:** ${NoteDB._id}` },
        )
      .setFooter({
        text: "The Note Has Been Saved",
      });

    const embed2 = new EmbedBuilder()
      .setColor("50C878")
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL()
      })
      .setDescription("<:Yes:1040517019147182121> **Check Your DM's.**")
      .setTimestamp()

    
    interaction.reply({ embeds: [embed2], ephemeral: true });
    user.send({ embeds: [embed] })
    .catch(async (err) => {
      console.log(err);
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
          .setColor("50C878")
          .setAuthor({
            name: user.tag,
            iconURL: user.displayAvatarURL()
          })
          .setDescription("<:Yes:1040517019147182121> **Your Note has been saved.**")
          .setFooter({
            text: "Your DM's are Closed!?",
            iconURL: user.displayAvatarURL()
          })
          .setTimestamp()
        ]
      })
    })
  },
};
