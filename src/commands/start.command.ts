import { Telegraf } from "telegraf";
import { Command } from "./command.class.js";
import { IBotContext } from "../context/context.interface.js";

export class StartCommand extends Command {

    constructor(
        bot: Telegraf<IBotContext>
    ) {
        super(bot)
    }

    handle(): void {
        this.bot.start((ctx) => {
            
        })
    }
}