const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '~';
function hook(channel, title, message, color, avatar) {
    

        if (!channel) return console.log('Channel not specified.');
        if (!title) return console.log('Title not specified.');
        if (!message) return console.log('Message not specified.');
        if (!color) color = 'FF00FF'; 
        if (!avatar) avatar = 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png'
    

        color = color.replace(/\s/g, '');
        avatar = avatar.replace(/\s/g, '');
    

        channel.fetchWebhooks()
            .then(webhook => {
    

                let foundHook = webhook.find('name', 'Webhook'); 
    

                if (!foundHook) {
                    channel.createWebhook('Webhook', 'https://media.discordapp.net/attachments/257366018257715210/385441473333559317/10372895_698717463574912_8519512084436252101_o.jpg?width=484&height=484') // Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
                        .then(webhook => {

                            webhook.send('', {
                                "username": title,
                                "avatarURL": avatar,
                                "embeds": [{
                                    "color": parseInt(`0x${color}`),
                                    "description":message,
                                }]
                            })
                                .catch(error => { 
                                    console.log(error);
                                    return channel.send('**There was a problem sending the message. Please check back or ask the youth Cen.**');
                                })
                        })
                } else {
                    foundHook.send('', { 
                        "username": title,
                        "avatarURL": avatar,
                        "embeds": [{
                            "color": parseInt(`0x${color}`),
                            "description":message
                        }]
                    })
                        .catch(error => { 
                            console.log(error);
                            return channel.send('**There was a problem sending the message. Please check back or ask the youth Cen.**');
                        })
                    }
    
            })
    
    }
    

    bot.on('message', message => {
    

        let msg = message.content.toUpperCase();
        let sender = message.author; 
        let cont = message.content.slice(prefix.length).split(" "); 
        let args = cont.slice(1); 
    

    

        if (msg === prefix + 'PING') {
    

            message.channel.send('Ping!');
    
        }
    

        if (msg.startsWith(prefix + 'PURGE')) { 

            async function purge() {
                message.delete();
             
                if (!message.member.roles.find("name", "commander")) { 
                    message.channel.send('You need the \`commander\` role to use this command.'); 
                    return; 
                }
    

                if (isNaN(args[0])) {
                  
                    message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); 
                  
                    return;
                }
    
                const fetched = await message.channel.fetchMessages({limit: args[0]}); 
                console.log(fetched.size + ' messages found, deleting...'); 
                    message.channel.bulkDelete(fetched)
                    .catch(error => message.channel.send(`Error: ${error}`)); 
            }
    

            purge();
    
        }
    

        if (msg.startsWith(prefix + 'HOOK')) { 
    

            message.delete();
    
            if (msg === prefix + 'HOOK') { 
                return hook(message.channel, 'Hook Usage', `${prefix}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<> is required\n[] is optional**`,'#FF00FF','https://media.discordapp.net/attachments/257366018257715210/385441473333559317/10372895_698717463574912_8519512084436252101_o.jpg?width=484&height=484')
            }
    
            let hookArgs = message.content.slice(prefix.length + 4).split(","); 
    
            hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]); 
        }
    
    });
    bot.on('ready', () => {
        

            console.log('Bot started.');
        
        });
        
        bot.login(process.env.BOT_TOKEN);
