const {Client} = require('discord.js');
const client = new Client();
const {token} = require('./config.json');
const {updateMemberSize,updateGuildAmount} = require('./functions');

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.on('error', error => {
    console.error('The websocket connection encountered an error:', error);
});

client.on('ready', () => {
    updateGuildAmount(client);
    updateMemberSize(client);
    console.log("Pixel Pizza is ready");
});

client.login(token);