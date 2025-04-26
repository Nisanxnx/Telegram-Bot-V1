const moment = require('moment-timezone');

module.exports = {
    config: {
        name: "info",
        version: "1.0",
        countDown: 20,
        role: 0,
        author: "dipto",
        description: "Owner information",
        category: "owner",
        guide: "{p}"
    },
  onStart: async ({ api, message ,event }) => {
        try {
            const botName = "𝐋𝐈𝐒𝐀 𝐁𝐁𝐘";
            const botPrefix = "/";
            const authorName = "亗ㅤ𝐍𝐈𝐒𝐀𝐍ㅤ亗";
            const ownAge = "𝟏𝟗";
            const teamName = "𝐍𝐨𝐨𝐛𝐬 𝐭𝐞𝐚𝐦";
      const authorFB = "https://m.me/shamsuddin.munna.2025";
          const authorInsta = "@nisan_editz198";
  const link = "https://i.imgur.com/hDTLa1z.jpeg";
        const now = moment().tz('Asia/Dhaka');
      const date = now.format('MMMM Do YYYY');
          const time = now.format('h:mm:ss A');
            const uptime = process.uptime();
      const seconds = Math.floor(uptime % 60);
const minutes = Math.floor((uptime / 60) % 60);
const hours = Math.floor((uptime / (60 * 60)) % 24);
const days = Math.floor(uptime / (60 * 60 * 24));
const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
            const buttons = {
                inline_keyboard: [
                    [
        { text: "Facebook", url: authorFB },
  { text: "Instagram", url: `https://t.me/${authorInsta}` }
                    ]
                ]
            };

            const caption = `╭──────────────────╮\n
 ✨𝘽𝙤𝙩 & 𝙊𝙬𝙣𝙚𝙧 𝙄𝙣𝙛𝙤🍀\n╰──────────────────╯\n╭────────────◊\n
├‣ 𝙱𝚘𝚝 𝙽𝚊𝚖𝚎: ${botName}
├‣ 𝙱𝚘𝚝 𝙿𝚛𝚎𝚏𝚒𝚡: ${botPrefix}
├‣ 𝙾𝚠𝚗𝚎𝚛: ${authorName}
├‣ 𝙰𝚐𝚎: ${ownAge}
├‣ 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔: ${authorFB}
├‣ 𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖: ${authorInsta}
├‣ 𝙳𝚊𝚝𝚎: ${date}
├‣ 𝚃𝚒𝚖𝚎: ${time}
├‣ 𝚃𝚎𝚊𝚖: ${teamName}
├‣ 𝚄𝚙𝚝𝚒𝚖𝚎: ${uptimeString}\n╰────────────◊`;

            const hh = await api.sendPhoto(event.chat.id ,link, {caption: caption, reply_markup: buttons });
            setTimeout(() => {
             message.unsend(hh.message_id);
            }, 40000);
        } catch (error) {
            console.error("Error reading config file:", error);
        }
    },
    onChat: async function ({ event, message }) {
        if (event.body?.toLowerCase() === "info" || event.body?.toLowerCase() === "owner") {
            this.onStart({ message });
        }
    }
};
