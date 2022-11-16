const {
    EmbedBuilder,
    CommandInteraction,
    Client,
    SlashCommandBuilder,
    ChannelType,
    PermissionFlagsBits
} = require("discord.js");
var os = require('os')


module.exports = {
    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Information about the Bot.")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    execute(interaction, client) {
        const totalram = ((os.totalmem() / 10**6 + " ").split('.')[0]);
        const freeram = ((os.freemem() / 10**6 + " ").split('.')[0]);
        const usedram = (((os.totalmem() - os.freemem()) / 10**6 + " ").split('.')[0]);
        const prctfreeram = (((os.freemem() * 100) / os.totalmem + " ").split('.')[0]);
    
        const Info = new EmbedBuilder()
        .setColor('2f3136')
        .setAuthor({
          name: `${client.user.tag} - Status`,
          iconURL: client.user.displayAvatarURL() || 'https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg'
        })
        .setDescription(`
        __**General**__
        **Bot Name**: ${client.user.username}
        **Bot ID**: ${client.user.id}
        **Bot Created On**: <t:${parseInt(client.user.createdTimestamp / 1000)}:D>
        **Bot Owner**: <@!812578208188596285>
        __**Statistic**__
        **Ping**: ${client.ws.ping}ms
        **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:D>
        **Library**: [DiscordJS v14.3.0](https://discord.js.org/#/)
        **Commands Loaded**: ${client.commands.size}
        **User Count**: ${client.users.cache.size}
        **Guild Count**: ${client.guilds.cache.size}
        **Text Channels**: ${client.channels.cache.filter((c) => c.type === ChannelType.GuildText).size}
        **Voice Channels**: ${client.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size}
        __**System Information**__
        **Total Memory**: ${totalram}MB
        **Used Memory**: ${usedram}MB
        **Free Memory**: ${freeram}MB / ${prctfreeram}% Free
        `)

        interaction.reply({embeds: [Info]})
    }
};
