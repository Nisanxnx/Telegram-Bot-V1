module.exports = {
    onChat: async ({ bot, msg }) => {
        if (msg.left_chat_member) {
            const leftMember = msg.left_chat_member.first_name;
            const chatName = msg.chat.title || 'this group';
            const leaveMessage = `╭━━━━━━━━━━━━━━━━━━━━━━╮\n${leftMember}\n╰━━━━━━━━━━━━━━━━━━━━━━╯ has left from our ${chatName}.`;

            bot.sendMessage(msg.chat.id, leaveMessage);
        }
    }
};

