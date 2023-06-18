const { Router } = require('@grammyjs/router');
const Io = require('../utils/Io');
const Users = new Io('./db/users.json')
const router = new Router((ctx) => ctx.session.step);
const { contactBtn } = require("../helpers/user.helper");
const User = require ('../models/user')

const user = {};

const start = router.route('start');

start.command('start', async (ctx) => {
    const users = await Users.read();
    const userId = ctx.from.id;
    const isUser = users.find((user) => user.id === ctx.from.id);
    if (!isUser) {
        await ctx.reply(`<b>Assalomu aleykum,<a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a>. Najot ta'limga xush kelibsiz! Ismingini kiriting:</b>`,
    {
        parse_mode: "HTML"
    });
    user.id = ctx.from.id;
    ctx.session.step = 'second';
    } else {
        await ctx.reply(`<b>Assalomu aleykum,${isUser.surname} ${isUser.name}. Najot ta'limga xush kelibsiz! Sizni yana bir bor ko'rganimizdan xursandmiz!</b>`,   {
            parse_mode: "HTML"
        });
        ctx.session.step = 'fifth';
    }
});

const second = router.route('second');

second.on(':text', async (ctx) => {
    await ctx.reply('Familiyangizni kiriting:');
    user.name = ctx.message.text;
    ctx.session.step = 'third';
})

const third = router.route('third');

third.on(':text', async (ctx) => {
    await ctx.reply('Telefon raqamizni kiriting:', {
        reply_markup: {
            ...contactBtn,
            resize_keyboard: true
        }
    });
    user.surname = ctx.message.text;
    ctx.session.step = 'fourth';
})

const fourth = router.route('fourth');

fourth.on(':contact', async (ctx) => {
    await ctx.reply('Registratsiyadan muvafaqiyatli otdingiz', {
    reply_markup: {
        remove_keyboard: true
    }});
    user.number = ctx.message.contact.phone_number;
    const users = await Users.read();
    const data = users.length ? [...users, user] : [user];
    await Users.write(data);
    ctx.session.step = 'fifth';
})

const fifth = router.route('fifth');

fifth.on(':text', async (ctx) => {
    await ctx.reply('Sizga doim xursandmiz!');
    ctx.session.step = '';
})

module.exports = router;