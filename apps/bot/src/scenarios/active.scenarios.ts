import TelegramBot from "node-telegram-bot-api";

export const active = async (bot: TelegramBot, ctx: TelegramBot.CallbackQuery) => {
    await bot.sendMessage(ctx.from.id, 'Тариф уже активирован')
}