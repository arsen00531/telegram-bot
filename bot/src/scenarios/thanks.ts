import TelegramBot from "node-telegram-bot-api";

export const thanks = (bot: TelegramBot, ctx: TelegramBot.CallbackQuery, time: number) => {
    const id = ctx.from.id
    
    setTimeout(async () => {
        await bot.sendMessage(id, 'Спасибо')
        await bot.sendPhoto(id, 'https://apteka.vetok40.ru/wa-data/public/shop/img/23-230429_transparent-success-png-success-png-icon-png-download.png')
        console.log(id);
    }, time)
}