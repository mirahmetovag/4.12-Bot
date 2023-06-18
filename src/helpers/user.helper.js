const { Keyboard } = require('grammy');
const contactBtn = new Keyboard().requestContact("Yuborish");

module.exports = {contactBtn};