const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
} = require("discord.js");
const NoteSchema = require("../../Structures/models/NoteDB");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("to-do-list")
    .setDescription("Manage your To-Do-List.")
    .addIntegerOption((option) => 
    option
    .setName('page')
    .setDescription("The page to display if there are more than 1")
    .setMinValue(2)
    .setMaxValue(20)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const user = interaction.user;
    const page = interaction.options.getInteger("page");

    const noteData = await NoteSchema.find({
      UserID: user.id
    });

    if (!noteData?.length)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`\\📛 **Error:** \\📛\n **Your don't have any notes.**`)
            .setColor("Red")
            .setFooter({
              text: 'Run the command /note to make a note!',
              iconURL: client.user.displayAvatarURL()
            }),
        ],
        ephemeral: true 
      });

    const embed = new EmbedBuilder()
      .setAuthor({
        name: 'Your Notes!',
        iconURL: user.displayAvatarURL()
      })
      .setThumbnail(user.displayAvatarURL())
      .setColor("#2f3136");

    // if the user selected a page
    if (page) {
      const pageNum = 5 * page - 5;

      if (noteData.length >= 6) {
        embed.setFooter({
          text: `page ${page} of ${Math.ceil(noteData.length / 5)}`,
        });
      }

      for (const notes of noteData.splice(pageNum, 5)) {

        embed.addFields({
          name: `<:BurpleDot:1040501683354087515> ${notes.NoteID}`,
          value: `**Note:** ${notes.Note}\n**NoteID**: ${notes._id}`,
        });
      }

      return await interaction.reply({ embeds: [embed], ephemeral: true  });
    }

    // if the user did not select a page
    if (noteData.length >= 6) {
      embed.setFooter({
        text: `page 1 of ${Math.ceil(noteData.length / 5)}`,
      });
    }

    for (const notes of noteData.slice(0, 5)) {

      embed.addFields({
        name: `<:BurpleDot:1040501683354087515> ${notes.NoteID}`,
        value: `**Note:** ${notes.Note}\n**NoteID**: ${notes._id}`,
      });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true  });
  },
};
