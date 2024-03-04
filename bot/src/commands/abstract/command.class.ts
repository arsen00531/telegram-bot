import TelegramBot, { BotCommand } from "node-telegram-bot-api";

export abstract class Command {
    constructor(
        public bot: TelegramBot
    ) {}

    abstract handle(): void

    abstract getCommand(): BotCommand
}