import TelegramBot from "node-telegram-bot-api";
import { thanks } from "./thanks";

export const free = (bot: TelegramBot, ctx: TelegramBot.CallbackQuery, time: number) => {
    thanks(bot, ctx, time)
}

export const cost = async (bot: TelegramBot, ctx: TelegramBot.CallbackQuery) => {
    await bot.sendMessage(ctx.from.id, 'Тариф', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Базовый', callback_data: 'base' },
                    { text: 'Продвинутый', callback_data: 'advanced' },
                    { text: 'Pro', callback_data: 'Pro' },
                ],
            ]
        }
    })
}