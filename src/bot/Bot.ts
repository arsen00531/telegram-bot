import { IConfigService } from "../config/config.interface.js";
import { Command } from "../commands/command.class.js";
import { StartCommand } from "../commands/start.command.js";
import TelegramBot from "node-telegram-bot-api";

export class Bot {
    private bot: TelegramBot;
    private commands: Command[] = []
    private botToken: string

    constructor(
        private readonly configService: IConfigService
    ) {
        this.botToken = this.configService.get('BOT_TOKEN')
        this.bot = new TelegramBot(this.configService.get('BOT_TOKEN'))
    }

    getBot(): TelegramBot {
        if (!this.bot) {
            this.bot = new TelegramBot(this.configService.get('BOT_TOKEN'))
        }
        return this.bot
    }

    async init() {
        console.log("Bot init");

        await this.bot.setWebHook(`${this.configService.get('DOMAIN')}/bot${this.botToken}`)

        this.commands = [new StartCommand(this.bot)]
        for (const command of this.commands) {
            command.handle()
        }
    }

}