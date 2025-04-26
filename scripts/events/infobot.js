module.exports = {
    onChat: async ({ bot, msg }) => {
        if (msg.new_chat_member && msg.new_chat_member.id === bot.id) {
            const infoMessage = `Hello, DEAR !\n╭━━━━━━ [ I'm ${bot.username} ] ━━━━━━╮\n\n, the bot. How can I assist you today?`;
            bot.sendMessage(msg.chat.id, infoMessage);
        }
    }
};
