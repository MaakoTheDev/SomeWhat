const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    Client,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Invite me to your Server!")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    execute(interaction, client) {
        interaction.reply({ content: `**Invite Me!**`, components: [ new ActionRowBuilder().setComponents(
            new ButtonBuilder()
            .setLabel('Invite')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1039140375950020669&permissions=387136&scope=applications.commands%20bot')
        )]})
    }
};