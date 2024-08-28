/*
Bot WhatsApp Public
Library By WhatsApp-Web.js
Build By :
    -IGoyyy
    -AgungNur.y
**/
const qrcode = require('qrcode-terminal');
const moment = require("moment-timezone");
const util = require('util');
const { Client, LegacySessionAuth, LocalAuth, MessageMedia} = require('whatsapp-web.js');

class connect {
    constructor(options) {
        this.client = new Client(options);

        this.client.on('authenticated', this.onAuthenticated.bind(this));
        this.client.on('qr', this.onQR.bind(this));
        this.client.on('auth_failure', this.onAuthFailure.bind(this));
        this.client.on('ready', this.onReady.bind(this));
        this.client.on('message', this.handleCommands.bind(this));

        this.client.initialize();
    }

    onAuthenticated(session) {
        console.log('AUTHENTICATED:', session);
    }

    onQR(qr) {
        qrcode.generate(qr, { small: true });
    }

    onAuthFailure(msg) {
        console.error('AUTHENTICATION FAILURE:', msg);
    }

    onReady() {
        console.log("WhatsApp client is ready to receive messages");
    }

    handleCommands(msg) {
        console.log('MESSAGE RECEIVED:', msg);
        // Handle messages in subclasses
    }
}

module.exports = connect;
