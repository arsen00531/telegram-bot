import TelegramBot from "node-telegram-bot-api"
import { thanks } from "./thanks"

export const tarif = async (bot: TelegramBot, ctx: TelegramBot.CallbackQuery) => {
    await bot.sendMessage(ctx.from.id, 'Спасибо за выбор тарифа, отправим сообщение по активации')

    setTimeout(async () => {
        await bot.sendMessage(ctx.from.id, 'Тариф активирован')
        thanks(bot, ctx, 10000)
    }, 15000)
}