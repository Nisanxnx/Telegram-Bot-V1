const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "help",
    version: "1.0",
    author: "Dipto",
    role: 0,
    usePrefix: true,
    description: "List all commands",
    commandCategory: "system",
    guide: "{p}help",
    coolDowns: 5,
    premium: false
};

module.exports.run = async ({ event, args, message, threadsData }) => {
    const commandFiles = fs.readdirSync(path.join(__dirname, '..', 'cmds')).filter(file => file.endsWith('.js'));
    const config = require('../../config.json');
    const thread = await threadsData.getThread(event.chat.id);
    const prefix = thread?.prefix || '!';
    let categories = {};
    let totalCommands = 0;
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, '..', 'cmds', file));
        if (command.config) {
            const category = command.config.commandCategory || command.config.category || 'OTHER';
            if (!categories[category]) categories[category] = [];
            categories[category].push(command.config);
            totalCommands++;
        }
    }
    if (args[0]) {
        if (args[0] === '-s' && args[1]) {
            const searchLetter = args[1].toLowerCase();
            const matchingCommands = Object.values(categories).flat().filter(cmd => cmd.name.startsWith(searchLetter));
            if (matchingCommands.length === 0) {
                return message.reply(`𝙽𝚘 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜 𝚏𝚘𝚞𝚗𝚍 𝚜𝚝𝚊𝚛𝚝𝚒𝚗𝚐 𝚠𝚒𝚝𝚑 '${searchLetter}'.`);
            }

            let searchMessage = `✨ [ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐒𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐰𝐢𝐭𝐡 '${searchLetter.toUpperCase()}' ] ✨\n\n`;
            matchingCommands.forEach(cmd => (searchMessage += `✧ ${cmd.name}\n`));
            return message.reply(searchMessage);
        }

        const commandName = args[0].toLowerCase();
        const command = Object.values(categories).flat().find(cmd => cmd.name === commandName || cmd.aliases?.includes(commandName));

        if (!command) {
            return message.reply('𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝.');
        }

        let guide = command?.guide || command?.usages || '𝙽𝚘 𝚞𝚜𝚊𝚐𝚎 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎';
        guide = guide.replace(/{pn}|{pm}|{p}|{prefix}|{name}/g, prefix + command?.name);

        if (args[1] === '-u') {
            const usageMessage = `📝 𝚄𝚜𝚊𝚐𝚎 𝚏𝚘𝚛 ${command.name}: ${guide}`;
            return message.reply(usageMessage);
        }

        if (args[1] === '-a') {
            const aliasesMessage = `🪶 [ 𝐀𝐥𝐢𝐚𝐬𝐞𝐬 𝐟𝐨𝐫 ${command.name} ]: ${command.aliases ? command.aliases.join(', ') : 'None'}`;
            return message.reply(aliasesMessage);
        }

        let commandInfo = `
╭──✦ [ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝: ${command.name.toUpperCase()} ]
├‣ 📜 𝐍𝐚𝐦𝐞: ${command.name}
├‣ 👤 𝐂𝐫𝐞𝐝𝐢𝐭𝐬: ${command?.credits || command?.author || 'Unknown'}
├‣ 🔑 𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧: ${command.role === 0 ? 'Everyone' : 'Admin'}
├‣ 🪶 𝐀𝐥𝐢𝐚𝐬𝐞𝐬: ${command.aliases ? command.aliases.join(', ') : 'None'}
├‣ 📜 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: ${command.description || 'No description'}
├‣ 📚 𝐆𝐮𝐢𝐝𝐞: ${guide}
├‣ 🚩 𝐏𝐫𝐞𝐟𝐢𝐱 𝐑𝐞𝐪𝐮𝐢𝐫𝐞𝐝: ${command.prefix || command.usePrefix ? 'Yes' : 'No'}
├‣ ⚜️ 𝐏𝐫𝐞𝐦𝐢𝐮𝐦: ${command.premium ? 'Yes' : 'No'}
╰───────────────◊`;

        return message.reply(commandInfo);
    }
  // const categoriesPerPage = 10;
  const page = parseInt(args[0], 10) || 1;
    const categoryKeys = Object.keys(categories);
    const totalPages = 1; //Math.ceil(categoryKeys.length / categoriesPerPage);

   // if (isNaN(page) || page < 1 || page > totalPages) {
       // return message.reply(`Please provide a valid page number (1-${totalPages}).`);
  //  }

  //  const startIndex = (page - 1) * categoriesPerPage;
   // const endIndex = startIndex + categoriesPerPage;
 //   const paginatedCategories = categoryKeys.slice(startIndex, endIndex);

   // if (paginatedCategories.length === 0) {
    //    return message.reply(`Page ${page} is empty. Please enter a valid page number.`);
   // }

    let helpMessage = `✨ [ 𝐆𝐮𝐢𝐝𝐞 𝐅𝐨𝐫 𝐁𝐞𝐠𝐢𝐧𝐧𝐞𝐫𝐬 - 𝐏𝐚𝐠𝐞 ${page} ] ✨\n\n`;

    for (const category of categoryKeys) {
        helpMessage += `╭━━━━━━ [ ${category.toUpperCase()}  ] ━━━━━━╮\n`;
        helpMessage += `│ ♡${categories[category].map(cmd => cmd.name).join(' ♡ ')}|\n`;
        helpMessage += `╰━━━━━━━━━━━━━━━━━━━━━━╯\n`;
    }

    helpMessage += `\n╭━━━━━━『 ${config.botName.toUpperCase()} 𝙱𝙾𝚃 』━━━━━━╮\n╭────────────◊\n├‣ 𝚃𝚘𝚝𝚊𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜: ${totalCommands}\n├‣ 𝙿𝚊𝚐𝚎 ${page} 𝚘𝚏 ${totalPages}\n├‣ 𝐀 𝐩𝐞𝐫𝐬𝐨𝐧𝐚𝐥 𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 𝐛𝐨𝐭 ✨\n├‣ 𝙰𝙳𝙼𝙸𝙽: ${config.adminName}\n╰────────────◊\n`;

    return message.reply(helpMessage);
};
