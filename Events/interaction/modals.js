const { Client, EmbedBuilder } = require("discord.js");
const NoteSchema = require("../../Structures/models/NoteDB");
const { Types } = require("mongoose");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "note_modal") {

      const { user, channel } = interaction;

      const NoteSID = interaction.fields.getTextInputValue("notetitlemodal");
      const NoteS = interaction.fields.getTextInputValue("notetextmodal");

      const NoteDB = new NoteSchema({
        _id: Types.ObjectId(),
        NoteID: NoteSID,
        Note: NoteS,
        UserID: interaction.user.id,
      });

      NoteDB.save().then(console.log);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: user.tag,
          iconURL: user.displayAvatarURL(),
        })
        .setColor("2f3136")
        .addFields({
          name: NoteDB.NoteID,
          value: `**Note:** ${NoteDB.Note}\n**NoteID:** ${NoteDB._id}`,
        })
        .setFooter({
          text: "The Note Has Been Saved",
        });

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(
              "<:Yes:1040517019147182121> **Your note has been Saved. Check Your DM's**"
            ),
        ],
      });
      interaction.user.send({ embeds: [embed] }).catch(async (err) => {
        console.log(err);
        await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor("50C878")
              .setAuthor({
                name: user.tag,
                iconURL: user.displayAvatarURL(),
              })
              .setDescription(
                "<:Yes:1040517019147182121> **Your Note has been saved.**"
              )
              .setFooter({
                text: "Your DM's are Closed!?",
                iconURL: user.displayAvatarURL(),
              })
              .setTimestamp(),
          ],
        });
      });
    }
  },
};
