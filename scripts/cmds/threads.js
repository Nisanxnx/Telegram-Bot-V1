module.exports.config = {
    name: "threads",
    aliases: ["thread"],
    version: "1.0",
    credits: "Dipto",
    role: 3, // Only admin
    usePrefix: true,
    description: "Manage threads in the bot",
    commandCategory: "admin",
    guide: "/threads -f|find id <thread_id> | /threads update id <thread_id> <update_data> | /threads delete id <thread_id>",
    coolDowns: 5,
    premium: false
};

module.exports.run = async ({ Threads:threads, message, args }) => {
    const [action, searchType, identifier, ...updateData] = args;

    try {
        switch (`${action} ${searchType}`) {
            case '-f id':
            case 'find id': {
                const thread = await threads.getThread(identifier);
                if (!thread) return message.reply('𝐓𝐡𝐫𝐞𝐚𝐝 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝.');

                const threadInfo = `
╭──✦ [ 𝐓𝐡𝐫𝐞𝐚𝐝 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 ]
├‣ 🆔 𝚃𝚑𝚛𝚎𝚊𝚍 𝙸𝙳: ${thread.threadId}
├‣ 📜 𝚃𝚒𝚝𝚕𝚎: ${thread.title || 'No title'}
├‣ 🖼️ 𝙸𝚖𝚊𝚐𝚎 𝚄𝚁𝙻: ${thread.threadImage || 'No image available'}
├‣ 🧑‍💼 𝙰𝚍𝚖𝚒𝚗𝚜 𝙲𝚘𝚞𝚗𝚝: ${thread.threadAdmins.length || 0}
├‣ 👥 𝙼𝚎𝚖𝚋𝚎𝚛𝚜 𝙲𝚘𝚞𝚗𝚝: ${thread.members.length || 0}
├‣ 🔧 𝚂𝚎𝚝𝚝𝚒𝚗𝚐𝚜: ${JSON.stringify(thread.settings) || 'No settings'}
╰‣ 🎮 𝙶𝚊𝚖𝚎𝚜: ${JSON.stringify(thread.games) || 'No games available'}`;

                message.reply(threadInfo);
                break;
            }

            case 'update id': {
                const updateObj = JSON.parse(updateData.join(' ')); // Ensure the input is valid JSON
                const updatedThread = await threads.updateThread(identifier, updateObj);
                message.reply(updatedThread ? '𝚃𝚑𝚛𝚎𝚊𝚍 𝚞𝚙𝚍𝚊𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢.' : '𝚃𝚑𝚛𝚎𝚊𝚍 𝚞𝚙𝚍𝚊𝚝𝚎 𝚏𝚊𝚒𝚕𝚎𝚍.');
                break;
            }

            case 'delete id': {
                await threads.deleteThread(identifier);
                message.reply('𝚃𝚑𝚛𝚎𝚊𝚍 𝚍𝚎𝚕𝚎𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢.');
                break;
            }

            default:
                message.reply('𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚌𝚘𝚖𝚖𝚊𝚗𝚍. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚌𝚑𝚎𝚌𝚔 𝚝𝚑𝚎 𝚐𝚞𝚒𝚍𝚎.');
                break;
        }
    } catch (error) {
        message.reply(`❌ | 𝙴𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍: ${error.message}`);
    }
};
