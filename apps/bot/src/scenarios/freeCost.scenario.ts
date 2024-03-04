import TelegramBot from "node-telegram-bot-api";
import { thanks } from "./thanks";
import { active } from "./active.scenarios";
import Bot from "../bot/Bot";

export const free = (bot: TelegramBot, ctx: TelegramBot.CallbackQuery, time: number) => {
    if (Bot.getUsers(ctx.from.id).thanks) {
        return active(bot, ctx)
    }
    thanks(bot, ctx, time)
    Bot.changeUsers(ctx.from.id)
}

export const cost = async (bot: TelegramBot, ctx: TelegramBot.CallbackQuery) => {
    if (Bot.getUsers(ctx.from.id).thanks) {
        return active(bot, ctx)
    }
    await bot.sendMessage(ctx.from.id, 'Тариф', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Базовый', callback_data: 'Базовый' },
                    { text: 'Продвинутый', callback_data: 'Продвинутый' },
                    { text: 'Pro', callback_data: 'Pro' },
                ],
            ]
        }
    })
}