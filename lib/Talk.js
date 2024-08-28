// Talk By Agungnur.y
const sendReplyMessage = async (client, related, chatId, content) => {
    try {
        await client.sendMessage(chatId, content, { sendSeen: true ,quotedMessageId: related });
        console.log('Successfully sent message reply!');
    } catch (error) {
        console.error('Error sending message reply:', error);
    }
};

const sendReplyMention = async (client, related, chatId, content, mids = []) => {
    try {
        const options = {
            mentions: mids,
            sendSeen: true,
            quotedMessageId: related
        };

        await client.sendMessage(chatId, content, options);
        console.log('Successfully sent mention reply!');
    } catch (error) {
        console.error('Error sending mention reply:', error);
    }
};

const sendReplyImage = async (client, related, chatId, media) => {
    try {
        await client.sendMessage(chatId, media, { quotedMessageId: related });
        console.log('Successfully sent image reply!');
    } catch (error) {
        console.error('Error sending image reply:', error);
    }
};

const sendAllMedia = async (client, chatId, media, opsi = {}) => {
    try {
        const options = opsi || {};
        await client.sendMessage(chatId, media, options);
        console.log('Successfully Send Media!');
    } catch (error) {
        console.error('Error sending media:', error);
    }
};


const sendAudio = async (client, chatId, media) => {
    try {
        await client.sendMessage(chatId, media, { sendAudioAsVoice: true });
        console.log('Successfully sent audio!');
    } catch (error) {
        console.error('Error sending audio:', error);
    }
};

const sendSticker = async (client, chatId, media) => {
    try {
        await client.sendMessage(chatId, media, {
            sendMediaAsSticker: true,
            stickerAuthor: "ETB-OPERATION",
            stickerName: "Sticker Maker"
        });
        console.log('Successfully sent sticker!');
    } catch (error) {
        console.error('Error sending sticker:', error);
    }
};

const sendContact = async (client, chatId, user) => {
    try {
        const contact = await etb.getContactById(user);
        await client.sendMessage(chatId, contact, { parseVCards: true });
        console.log('Successfully sent contact!');
    } catch (error) {
        console.error('Error sending contact:', error);
    }
};

module.exports = {
    sendReplyMessage,
    sendReplyMention,
    sendReplyImage,
    sendAllMedia,
    sendAudio,
    sendSticker,
    sendContact
};
