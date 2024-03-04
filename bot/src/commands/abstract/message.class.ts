import TelegramBot, { BotCommand } from "node-telegram-bot-api";

export abstract class MessageAbstract {
    constructor(
        public bot: TelegramBot
    ) {}

    abstract handle(): void
}