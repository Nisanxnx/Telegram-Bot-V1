module.exports = {
    onChat: async ({ bot, msg }) => {
        if (msg.new_chat_members) {
            const newMembers = msg.new_chat_members.map(member => member.first_name).join(', ');
            const chatName = msg.chat.title || 'this group';
            const welcomeMessage = `𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐃𝐄𝐀𝐑: \n╭──────────────────╮\n ✨ ${newMembers}🍀\n╰──────────────────╯ to\n ⑅⃝»̶̶͓͓͓̽̽̽»̶̶͓͓͓̽̽̽๓ ${chatName}ꕀ⃘⃜⃟ؖؖؖؖؖؖؖؖؖꙮ͌͌͌͌͌͌͌͌͌͌͌͌͌͌ꔹ⃟ꔹ⃟!`;

            bot.sendMessage(msg.chat.id, welcomeMessage);
        }
    }
};
