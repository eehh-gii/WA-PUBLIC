/**
 * Create By Excellent Team Bot
 * Library By Whatsapp-Web.js
 * Copyright 2024 - Excellent Team Bot
 */

const util = require('util');
const requests = require('node-fetch')
const axios = require('axios');
const moment = require('moment');
const speed = require('performance-now');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const { exec, spawn, execSync } = require("child_process");
const { 
    Base,
    BusinessContact,
    Chat,
    ClientInfo,
    Contact,
    GroupChat,
    Location,
    Message,
    MessageMedia,
    PrivateChat,
    PrivateContact,
    GroupNotification,
    Label,
    Order,
    Product,
    Call,
    Buttons,
    List,
    Payment,
    Reaction,
    Poll,
    PollVote
} = require('whatsapp-web.js');
const {
    StrikeStyle,
    UnderlineStyle,
    OverlineStyle,
    Strikethrough,
    Underline,
    Overline,
    BoldMan,
    BoldSans,
    ItalicSans,
    Cursive,
    Fraktur
} = require('./lib/textFancy');
const {
    sendReplyMessage,
    sendReplyMention,
    sendReplyImage,
    sendAllMedia,
    sendAudio,
    sendSticker,
    sendContact
} = require('./lib/Talk');
const { 
	chatOpenAi,
    facebookDownload,
    instagramProfile,
    instagramPost,
    instagramStory,
    tikTokProfile,
    tikTokDownload,
    pinterestDownload,
    pinterestSimilar,
    pinterestSearch,
    youTubeDownload,
    youTubeSearch,
    redTubeSearch,
    redTubeDownload,
    pornHubSearch,
    pornHubDownload,
    twitterProfile,
    twitterDownload,
    lineVoom,
    primaryToSecondary,
    bmkg,
    animeSearch,
    phraseSearch,
    randomName,
    shortLink
}  = require('./lib/ExcellentApi');

const Host1 = 'https://api.agatz.xyz/api/';
const Host = 'https://api.lolhuman.xyz/api/';
let prefix = setting.prefix;
let ApikeyLol = setting.apikey.lolhum;
let tmp_hit = []

async function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return new Promise((resolve) => {
        setTimeout(() => {
            const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
            resolve(randomInt);
        }, 0);
    });
}

async function command(text, key) {
    let pesan = text.toLowerCase();
    let cmd = [];
    if (pesan.startsWith(key)) {
        pesan = pesan.replace(key, '', 1).trim();
        if (text.includes("&")) {
            let los = pesan.split("&");
            for (let a of los) {
                let k = a.trim();
                cmd.push(k);
            }
        } else {
            cmd.push(pesan);
        }
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cmd);
        }, 0);
    });
}


function os_func() {
  this.execCommand = function (cmd) {
      return new Promise((resolve, reject) => {
          exec(cmd, (error, stdout, stderr) => {
              if (error) {
                  reject(error);
                  return;
              }
              resolve(stdout)
          });
      })
  }
}



