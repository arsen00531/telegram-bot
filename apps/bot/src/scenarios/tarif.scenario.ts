import TelegramBot from "node-telegram-bot-api"
import { thanks } from "./thanks"
import Bot from "../bot/Bot"
import { active } from "./active.scenarios"

export const tarif = async (bot: TelegramBot, ctx: TelegramBot.CallbackQuery) => {
    if (Bot.getUsers(ctx.from.id).thanks) {
        return active(bot, ctx)
    }
    Bot.changeUsers(ctx.from.id)
    await bot.sendMessage(ctx.from.id, 'Спасибо за выбор тарифа, отправим сообщение по активации')

    setTimeout(async () => {
        await bot.sendMessage(ctx.from.id, `Тариф ${ctx.data} активирован`)
        thanks(bot, ctx, 10000)
    }, 15000)
}