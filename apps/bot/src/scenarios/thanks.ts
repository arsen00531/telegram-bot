import TelegramBot from "node-telegram-bot-api";

export const thanks = (bot: TelegramBot, ctx: TelegramBot.CallbackQuery, time: number) => {
    setTimeout(async () => {
        await bot.sendMessage(ctx.from.id, 'Спасибо')
        await bot.sendPhoto(ctx.from.id, 'https://apteka.vetok40.ru/wa-data/public/shop/img/23-230429_transparent-success-png-success-png-icon-png-download.png')
    }, time)
}