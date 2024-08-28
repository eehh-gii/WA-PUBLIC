/*
Bot WhatsApp Public
Library By WhatsApp-Web.js
Build By :
    -IGoyyy
    -AgungNur.y
**/
const qrcode = require('qrcode-terminal');
const speed = require('performance-now');
const moment = require("moment-timezone");
const util = require('util');
const NodeCache = require("node-cache");
const { handleCmd } = require('./commands');
//const { selfbot } = require("./selfbot")
const { exec, spawn, execSync } = require("child_process");
const fs = require("fs");
const { Client, LegacySessionAuth, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: /*[ '--no-sandbox', '--disable-setuid-sandbox' ], */ [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ],
    ignoreDefaultArgs: ['--disable-extensions'],
    //executablePath: '/usr/bin/chromium-browser', // sesuain sama hosting, make linux apa windows
    executablePath: '/usr/bin/chromium-browser',
  },
    authStrategy: new LocalAuth()
  });
moment.tz.setDefault('Asia/Jakarta').locale("id")
let prefix = '!'


// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    console.log(session);
});

client.initialize();

client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
})

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
  // Fired if session restore was unsuccessful
  console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log("WhatsApp client is ready to receive messages");
});

client.on('message', async (msg) => {
    await handleCmd(client, msg);
});

//client.on('message_create', async (msg) => {
//    selfbot(client, msg);
//});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

client.on('group_join', async (notification) => {
    console.log('join', notification);
    const user = notification.id.participant
    const group = await client.getChatById(notification.chatId)
    let ret = "*「 NOTIFICATION JOIN 」*\n";
        ret += `\nUser: @${user.split('@')[0]}`;
        ret += "\nGroup: "+group.name
    let pic = await client.getProfilePicUrl(user)
    try {
        let media = await MessageMedia.fromUrl(pic)
        client.sendMessage(notification.chatId, media,{caption: ret, mentions: [user]})
    } catch(err) {
        let url = "https://telegra.ph/file/d132c053c76d971408cc1.jpg"
        let pict = await MessageMedia.fromUrl(url)
        client.sendMessage(notification.chatId, pict,{caption: ret, mentions: [user]})
    }
    // notification.reply('User joined.');
});

client.on('group_leave', async (notification) => {
    console.log('leave', notification);
    const user = notification.id.participant
    const group = await client.getChatById(notification.chatId)
    let ret = "*「 NOTIFICATION LEAVE 」*\n";
        ret += `\nUser: @${user.split('@')[0]}`;
        ret += "\nGroup: "+group.name
    let pic = await client.getProfilePicUrl(user)
    try {
        let media = await MessageMedia.fromUrl(pic)
        client.sendMessage(notification.chatId, media,{caption: ret, mentions: [user]})
    } catch(err) {
        let url = "https://telegra.ph/file/d132c053c76d971408cc1.jpg"
        let pict = await MessageMedia.fromUrl(url)
        client.sendMessage(notification.chatId, pict,{caption: ret, mentions: [user]})
    }
});

client.on('group_update', (notification) => {
    // Group picture, subject or description has been updated.
    console.log('update', notification);
});

client.on('change_state', state => {
    console.log('CHANGE STATE', state);
});

client.on('group_admin_changed', (notification) => {
    if (notification.type === 'promote') {
        /** 
          * Emitted when a current user is promoted to an admin.
          * {@link notification.author} is a user who performs the action of promoting/demoting the current user.
          */
        console.log(notification)
        console.log(`You were promoted by ${notification.author}`);
    } else if (notification.type === 'demote')
        /** Emitted when a current user is demoted to a regular user. */
        console.log(notification)
        console.log(`You were demoted by ${notification.author}`);
});


client.on('call', async (call) => {
    const fs = require("fs")
    const setting = JSON.parse(fs.readFileSync('./settings.json'))
// Change to false if you don't want to reject incoming calls
    let rejectCalls = setting.callblock.status;
    console.log('Call received, rejecting. GOTO Line 261 to disable', call);
    if (rejectCalls) await call.reject();
    await client.sendMessage(call.from, `[${call.fromMe ? 'Outgoing' : 'Incoming'}] Phone call from ${call.from}, type ${call.isGroup ? 'group' : ''} ${call.isVideo ? 'video' : 'audio'} call. ${rejectCalls ? 'This call was automatically rejected by the script.' : ''}`);
});

client.on('group_membership_request', async (notification) => {
    /**
     * The example of the {@link notification} output:
     * {
     *     id: {
     *         fromMe: false,
     *         remote: 'groupId@g.us',
     *         id: '123123123132132132',
     *         participant: 'number@c.us',
     *         _serialized: 'false_groupId@g.us_123123123132132132_number@c.us'
     *     },
     *     body: '',
     *     type: 'created_membership_requests',
     *     timestamp: 1694456538,
     *     chatId: 'groupId@g.us',
     *     author: 'number@c.us',
     *     recipientIds: []
     * }
     *
     */
    console.log(notification);
    /** You can approve or reject the newly appeared membership request: */

});

client.on('message_reaction', async (reaction) => {
    console.log('REACTION RECEIVED', reaction);
});

let file =require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update file ${__filename}`)
    delete require.cache[file]
    require(file)
})
