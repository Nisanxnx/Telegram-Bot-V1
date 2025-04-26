module.exports.config = {
  name: "admin",
  aliases: [],
  version: "1.0.0",
  role: 0,
  author: "dipto",
  description: "Display information about the bot admins and group admins.",
  usePrefix: true,
  guide: "{p}",
  category: "Admin",
  countDown: 5,
};

module.exports.onStart = async ({ message, event, api, usersData, args }) => {
  try {
    const adminBotIds = global.functions.config.adminBot || [];
    const botOperatorIds = global.functions.config.botOperator || [];
    const chatId = event.chat.id;

    // Define adminInfo at the start to use in both conditions
    let adminInfo = "╭──────────────────╮\n✨**𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧𝐬 & 𝐎𝐩𝐞𝐫𝐚𝐭𝐨𝐫𝐬🍀:**\n╰──────────────────╯";

    // If no arguments are passed, show bot admins and operators
    if (!args[0]) {
      if (adminBotIds.length) {
        adminInfo += `\n✨𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧𝐬♡:**\n`;
        for (const adminId of adminBotIds) {
          const name = await usersData.getName(adminId);
          adminInfo += `- **𝐍𝐚𝐦𝐞:** ♡${name}♡\n  ◉𝐈𝐃:** ${adminId}\n`;
        }
      } else {
        adminInfo += "\n- 𝐍𝐨 𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧𝐬 𝐅𝐨𝐮𝐧𝐝.\n";
      }

      if (botOperatorIds.length) {
        adminInfo += `╭──────────────────╮\n𝄞𝐁𝐨𝐭 𝐎𝐩𝐞𝐫𝐚𝐭𝐨𝐫𝐬𝄞:**\n╰──────────────────╯`;
        for (const operatorId of botOperatorIds) {
          const name = await usersData.getName(operatorId);
          adminInfo += `𖤛 𝐍𝐚𝐦𝐞:** ⊰${name}⊱\n  ❇𝐈𝐃:** ${operatorId}\n`;
        }
      } else {
        adminInfo += "\n- 𝐍𝐨 𝐁𝐨𝐭 𝐎𝐩𝐞𝐫𝐚𝐭𝐨𝐫𝐬 𝐅𝐨𝐮𝐧𝐝.\n";
      }
    }

    // If arguments are provided, show group admins
    if (args[0]) {
      const chatAdmins = await api.getChatAdministrators(chatId);
      if (chatAdmins.length) {
        adminInfo += `╭──────────────────╮\n☆ 𝐆𝐫𝐨𝐮𝐩 𝐀𝐝𝐦𝐢𝐧𝐬 ☆:**\n╰──────────────────╯`;
        for (const admin of chatAdmins) {
          const name = admin.user.username || admin.user.first_name || "Unknown";
          const adminId = admin.user.id;
          adminInfo += `⊰𝐍𝐚𝐦𝐞⊱:** ᥬ${name}​᭄\n  ♡𝐈𝐃♡:** ${adminId}\n`;
        }
      } else {
        adminInfo += "\n- 𝐍𝐨 𝐆𝐫𝐨𝐮𝐩 𝐀𝐝𝐦𝐢𝐧𝐬 𝐅𝐨𝐮𝐧𝐝 𝐎𝐫 𝐓𝐡𝐢𝐬 𝐈𝐬 𝐍𝐨𝐭 𝐚 𝐆𝐫𝐨𝐮𝐩 𝐂𝐡𝐚𝐭.\n";
      }
    }

    // Reply with the collected admin information
    await message.reply(adminInfo);

  } catch (error) {
    console.log(` 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚐𝚎𝚝 𝚊𝚍𝚖𝚒𝚗 𝚒𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗: ${error.message}`);
    await message.reply(`Error: ${error.message}`);
  }
};