async function handleCmd(client, msg) {
    console.log('MESSAGE RECEIVED', msg);

    try {
        const { getChatById, from, body, author, hasQuotedMsg, timestamp, type, mediaKey, hasMedia, id, fromMe, mentionedIds, groupMentions} = msg;
        const cmd = body && body.startsWith(prefix) ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : "";
        const isCmd = body && body.startsWith(prefix);
        const args = body ? body.trim().split(/ +/).slice(1) : [];
        const time = moment(timestamp * 1000).format("DD/MM/YY HH:mm:ss");
        const sender = author;
        const etb = client;
        const text = body
        const receiver = from;
        const _id = id;
        const related = hasQuotedMsg;
        const isMe = fromMe;
        const relatedMsg = _id._serialized
        const idBot = "6289506201218@c.us"
        const master = ["6289677455045@c.us","6285212169665@c.us"]
        const chat = await msg.getChat();
        const cmds = await command(body, prefix)
        const isMaster = master.includes(sender);
        const isGroup = chat.isGroup
        const nsfw = setting.nsfw.status == true
        if (isGroup && isCmd) console.log(`𓄵❑𓄳 ${time} 𓄵|${cmd}𓄳 from 𓄵|${msg._data.notifyName}𓄳 on 𓄵|${chat.name}𓄳`)
        if (!isGroup && isCmd) console.log(`𓄵❑𓄳 ${time} 𓄵|${cmd}𓄳 from 𓄵|${msg._data.notifyName}𓄳 on 𓄵|${chat.name}𓄳`)
    // MASTER COMMANDS
            if (cmd === "cek") {
                if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                if (related) {
                    const quoted = await msg.getQuotedMessage();
                    if (quoted.hasMedia) {
                        const attachmentData = await quoted.downloadMedia();
                        etb.sendMessage(receiver, attachmentData, { caption: 'Here\'s your requested media.' });
                    }
                }
            } if (cmd.startsWith("spam:")) {
                if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                try {
                    let sep = text.split(" ")
                    let rep = text.replace(sep[0]+" ","")
                    let no = rep.split("|")[0]+"@c.us"
                    let num = rep.split("|")[1]
                    let nama = rep.split("|")[2]
                    for (let i = 0;i <num; i++){
                        let gc = await etb.createGroup(nama,[no])
                        let group = await etb.getChatById(gc.gid._serialized)
                        group.leave()
                    }
                    let ret = `Success spam @${no} ${num} group`;
                    await chat.sendMessage(ret, {quotedMessageId:_id._serialized, mentions: [user]});
                } catch(error) {
                    etb.sendMessage(receiver, error, {quotedMessageId:_id._serialized})
                }
            } if (cmd.startsWith("spamgroup")) {
                if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                try {
                    const user = msg.mentionedIds[0]
                    let sep = text.split(" ")
                    let rep = text.replace(sep[0]+" ","")
                    let num = rep.split("|")[1]
                    let nama = rep.split("|")[2]
                    for (let i = 0;i <num; i++){
                        let gc = await etb.createGroup(nama,[user])
                        let group = await etb.getChatById(gc.gid._serialized)
                        group.leave()
                    }
                    let ret = `Success spam @${user.split('@')[0]} ${num} group`;
                    await chat.sendMessage(ret, {quotedMessageId:_id._serialized, mentions: [user]});
                } catch(error) {
                    etb.sendMessage(receiver, error, {quotedMessageId:_id._serialized})
                }
            } if (cmd.startsWith("autodownload")){
                if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                const sep = text.split(' ')
                const xtext = text.replace(sep[0] + " ", "")
                const cond = xtext.split(" ")
                let res = "╭──「 AUTO DOWNLOAD 」"
                res += (setting.autoDownload.status == true) ? "\n├ Status : Active" : "\n├ Status : Deactive";
                res += "\n├ Usage : "
                res += "\n│ • Autodownload <on/off>"
                res += "\n╰──「 ETB-TEAM 」"
                if (body.indexOf(' ') === -1) { 
                    etb.sendMessage(receiver, res, {quotedMessageId:_id._serialized})
                } else if (cond[0].toLowerCase() == "on") {
                    if (setting.autoDownload.status == true){
                        etb.sendMessage(receiver, "Auto download media already activated")
                    } else {
                        setting.autoDownload.status = true
                        fs.writeFileSync('./settings.json', JSON.stringify(setting, null, 2))
                        etb.sendMessage(receiver, "Auto download media has been activated")
                    }
                } else if (cond[0].toLowerCase() == "off") {
                    if (setting.autoDownload.status == false){
                    	etb.sendMessage(receiver, "Auto download media already deactivated")
                    } else {
                        setting.autoDownload.status = false
                        fs.writeFileSync('./settings.json', JSON.stringify(setting, null, 2))
                        etb.sendMessage(receiver, "Auto download media has been deactivated")
                    }
                }
            } if (cmd === "settings"){
                if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                    let mat = "*╭──「 SETTINGS 」*"
                    mat += "\n├ Respontag : "+setting.responder.tag.status
                    mat += "\n├ Responpm : "+setting.responder.pm.status
                    mat += "\n├ Welcome : "+setting.responder.welcome.status
                    mat += "\n├ Leave : "+setting.responder.leave.status
                    mat += "\n├ Autodownload : "+setting.autoDownload.status
                    mat += "\n├ Callblock : "+setting.callblock.status
                    mat += "\n├ Nsfw : "+setting.nsfw.status
                    mat += "\n├ Simi : "+setting.simi.status
                    mat += "\n├ ChatGpt : "+setting.chatgpt.status
                    mat += "\n├ Usage : "
                    mat += "\n│ • Respotag"
                    mat += "\n│ • Responpm"
                    mat += "\n│ • Welcome"
                    mat += "\n│ • Leave"
                    mat += "\n│ • Autodownload"
                    mat += "\n│ • Callblock"
                    mat += "\n│ • Nsfw"
                    mat += "\n╰──「 ETB-TEAM 」"
                    etb.sendMessage(receiver, mat, {quotedMessageId: _id._serialized})
            } else if (cmd.startsWith("callblock")) {
                if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                const sep = text.split(' ')
                const xtext = text.replace(sep[0] + " ", "")
                textt = xtext.toLowerCase()
                let res = "╭──「 NOTIF CALL 」"
                res += "\n├ Status : "
                res += "\n│ • Status : " +setting.callblock.status
                res += "\n├ Usage : "
                res += "\n│ • Callblock <on/off>"
                res += "\n╰──「 ETB-TEAM 」"
                if (body.indexOf(' ') === -1) { 
                    etb.sendMessage(receiver, res, {quotedMessageId:_id._serialized})
                } else if (textt == "on") {
                    if (setting.callblock.status == true){
                        etb.sendMessage(receiver, "Called Block already active")
                    } else {
                        setting.callblock.status = true
                        fs.writeFileSync('./settings.json', JSON.stringify(setting, null, 2))
                        etb.sendMessage(receiver, "Success activated Called Block")
                    }
                } else if (textt == "off") {
                    if (setting.callblock.status == false){
                        etb.sendMessage(receiver, "Called Block already deactive")
                    } else {
                        setting.callblock.status = false
                        fs.writeFileSync('./settings.json', JSON.stringify(setting, null, 2))
                        etb.sendMessage(receiver, "Success deactivated Called Block")
                    }
                }
            } else if (cmd.startsWith("simi")) {
                if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                const sep = text.split(' ')
                const xtext = text.replace(sep[0] + " ", "")
                textt = xtext.toLowerCase()
                let res = "╭──「 SIMI CHAT 」"
                res += "\n├ Status : "
                res += "\n│ • Status : " +setting.simi.status
                res += "\n├ Usage : "
                res += "\n│ • Simi <on/off>"
                res += "\n╰──「 ETB-TEAM 」"
                if (body.indexOf(' ') === -1) { 
                    etb.sendMessage(receiver, res, {quotedMessageId:_id._serialized})
                } else if (textt == "on") {
                    if (setting.simi.status == true){
                        etb.sendMessage(receiver, "Simi Chat already active")
                    } else {
                        setting.simi.status = true
                        fs.writeFileSync('./settings.json', JSON.stringify(setting, null, 2))
                        etb.sendMessage(receiver, "Success activated Simi Chat")
                    }
                } else if (textt == "off") {
                    if (setting.simi.status == false){
                        etb.sendMessage(receiver, "Simi Chat already deactive")
                    } else {
                        setting.simi.status = false
                        fs.writeFileSync('./settings.json', JSON.stringify(setting, null, 2))
                        etb.sendMessage(receiver, "Success deactivated Simi Chat")
                    }
                }
            } else if (cmd.startsWith("chatgpt")) {
                if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                const sep = text.split(' ')
                const xtext = text.replace(sep[0] + " ", "")
                textt = xtext.toLowerCase()
                let res = "╭──「 CHATGPT 」"
                res += "\n├ Status : "
                res += "\n│ • Status : " +setting.chatgpt.status
                res += "\n├ Usage : "
                res += "\n│ • ChatGpt <on/off>"
                res += "\n╰──「 ETB-TEAM 」"
                if (body.indexOf(' ') === -1) { 
                    etb.sendMessage(receiver, res, {quotedMessageId:_id._serialized})
                } else if (textt == "on") {
                    if (setting.chatgpt.status == true){
                        etb.sendMessage(receiver, "ChatGpt Chat already active")
                    } else {
                        setting.chatgpt.status = true
                        fs.writeFileSync('./settings.json', JSON.stringify(setting, null, 2))
                        etb.sendMessage(receiver, "Success activated ChatGpt Chat")
                    }
                } else if (textt == "off") {
                    if (setting.chatgpt.status == false){
                        etb.sendMessage(receiver, "ChatGpt Chat already deactive")
                    } else {
                        setting.chatgpt.status = false
                        fs.writeFileSync('./settings.json', JSON.stringify(setting, null, 2))
                        etb.sendMessage(receiver, "Success deactivated ChatGpt Chat")
                    }
                }
            } else if (cmd.startsWith('exec')) {
                if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                if (!chat.isGroup) return msg.reply('This command can only be used in a group!');
                try {
                    arg = body.trim().split('\n');
                    var slicedArgs = Array.prototype.slice.call(arg, 1);
                    const exc = await slicedArgs.join('\n');
                    const print = function(text) {
                        const a = JSON.stringify(text, null, 2);
                        msg.reply(util.format(JSON.parse(a)));
                    };
                    const j4p = function(tx) {
                        msg.reply(JSON.stringify(tx, null, 4));
                    };
                    console.log(exc);
                    eval("(async () => {try{"+exc+"}catch(e){etb.sendMessage(receiver,  e.toString(), {quotedMessageId: _id._serialized})}})()");
                } catch (err) {
                    msg.reply(`「 NOTIFICATION 」\n\n${err}`);
                }
            } else if (cmd.startsWith('$')) {
                if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                if (!chat.isGroup) return msg.reply('This command can only be used in a group!');
                arg = body.trim().split(' ');
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                const exc = await slicedArgs.join(' ');
                var os = new os_func();
                const res = await os.execCommand(exc);
                msg.reply(res)
    // PUBLIC COMMANDS
            } else if (msg.mentionedIds.includes(idBot)){
                let sep = text.split(' ')
                let rep = text.replace(sep[0]+' ','')
                if (setting.simi.status == true) {
                    let res = await requests(`https://api.agatz.xyz/api/simsimi?message=${rep}`);
                    let data = await res.json()
                    if (data.status == 200) {
                        msg.reply(data.data);
                    }
                } else if(setting.chatgpt.status == true) {
                    let res = await chatOpenAi(rep);
                    if (res.code == 200) {
                        msg.reply(res.result);
                }
                }
            } if (cmd === 'ping') {
                await sendReplyMessage(etb, relatedMsg, receiver, 'pong');
            } else if (cmd === 'me') {
                // const contact = await etb.getContactById(sender)
                // console.log(contact)
                // await etb.sendMessage(receiver, contact, { parseVCards: true })
                await sendContact(etb, receiver, sender)
            } else if (cmd.startsWith("id")){
                const mention = msg.mentionedIds[0]
                etb.sendMessage(receiver, mention)
            } else if (cmd === 'speed') {
                const timestamp = speed();
                const latensi = speed() - timestamp;
                await sendReplyMessage(etb, relatedMsg, receiver, `Speed: ${latensi.toFixed(3)} MS♪`);
            } else if (cmd == "clear") {
                var os = new os_func()
                os.execCommand("sync; echo 3 > /proc/sys/vm/drop_caches")
                os.execCommand("sync; echo 3 > /proc/sys/vm/drop_caches")
                msg.reply("Success Clear Cache♪")
                await sendReplyMessage(etb, relatedMsg, receiver, "Success Clear Cache♪");
            } else if (cmd === 'help') {
                let mode = "MODE PUBLIC"
                let menu = "𝐎𝐩𝐞𝐫𝐚𝐭𝐞𝐝 𝐁𝐲: 𝗘𝗧𝗕-𝗢𝗣𝗘𝗥𝗔𝗧𝗜𝗢𝗡♪\n"
                menu += `\n*「 ${mode} 」*`
                menu += "\n❒ *HELP COMMAND*\n"
                menu += "\n* Master"
                menu += "\n* Group"
                menu += "\n* Media"
                menu += "\n* NSFW"
                menu += "\n* Funn"
                menu += "\n* Blox fruit"
                menu += "\n* Text Maker"
                menu += "\n* Bot Leave"
                menu += '\n\n☑ Copyright Disclaimer\n©2024 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭𝐓𝐞𝐚𝐦𝐁𝐨𝐭𝐬™'
                msg.reply(`𝐍𝐎𝐄𝐋 - 𝐎𝐏𝐄𝐑𝐀𝐓𝐈𝐎𝐍\n𝐁𝐎𝐓𝐒 𝐄𝐃𝐈𝐓𝐈𝐎𝐍 𝐕.𝟏.𝟎\n${menu}`);
            } else if (cmd == "master") {
                if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                const own = ['Nsfw',,'Changeapikey','Spamgroup {@}|{num}|{nama}','Spam: {no}|{num}|{nama}','Broadcast: {pesan}','Set picture','Speed','Runtime','Settings','Grouplist','Joingc {link}','Addadmin {@}','deladmin {@}','Block {@}','Unblock {@}','Listblock','Autoread','Responpm','Respontag','Requests: {link}','Exec','Readallchat','Callblock']
                own.sort()
                var ret = "𝐍𝐎𝐄𝐋 - 𝐎𝐏𝐄𝐑𝐀𝐓𝐈𝐎𝐍\n𝐁𝐎𝐓𝐒 𝐄𝐃𝐈𝐓𝐈𝐎𝐍 𝐕.𝟏.𝟎\n"
                    ret += "𝐎𝐩𝐞𝐫𝐚𝐭𝐞𝐝 𝐁𝐲: 𝗘𝗧𝗕-𝗢𝗣𝗘𝗥𝗔𝗧𝗜𝗢𝗡♪\n"
                    ret += "\n❒ *MASTER COMMAND*\n"
                for (let media of own) {
                    ret += `\n* ${media}`
                }
                ownrep = ['Upimage {text}','Uptext','Upvideo {text}']
                ownrep.sort()
                ret += '\n\n*Use Reply Message*:'
                for (let reply of ownrep) {
                    ret += `\n* ${reply}`
                }
                ret += '\n\n☑ Copyright Disclaimer\n©2022 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭𝐓𝐞𝐚𝐦𝐁𝐨𝐭𝐬™'
                etb.sendMessage(receiver, ret, { quotedMessageId: _id._serialized });
            } else if (cmd == "group") {
                if (!chat.isGroup) return msg.reply('This command can only be used in a group!');
                gc = ['Invite: {no}',"Ownergroup","Grouplink","Tagall","Getpict {@}","Getbio {@}","Kick {@}","Admingroup","Setgroupname {msg}","Setgroupdesc {msg}","Searchmsg {msg}","Welcome","Leave","Notifupdate"]
                gc.sort()
                let ret = "𝐍𝐎𝐄𝐋 - 𝐎𝐏𝐄𝐑𝐀𝐓𝐈𝐎𝐍\n𝐁𝐎𝐓𝐒 𝐄𝐃𝐈𝐓𝐈𝐎𝐍 𝐕.𝟏.𝟎\n"
                    ret += "𝐎𝐩𝐞𝐫𝐚𝐭𝐞𝐝 𝐁𝐲: 𝗘𝗧𝗕-𝗢𝗣𝗘𝗥𝗔𝗧𝗜𝗢𝗡♪\n"
                    ret += "\n❒ *GROUP COMMAND*\n"
                for (let group of gc) {
                    ret += `\n* ${group}`
                }
                gcrep = ['Set pictgroup']
                gcrep.sort()
                ret += '\n\n*Use Reply Message*:'
                for (let reply of gcrep) {
                    ret += `\n* ${reply}`
                }
                ret += '\n\n☑ Copyright Disclaimer\n©2022 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭𝐓𝐞𝐚𝐦𝐁𝐨𝐭𝐬™'
                etb.sendMessage(receiver, ret, { quotedMessageId: _id._serialized });
            } else if (cmd == "text maker") {
                if (!chat.isGroup) return msg.reply('This command can only be used in a group!');
                fun = ['Foil: {text}','Gold: {text}','Graffiti3: {text}','Graffiti2: {text}','Graffiti: {text1}|{text2}','Hacker: {text}','Nulis: {text}','Comic: {text}']
                fun.sort()
                let ret = "𝐍𝐎𝐄𝐋 - 𝐎𝐏𝐄𝐑𝐀𝐓𝐈𝐎𝐍\n𝐁𝐎𝐓𝐒 𝐄𝐃𝐈𝐓𝐈𝐎𝐍 𝐕.𝟏.𝟎\n"
                    ret += "𝐎𝐩𝐞𝐫𝐚𝐭𝐞𝐝 𝐁𝐲: 𝗘𝗧𝗕-𝗢𝗣𝗘𝗥𝗔𝗧𝗜𝗢𝗡♪\n"
                    ret += "\n❒ *TEXT MAKER*\n"
                for (let media of fun) {
                    ret += `\n* ${media}`
                }
                ret += '\n\n☑ Copyright Disclaimer\n©2022 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭𝐓𝐞𝐚𝐦𝐁𝐨𝐭𝐬™'
                etb.sendMessage(receiver, ret, { quotedMessageId: _id._serialized });
            } else if (cmd.startsWith('say')) {
                arg = body.trim().split(' ');
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                const ppk = await slicedArgs.join(' ');
                msg.reply(ppk);
            } else if (cmd.startsWith('con')) {
                arg = body.trim().split(' ');
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                const ppk = await slicedArgs.join(' ');
                const contact = await etb.getContactById(`${ppk}@c.us`)
                console.log(contact)
                await etb.sendMessage(receiver, contact, { parseVCards: true })
    // MEDIA COMMANDS
            } else if (cmd == "media") {
                med = ['Fancy: {text}', 'Stiicker {url}','Shortlink: {url}','Quotes','Pinterest','Twitter','Artinama: {nama}','Instagram','YtMusic: {url}','Chord: {song}','Etb: {query}','Tiktok','Youtube','Fakechat {@}|{text}']
                med.sort()
                var ret = "𝐍𝐎𝐄𝐋 - 𝐎𝐏𝐄𝐑𝐀𝐓𝐈𝐎𝐍\n𝐁𝐎𝐓𝐒 𝐄𝐃𝐈𝐓𝐈𝐎𝐍 𝐕.𝟏.𝟎\n"
                    ret += "𝐎𝐩𝐞𝐫𝐚𝐭𝐞𝐝 𝐁𝐲: 𝗘𝗧𝗕-𝗢𝗣𝗘𝗥𝗔𝗧𝗜𝗢𝗡♪\n"
                    ret += "\n❒ *MEDIA COMMAND*\n"
                for (let media of med) {
                    ret += `\n* ${media}`
                }
                medrep = ['Translate: {lang}','Sticker']
                medrep.sort()
                ret += '\n\n*Use Reply Message*:'
                for (let reply of medrep) {
                    ret += `\n* ${reply}`
                }
                ret += '\n\n☑ Copyright Disclaimer\n©2024 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭𝐓𝐞𝐚𝐦𝐁𝐨𝐭𝐬™'
                etb.sendMessage(receiver, ret, { quotedMessageId: _id._serialized })
            } else if (msg.body.includes("https://www.instagram.com/")) {
                if (setting.autoDownload.status == true) {
                    try {
                        let sep = body.split("https://www.instagram.com/");
                        let search = body.replace(sep[0] + "https://www.instagram.com/","");
                        let res = await instagramPost("https://www.instagram.com/" + search);
                        if (res.code == 200) {
                            for( let link of res.result) {
                                let media;
                                if (link.media_type == 2){
                                    media = await MessageMedia.fromUrl(link.video_url);
                                } else {
                                    media = await MessageMedia.fromUrl(link.image_url);
                                }
                                console.log(media)
                                await etb.sendMessage(receiver, media);
                            }
                        }
                    } catch(eror) {
                        etb.sendMessage(receiver, eror)
                    }
                }
            } else if (text.includes("https://vt.tiktok.com/")) {
                if (setting.autoDownload.status == true) {
                    var sep = text.split("https://vt.tiktok.com/");
                    var sch = text.replace(sep[0] + "https://vt.tiktok.com/","");
                    let api = await requests(Host1+"tiktok?url=https://vt.tiktok.com/" + sch);
                    let res = await api.json();
                    const {title, cover, data, music_info, stats, author} = res.data
                    let ret = "*TIKTOK DOWNLOAD*\n"
                        ret += "\n*Username*: " + author.nickname
                        ret += "\n*Caption*: " + title
                        ret += "\n*Music*: " + music_info.title
                    let dat = data.slice(1)
                    if (data[0].type == 'photo'){
                        let cov = await MessageMedia.fromUrl(data[0].url);
                        await etb.sendMessage(receiver, cov, {caption: ret});
                    }
                    for (let media of dat) {
                        if (media.type == 'photo' ) {
                            let photo = await MessageMedia.fromUrl(media.url);
                            await etb.sendMessage(receiver, photo);
                        } else if (media.type == 'nowatermark') {
                            let video = await MessageMedia.fromUrl(media.url);
                            await etb.sendMessage(receiver, video, {caption: ret});
                        }
                    }
                    if (data[0].type == 'photo'){
                        let mus = await MessageMedia.fromUrl(music_info.url)
                        await etb.sendMessage(receiver, mus);
                    }
                }
            } else if (msg.body.includes("https://youtu.be/")) {
                if (setting.autoDownload.status == true) {
                    var sep = body.split("https://youtu.be/");
                    var sch = body.replace(sep[0] + "https://youtu.be/","");
                    try {
                        let data = await youTubeDownload("https://youtu.be/" + sch);
                        const { download_url, title } = data.result;
                        let media;
                        try {
                            media = await MessageMedia.fromUrl(download_url);
                        } catch(e) {
                            console.log(e);
                            media = await MessageMedia.fromUrl(download_url, { 
                                unsafeMime: true,                            
                            });
                        }
                        console.log(media);
                        await etb.sendMessage(receiver, media, { caption: title });
                    } catch(err) {
                        console.error("Error:", err)
                    }
                }
            } else if (cmd === "instagram" || cmd.startsWith("instagram")) {
                var sep = body.trim().split(' ')
                const xtext = body.trim().replace(sep[0] + " ", "")
                cond = xtext.split(" ")
                if (body.indexOf(' ') === -1) {
                    let res = "╭──「 INSTAGRAM COMMANDS 」"
                    res += "\n├ Usage : "
                    res += "\n│ • Instagram"
                    res += "\n│ • Instagram Profile: {username}"
                    res += "\n│ • Instagram Post: {URL}"
                    res += "\n│ • Instagram Story: {username} {count}"
                    res += "\n╰──「 ETB-TEAM 」"
                    await etb.sendMessage(receiver, res)
                } else {
                    if (cond[0].toLowerCase() === "profile:") {
                        try {
                            const data = await instagramProfile(cond[1])
                            let ig = "*「 INSTAGRAM PROFILE 」*\n"
                            ig += "\n* *Username* : "+data.result.username
                            ig += "\n* *Full Name* : "+data.result.full_name
                            ig += "\n* *Biography* : "+data.result.biography
                            ig += "\n* *Post* : "+data.result.edge_owner_to_timeline_media.count
                            ig += "\n* *Followers* : "+data.result.edge_follow.count
                            ig += "\n* *Following* : "+data.result.edge_followed_by.count
                            ig += "\n* *Link* :\nhttps://www.instagram.com/"+data.result.username
                            media = await MessageMedia.fromUrl(data.result.profile_pic_url);
                            await etb.sendMessage(receiver, media, {caption: ig});
                        } catch(err){
                            await etb.sendMessage(receiver, "「 NOTIFICATION 」\n\n"+err)
                        }
                    } else if (cond[0].toLowerCase() === "post:"){
                        try {
                            const data = await instagramPost(cond[1]);
                            for( let link of data.result) {
                                let media;
                                if (link.media_type == 2){
                                    media = await MessageMedia.fromUrl(link.video_url);
                                } else {
                                    media = await MessageMedia.fromUrl(link.image_url);
                                }
                                await etb.sendMessage(receiver, media);
                            }
                        } catch(err) {
                            await etb.sendMessage(receiver, "「 NOTIFICATION 」\n\n"+err)
                        }
                    } else if (cond[0].toLowerCase() === "story:"){
                        try{
                            let num = cond[2].split(" ")
                            const response = await requests(`${Host}igstory/${cond[1]}${ApikeyLol}`)
                            const data = await response.json()
                            let media = data.result
                            if (num <= media.length){
                                number = [num - 1]
                                let link = await MessageMedia.fromUrl(media[number]);
                                await etb.sendMessage(receiver, link);
                            } else { 
                                if (media.length == undefined){
                                    await etb.sendMessage(receiver, "this account has not created a story or this account is private")
                                }else{ 
                                    await etb.sendMessage(receiver, 'Hanya ada '+media.length+' Story instagram') 
                                }
                            }
                        } catch(err) {
                            await etb.sendMessage(receiver, "「 NOTIFICATION 」\n\n"+err)
                        }
                    }
                }
            } else if (cmd === "tiktok" || cmd.startsWith("tiktok")) {
                var sep = body.trim().split(' ')
                const xtext = body.trim().replace(sep[0] + " ", "")
                cond = xtext.split(" ")
                if (body.indexOf(' ') === -1) {
                    let res = "╭──「 TIKTOK COMMANDS 」"
                    res += "\n├ Usage : "
                    res += "\n│ • Tiktok"
                    res += "\n│ • Tiktok profile: {username}"
                    res += "\n│ • Tiktok download: {URL}"
                    res += "\n╰──「 ETB-TEAM 」"
                    await etb.sendMessage(receiver, res)
                } else {
                    if (cond[0].toLowerCase() === "profile:") {
                        try {
                            const api = await tikTokProfile(cond[1])
                            const {
                                avatar,
                                bio,
                                follower,
                                following,
                                nickname,
                                privateAccount,
                                username, 
                                verified,
                                videoCount,
                            } = api.result
                            let ret = "*「 TIKTOK PROFILE 」*\n";
                            ret += "\n* *Username*: "+ username;
                            ret += "\n* *Fullname*: "+ nickname;
                            ret += "\n* *Biography*: "+ bio;
                            ret += "\n* *Follower*: "+ follower;
                            ret += "\n* *Following*: "+ following;
                            ret += "\n* *Post*: "+ videoCount;
                            ret += (privateAccount == true) ? "\n* *Private*: 🔒" : "\n* *Private*: 🔓";
                            ret += (verified == true) ? "\n* *Verified*: ✅" : "\n* *Verified*: ❌";
                            ret += "\n* *Link Profile*:\nhttps://www.tiktok.com/@"+ username;
                            media = await MessageMedia.fromUrl(avatar);
                            await etb.sendMessage(receiver, media, {caption: ret});
                        } catch(err) {
                            etb.sendMessage(receiver, "「 NOTIFICATION 」\n\n"+err, { quotedMessageId:_id._serialized });
                        }
                    } else if (cond[0].toLowerCase() == "download:") {
                        try {
                            if (setting.autoDownload.status == true) return etb.sendMessage(receiver,"Turn Off Autodownload URL ")
                            fs.writeFileSync('./settings.json', JSON.stringify(setting, null, 2))
                            let data = await tikTokDownload(cond[1]);
                            const { watermarkVideo, noWatermarkVideo, images } = data.result;
                            if (data.code == 200) {
                                if (!images) {
                                    let media;
                                    try {
                                        media = await MessageMedia.fromUrl(watermarkVideo);
                                    } catch(e) {
                                        console.log(e);
                                        media = await MessageMedia.fromUrl(watermarkVideo, { 
                                            unsafeMime: true,                            
                                        });
                                    }
                                    console.log(media)
                                    await etb.sendMessage(receiver, media);
                                } else {
                                    for( let img of data.result.images) {
                                        let media = await MessageMedia.fromUrl(img);
                                        await etb.sendMessage(receiver, media);
                                    }
                                }
                            }
                        } catch(err) {
                            console.error("Error:", err)
                        }
                    }
                }
            } else if (cmd === "youtube" || cmd.startsWith("youtube")) {
                var sep = body.trim().split(' ')
                const xtext = body.trim().replace(sep[0] + " ", "")
                cond = xtext.split(" ")
                if (body.indexOf(' ') === -1) {
                    let res = "╭──「 YOUTUBE COMMANDS 」"
                    res += "\n├ Usage : "
                    res += "\n│ • Youtube"
                    res += "\n│ • Youtube Search: {query}"
                    res += "\n│ • Youtube Download: {URL}"
                    res += "\n╰──「 ETB-TEAM 」"
                    await etb.sendMessage(receiver, res, {quotedMessageId: _id._serialized})
                } else {
                    if (cond[0].toLowerCase() === "search:") {
                        try {
                            const api = await youTubeSearch(cond[1])
                            let fox = "*「 YOUTUBE SEARCH 」*\n";
                            let num = 0;
                            for (let data of api.result) {
                                num += 1
                                const { title, duration, url } = data;
                                fox += `\n${num}. ${title}\n  Duration: ${duration}\n  Link Youtube: ${url}`;
                            }
                            await etb.sendMessage(receiver, fox, { quotedMessageId: _id._serialized });
                        } catch(err) {
                            etb.sendMessage(receiver, "「 NOTIFICATION 」\n\n"+err, { quotedMessageId: _id._serialized });
                        }
                    } else if (cond[0].toLowerCase() == "download:") {
                        try {
                            let data = await youTubeDownload(cond[1]);
                            const { download_url, title } = data.result;
                            let media;
                            try {
                                media = await MessageMedia.fromUrl(download_url);
                            } catch(e) {
                                console.log(e);
                                media = await MessageMedia.fromUrl(download_url, { 
                                    unsafeMime: true,                            
                                });
                            }
                            console.log(media);
                            await etb.sendMessage(receiver, media, { caption: title });
                        } catch(err) {
                            console.error("Error:", err)
                        }
                    }
                }
            } else if (cmd === "pinterest" || cmd.startsWith("pinterest")) {
                var sep = body.trim().split(' ')
                const xtext = body.trim().replace(sep[0] + " ", "")
                cond = xtext.split(" ")
                if (body.indexOf(' ') === -1) {
                    let res = "╭───「 Pinterest 」"
                    res += "\n├ Usage : "
                    res += "\n│ • Pinterest search: {query}"
                    res += "\n│ • Pinterest download: {URL}"
                    res += "\n╰──「 ETB-TEAM 」"
                    await etb.sendMessage(receiver, res)
                } else {
                    if (cond[0].toLowerCase() === "search:") {
                        try {
                            const api = await pinterestSearch(cond[1]);
                            let num = 0;
                            for (let data of api.result) {
                                num += 1
                                const {
                                    title,
                                    videos,
                                    image_url,
                                } = data;
                                if (!videos){
                                    let fox = `*「 PINTEREST SEARCH 」*\n${num}. ${title}`;
                                    const media = await MessageMedia.fromUrl(image_url);
                                    await etb.sendMessage(receiver, media, { caption: fox });
                                }
                            }
                        } catch(err) {
                            etb.sendMessage(receiver, "「 NOTIFICATION 」\n\n"+err, { quotedMessageId: _id._serialized });
                        }
                    } else if (cond[0].toLowerCase() == "download:") {
                        try {
                            let data;
                            try {
                                data = await pinterestDownload(cond[1]);
                            } catch(error) {
                                console.log(error);
                                data = await pinterestSimilar(cond[1]);
                            }
                            console.log(data)
                            if (Array.isArray(data.result)) {
                                const result = data.result;
                                for (let img of result) {
                                    const {title, image_url} = img;
                                    const media = await MessageMedia.fromUrl(image_url);
                                    await etb.sendMessage(receiver, media, { caption:title });
                                }
                            } else {
                                const result = data.result;
                                const {title, videoUrl} = result;
                                let media;
                                try {
                                    media = await MessageMedia.fromUrl(videoUrl);
                                } catch(err) {
                                    console.log(err)
                                    media = await MessageMedia.fromUrl(videoUrl, {unsafeMime: true});
                                }
                                await etb.sendMessage(receiver, media, {caption: title})
                            }
                        } catch(err) {
                            console.error("Error:", err)
                        }
                    }
                }
            } else if (cmd === "sticker" || cmd.startsWith('sticker')) {
                if (related) {
                    const quotedMsg = await msg.getQuotedMessage();
                    if (quotedMsg.hasMedia) {
                        let media;
                        if (quotedMsg.type === "video" && quotedMsg.isGif) {
                            media = await quotedMsg.downloadMedia();
                        } else if (quotedMsg.type === "image") {
                            media = await quotedMsg.downloadMedia();
                        }
                        await sendSticker(etb, receiver, media);
                    }
                } else {
                    if (hasMedia) {
                        let media;
                        if (type === "video" && msg.isGif) {
                            media = await msg.downloadMedia();
                        } else if (type === "image") {
                            media = await msg.downloadMedia();
                        }
                        await sendSticker(etb, receiver, media);
                    } else if (body.includes("https://store.line.me") || body.includes("https://line.me/S/sticker/")) {
                        arg = body.trim().split(' ');
                        var slicedArgs = Array.prototype.slice.call(arg, 1);
                        const sep = await slicedArgs.join(' ');
                        const response = await requests(`${Host}linestick${ApikeyLol}&url=${sep}`);
                        const data = await response.json();
                        let {stickers} = data.result;
                        for (let stk of stickers) {
                            let media = await MessageMedia.fromUrl(stk);
                            await sendSticker(etb, receiver, media)
                        }
                    }
                }
            } else if (cmd.startsWith('ytmusic:')) {
                arg = body.trim().split(' ');
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                const srch = await slicedArgs.join(' ');
                const response = await requests(`${Host}ytaudio/${ApikeyLol}&url=${srch}`);
                const data = await response.json();
                let {link} = data.result;
                let audio;
                try{
                    audio = await MessageMedia.fromUrl(link.link);
                } catch(error) {
                    console.log(error);
                    audio = await MessageMedia.fromUrl(link.link, { unsafeMime: true });
                }
                etb.sendMessage(receiver, media, { sendAudioAsVoice: true });
            } else if (cmd.startsWith('fancy:')) {
                arg = body.trim().split(' ');
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                const txt = await slicedArgs.join(' ');
                let ret = "*「 FANCY TEXT 」*\n"
                ret += `\n1. ${Strikethrough(txt, StrikeStyle.StrikeTilde)}`;
                ret += `\n2. ${Underline(txt, UnderlineStyle.UnderlineInvertedDoubleArch)}`;
                ret += `\n3. ${Overline(txt, OverlineStyle.OverlineCircumflex)}`;
                ret += `\n4. ${BoldMan(txt)}`
                ret += `\n5. ${BoldSans(txt)}`
                ret += `\n6. ${ItalicSans(txt)}`
                ret += `\n7. ${Cursive(txt)}`
                ret += `\n8. ${Fraktur(txt)}`
                await etb.sendMessage(receiver, ret, {quotedMessageId:_id._serialized})
            } else if(cmd.startsWith('artinama:')) {
                let sep = text.split(' ')
                let rep = text.replace(sep[0]+' ','')
                let api = await requests(`${Host}artinama${ApikeyLol}&nama=${rep}`)
                let res = await api.json()
                etb.sendMessage(receiver, res.result, {quotedMessageId:_id._serialized})
            } if (cmd.startsWith('chord')){
                let sep = text.split(' ')
                let rep = text.replace(sep[0]+' ','')
                let api = await requests(`${Host}chord${ApikeyLol}&query=${rep}`)
                let res = await api.json()
                const {title, chord} = res.result
                let ret = "*「 CHORD 」*\n"
                    ret += "\n*Title:* "+ title
                    ret += "\n*Chord:*\n"+ chord
                etb.sendMessage(receiver, ret, {quotedMessageId:_id._serialized})
            } else if (cmd.startsWith('etb:')) {
                arg = body.trim().split(' ');
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                const task = await slicedArgs.join(' ');
                let res = await chatOpenAi(task);
                if (res.code == 200) {
                    msg.reply(res.result);
                }
            } if (cmd === 'badboy:'){
                let sep = text.split(' ')
                let rep = text.replace(sep[0]+' ','')
                let url = `${Host}badboy${ApikeyLol}&name=${rep}`
                let media = await MessageMedia.fromUrl(url,{ 
                    unsafeMime: true,
                });
                etb.sendMessage(receiver, media, {quotedMessageId:_id._serialized})
            } if (cmd === 'badgirl:'){
                let sep = text.split(' ')
                let rep = text.replace(sep[0]+' ','')
                let url = `${Host}badgirl${ApikeyLol}&name=${rep}`
                let media = await MessageMedia.fromUrl(url,{ 
                    unsafeMime: true,
                });
                etb.sendMessage(receiver, media, {quotedMessageId:_id._serialized})
            } if (cmd.startsWith('fakechat')){
                const user = msg.mentionedIds[0]
                let get = await etb.getContactById(user)
                let avatar = await etb.getProfilePicUrl(user)
                let sep = text.split(" ")
                let rep = text.replace(sep[0]+" ","")
                let txt = rep.split("|")[1]
                let nama = get.pushname
                try {
                    let url = `${Host}bubblechat${ApikeyLol}&avatar=${ava}&name=${nama}&text=${txt}`
                    let media = await MessageMedia.fromUrl(urls,{ 
                        unsafeMime: true,                            
                    });
                    etb.sendMessage(receiver, media, {quotedMessageId:_id._serialized})
                } catch(err){
                    let ava = "https://telegra.ph/file/d132c053c76d971408cc1.jpg"
                    let urll = `${Host}bubblechat${ApikeyLol}&avatar=${ava}&name=${nama}&text=${txt}`
                    let pic = await MessageMedia.fromUrl(urll,{ 
                        unsafeMime: true,                            
                    });
                    etb.sendMessage(receiver, pic, {quotedMessageId:_id._serialized})
                }
            } if (cmd === 'jadwalbola'){
                let api = await requests(Host+"jadwalbola"+ApikeyLol)
                let req = await api.json()
                let data = req.result
                let ret = "*「 JADWAL BOLA 」*\n"
                for (let bola of data) {
                    ret += "\n*Match:* "+ bola.match
                    ret += "\n*Time:* "+ bola.time
                    ret += "\n*Event:* "+ bola.event
                    ret += "\n*Streaming:* "+ bola.tv + "\n"
                }
                etb.sendMessage(receiver, ret, {quotedMessageId:_id._serializeds})
            } else if (cmd.startsWith('requests:')) {
                let sep = body.trim().split(' ')
                let sepl = body.trim().replace(sep[0]+" ","")
                await requests(sepl)
                .then(result => result.text())
                .then(data => { etb.sendMessage(receiver,data)
                })
    
    // NSFW COMMANDS
            } else if (cmd.startsWith("nsfw")) {
                const sep = text.split(' ')
                const xtext = text.replace(sep[0] + " ", "")
                let textt = xtext.toLowerCase()
                let med = ['Xnxx','Xvideos','Dick','Pussy','Fingering','Ass','Bdsm','Blowjob']
                med.sort()
                let ret = "𝐍𝐎𝐄𝐋 - 𝐎𝐏𝐄𝐑𝐀𝐓𝐈𝐎𝐍\n𝐁𝐎𝐓𝐒 𝐄𝐃𝐈𝐓𝐈𝐎𝐍 𝐕.𝟏.𝟎\n"
                    ret += "𝐎𝐩𝐞𝐫𝐚𝐭𝐞𝐝 𝐁𝐲: 𝗘𝗧𝗕-𝗢𝗣𝗘𝗥𝗔𝗧𝗜𝗢𝗡♪\n"
                    ret += "\n❒ *NSFW COMMAND*\n"
                for (let media of med) {
                    ret += `\n* ${media}`
                }
                ret += '\n\n*NSFW Status*:'
                ret += '\nStatus : ' + setting.nsfw.status
                if (body.indexOf(' ') === -1) { 
                    if (!nsfw){
                    etb.sendMessage(receiver, "NSFW command deactive")
                    } else {
                        etb.sendMessage(receiver, ret, {quotedMessageId:_id._serialized})
                    }
                } else if (textt == "on") {
                    if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                    if (setting.nsfw.status == true){
                        etb.sendMessage(receiver, "NSFW Commands already active")
                    } else {
                        setting.nsfw.status = true
                        fs.writeFileSync('./settings.json', JSON.stringify(setting, null, 2))
                        etb.sendMessage(receiver, "Success activated NSFW Commands")
                    }
                } else if (textt == "off") {
                    if (!isMaster) return etb.sendMessage(receiver, "Command For Owner only");
                    if (setting.nsfw.status == false){
                        etb.sendMessage(receiver, "NSFW Commands already deactive")
                    } else {
                        setting.nsfw.status = false
                        fs.writeFileSync('./settings.json', JSON.stringify(setting, null, 2))
                        etb.sendMessage(receiver, "Success deactivated NSFW Commands")
                    }
                }
            } if (cmd.startsWith('xnxx')){
                if (setting.nsfw.status == true) {
                    let sep = text.split(' ')
                    let rep = text.replace(sep[0]+' ','')
                    let cond = rep.split(" ")
                    let res = "╭──「 XNXX 」"
                        res += "\n├ Usage : "
                        res += "\n│ • Xnxx search: {query}"
                        res += "\n│ • Xnxx download: {url}"
                        res += "\n╰──「 ETB-TEAM 」"
                    if (body.indexOf(' ') === -1) { 
                        etb.sendMessage(receiver, res, {quotedMessageId: _id._serialized})
                    } else if (cond[0].toLowerCase() == "search:") {
                        try {
                            let sepl = rep.replace(cond[0]+" ","")
                            let api = await requests(`https://api.agatz.xyz/api/xnxx?message=${sepl}`)
                            let req = await api.json()
                            const data = req.data.result
                            let ret = "「 XNXX SEARCH 」\n"
                            let no = 0
                            for (let i = 0;i <= 10; i++){
                                let url = await shortLink(data[i].link)
                                no += 1
                                ret += "\n"+no+". Title: "+ data[i].title + "\n*Link:* "+ url
                            }
                            etb.sendMessage(receiver, ret, {quotedMessageId: _id._serialized})
                        } catch(err) {
                            etb.sendMessage(receiver, "「 NOTIFICATION 」\n\n"+err)
                        }
                    } else if (cond[0].toLowerCase() == "download:") {
                        try {
                            let sepl = rep.replace(cond[0]+" ","")
                            let api = await requests(`https://api.agatz.xyz/api/xnxxdown?url=${sepl}`)
                            let req = await api.json()
                            const data = req.data.files
                            let media = await MessageMedia.fromUrl(data.high)
                            etb.sendMessage(receiver,media,{isViewOnce: true})
                        } catch(err) {
                            etb.sendMessage(receiver, "「 NOTIFICATION 」\n\n"+err)
                        }
                    }
                }
            } if (cmd.startsWith('xvideos')){
                if (setting.nsfw.status == true) {
                    let sep = text.split(' ')
                    let rep = text.replace(sep[0]+' ','')
                    let cond = rep.split(" ")
                    let res = "╭──「 XVIDEOS 」"
                        res += "\n├ Usage : "
                        res += "\n│ • Xvideos search: {query}"
                        res += "\n│ • Xvideos download: {url}"
                        res += "\n╰──「 ETB-TEAM 」"
                    if (body.indexOf(' ') === -1) { 
                        etb.sendMessage(receiver, res, {quotedMessageId: _id._serialized})
                    } else if (cond[0].toLowerCase() == "search:") {
                        try {
                            let sepl = rep.replace(cond[0]+" ","")
                            let api = await requests(`https://api.agatz.xyz/api/xvideo?message=${sepl}`)
                            let req = await api.json()
                            const data = req.data
                            let ret = "「 XVIDEOS SEARCH 」\n"
                            let no = 0
                            for (let i = 0;i <=10; i++){
                                let link = await shortLink(data[i].url)
                                no += 1
                                ret += "\n"+no+". *Title:* "+ data[i].title + "\n*Duration:* " + data[i].duration + "\n*Link:* "+ link
                            }
                            etb.sendMessage(receiver, ret, {quotedMessageId: _id._serialized})
                        } catch(err) {
                            etb.sendMessage(receiver, "「 NOTIFICATION 」\n\n"+err)
                        }
                    } else if (cond[0].toLowerCase() == "download:") {
                        try {
                            let sepl = rep.replace(cond[0]+" ","")
                            let api = await requests(`https://api.agatz.xyz/api/xvideodown?url=${sepl}`)
                            let req = await api.json()
                            const data = req.data
                            let media = await MessageMedia.fromUrl(data.url)
                            etb.sendMessage(receiver,media,{isViewOnce: true})
                        } catch(err) {
                            etb.sendMessage(receiver, "「 NOTIFICATION 」\n\n"+err)
                        }
                    }
                }
            } if (cmd === 'dick') {
                if (setting.nsfw.status == true) {
                    let api = await requests("https://api.maher-zubair.tech/nsfw/dick")
                    let res = await api.json()
                    let media = await MessageMedia.fromUrl(res.url)
                    await etb.sendMessage(receiver, media, {isViewOnce: true})
                } else {
                    etb.sendMessage(receiver, "NSFW Commands Deactivated")
                }
            } if (cmd === 'pussy'){
                if (setting.nsfw.status == true) {
                    let api = await requests("https://api.maher-zubair.tech/nsfw/pussy")
                    let res = await api.json()
                    let media = await MessageMedia.fromUrl(res.url)
                    await etb.sendMessage(receiver, media, {isViewOnce: true})
                } else {
                    etb.sendMessage(receiver, "NSFW Commands Deactivated")
                }
            } if (cmd === 'fingering') {
                if (setting.nsfw.status == true){
                    let api = await requests("https://api.maher-zubair.tech/nsfw/fingering")
                    let res = await api.json()
                    let media = await MessageMedia.fromUrl(res.url)
                    await etb.sendMessage(receiver, media, {isViewOnce: true})
                } else {
                    etb.sendMessage(receiver, "NSFW Commands Deactivated")
                }
            } if (cmd === 'ass') {
                if (setting.nsfw.status == true){
                    let api = await requests("https://api.maher-zubair.tech/nsfw/ass")
                    let res = await api.json()
                    let media = await MessageMedia.fromUrl(res.url)
                    await etb.sendMessage(receiver, media, {isViewOnce: true})
                } else {
                    etb.sendMessage(receiver, "NSFW Commands Deactivated")
                }
            } if (cmd === 'bdsm') {
                if (setting.nsfw.status == true){
                    let api = await requests("https://api.maher-zubair.tech/nsfw/bdsm")
                    let res = await api.json()
                    let media = await MessageMedia.fromUrl(res.url)
                    await etb.sendMessage(receiver, media, {isViewOnce: true})
                } else {
                    etb.sendMessage(receiver, "NSFW Commands Deactivated")
                }
            } if (cmd === 'blowjob') {
                if (setting.nsfw.status == true){
                    let api = await requests("https://api.maher-zubair.tech/nsfw/blowjob")
                    let res = await api.json()
                    let media = await MessageMedia.fromUrl(res.url)
                    await etb.sendMessage(receiver, media, {isViewOnce: true})
                } else {
                    etb.sendMessage(receiver, "NSFW Commands Deactivated")
                }
    // GROUP COMMANDS
            } else if (cmd.startsWith("getpict")) {
                if (!chat.isGroup) return msg.reply('This command can only be used in a group!');
                const user = msg.mentionedIds[0]
                let pic = await etb.getProfilePicUrl(user)
                try {
                    let media = await MessageMedia.fromUrl(pic)
                    etb.sendMessage(receiver, media)
                } catch(err) {
                    let url = "https://telegra.ph/file/d132c053c76d971408cc1.jpg"
                    let pict = await MessageMedia.fromUrl(url)
                    etb.sendMessage(receiver, pict)
                }
            } if (cmd.startsWith("kick")) {
                //if(args.length === 1) return  etb.sendMessage(receiver, "No target..")
                let admin = []
                for (let members of chat.participants) {
                    if (members.isAdmin) {
                        admin.push(members.id._serialized)
                    }
                }
                if (admin.includes(idBot) == true){
                    let user = msg.mentionedIds[0]
                    let group = await etb.getChatById(msg.from)
                    group.removeParticipants([user])
                    await sendReplyMention(etb, id._serialized, receiver, "Success Kick @"+user.split("@")[0]+" To Group", [user])
                } else {
                    etb.sendMessage(receiver, "Bot Not Admin")
                }
            } if (cmd.startsWith("addadmin")) {
                //if(args.length === 1) return  etb.sendMessage(receiver, "No target..")
                let admin = []
                for (let members of chat.participants) {
                    if (members.isAdmin) {
                        admin.push(members.id._serialized)
                    }
                }
                if (admin.includes(idBot) == true){
                    let user = msg.mentionedIds[0]
                    let group = await etb.getChatById(chat.id._serialized)
                    group.promoteParticipants([user])
                    await sendReplyMention(etb, id._serialized, receiver, "Success Promote @"+user.split("@")[0]+" To Admin", [user])
                } else {
                    etb.sendMessage(receiver, "Bot Not Admin")
                }
            } if (cmd.startsWith("deladmin")) {
                //if(args.length === 1) return  etb.sendMessage(receiver, "No target..")
                let admin = []
                for (let members of chat.participants) {
                    if (members.isAdmin) {
                        admin.push(members.id._serialized)
                    }
                }
                if (admin.includes(idBot) == true){
                    let user = msg.mentionedIds[0]
                    let group = await etb.getChatById(msg.from)
                    group.demoteParticipants([user])
                    await sendReplyMention(etb, id._serialized, receiver, "Success Delete @"+user.split("@")[0]+" To Admin", [user])
                } else {
                    etb.sendMessage(receiver, "Bot Not Admin")
                }
            } else if (cmd === 'tagall') {
                if (!chat.isGroup) return msg.reply('This command can only be used in a group!');
                let fox = "*Tag All Groups*\n";
                let mids = []
                let no = 0
                for (let mem of chat.participants) {
                    no += 1;
                    fox += "\n" + no + `. @${mem.id.user.split('@')[0]}`;
                    mids.push(mem.id._serialized);
                }
                fox += `\n\nName: ${chat.name}\nMember: ${chat.participants.length}`;
                await chat.sendMessage(fox, {mentions: mids});
            } else if (cmd === "grouplist"){
                const a = await etb.getChats()
                let gid = []
                let ret = "*「 GROUP LIST 」*\n\n"
                let num = 0
                for (let b of a){
                    if (b.id.server == 'g.us'){
                        const gc = await etb.getChatById(b.id._serialized)
                        num += 1
                        ret += num+". "+gc.name+"\n"
                        gid.push(b.id._serialized)
                    }
                }
                ret += "\n\nTotal: "+gid.length+" Group\n____________________________\n* Inviteme: {no}\n* Leave: {no}"
                etb.sendMessage(receiver, ret)
            } else if (cmd === 'ginfo') {
                let chat = await msg.getChat();
                if (chat.isGroup) { 
                    msg.reply(`*Group Details*\nName: ${chat.name}\nDescription: ${chat.description}\nCreated At: ${chat.createdAt.toString()}\nCreated By: ${chat.owner.user}\nParticipant count: ${chat.participants.length}`);
                } else {
                    msg.reply('This command can only be used in a group!');
                }
            } else if (cmd === "hidetag" || cmd.startsWith('hidetag')) {
                if (!chat.isGroup) return msg.reply('This command can only be used in a group!');
                if (related) {
                    const quotedMsg = await msg.getQuotedMessage();
                    let mids = []
                    for (let mem of chat.participants) {
                        mids.push(mem.id._serialized);
                    }
                    if (quotedMsg.type === "chat") {
                        await etb.sendMessage(receiver, quotedMsg.body, { mentions: mids, quotedMessageId: _id._serialized });
                    }
                } else {
                    arg = body.trim().split(' ');
                    var slicedArgs = Array.prototype.slice.call(arg, 1);
                    const txtt = await slicedArgs.join(' ');
                    let mids = []
                    for (let mem of chat.participants) {
                        mids.push(mem.id._serialized);
                    }
                    await etb.sendMessage(receiver, txtt, { mentions: mids, quotedMessageId: _id._serialized });
                }
            }
    } catch (e) {
        console.log(`ERROR: ${e}`);
    }
}

module.exports = {
    handleCmd
};

let file =require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update file ${__filename}`)
    delete require.cache[file]
    require(file)
})
