import { Command } from "./command.class.js";
import TelegramBot from "node-telegram-bot-api";

export class StartCommand extends Command {

    constructor(
        bot: TelegramBot
    ) {
        super(bot)
    }

    handle(): void {
        this.bot.onText(/\/help (.+)/, (msg, match) => {
            const { chat: { id } } = msg
            if(!match) return

            const name = match[1];
            this.bot.sendMessage(id, name)
            .then(() => console.log("command send"))
        })
    }
}