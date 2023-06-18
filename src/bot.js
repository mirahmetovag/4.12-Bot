const config = require('../config')
const {Bot, session} = require('grammy');
const bot = new Bot(config.TOKEN);
const commandsModule = require('./modules/commands');
const registerModule = require('./modules/register.module');

bot.use(session({ initial: () => ({
    step: "start"
}),
})
);

bot.use(registerModule);
bot.use(commandsModule);

bot.start();