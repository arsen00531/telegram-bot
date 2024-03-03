import { IConfigService } from "../config/config.interface.js";
import { Command } from "../commands/command.class.js";
import { StartCommand } from "../commands/start.command.js";
import TelegramBot from "node-telegram-bot-api";
import { configService } from "../config/config.service.js";

class Bot {
    public static instanse: Bot;
    private commands: Command[] = []
    private botToken: string
    private configService: IConfigService
    private isInitialized = false
    private bot: TelegramBot

    constructor() {
        this.configService = configService
        this.botToken = this.configService.get('BOT_TOKEN')
        this.bot = new TelegramBot(this.botToken)
    }

    public getBot() {
        return this.bot
    }

    public static getInstance(): Bot {
        if (!this.instanse) {
            this.instanse = new Bot()
        }
        return this.instanse
    }

    async init() {
        if (this.isInitialized) {
            return;
        }
        console.log("Bot init");

        

        await this.bot.setWebHook(`${this.configService.get('DOMAIN')}/bot${this.botToken}`)

        this.commands = [new StartCommand(this.bot)]
        for (const command of this.commands) {
            command.handle()
        }
    }

}

export default Bot.getInstance()