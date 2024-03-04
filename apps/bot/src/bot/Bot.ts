import { IConfigService } from "../config/config.interface.js";
import { Command } from "../commands/abstract/command.class.js";
import { StartCommand } from "../commands/start.command.js";
import TelegramBot, { BotCommand } from "node-telegram-bot-api";
import { configService } from "../config/config.service.js";
import { HelloCommand } from "../commands/hello.message.js";
import { MessageAbstract } from "../commands/abstract/message.class.js";
import { EventCommand } from "../commands/event.message.js";

class Bot {
    public static instanse: Bot;
    private commandsInstanse: Command[] = []
    private commands: BotCommand[] = []
    private messagesInstanse: MessageAbstract[] = []
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

        this.commandsInstanse = [new StartCommand(this.bot)]
        this.messagesInstanse = [new HelloCommand(this.bot), new EventCommand(this.bot)]
        for (const command of this.commandsInstanse) {
            command.handle()
            this.commands.push(command.getCommand())
        }
        for (const message of this.messagesInstanse) {
            message.handle()
        }
        await this.bot.setMyCommands(this.commands)
    }

}

export default Bot.getInstance()