import rabbitMQClient from "../rabbitmq/client.js";
import TelegramBot from "node-telegram-bot-api";
import { MessageAbstract } from "./abstract/message.class.js";

export class EventCommand extends MessageAbstract {

    constructor(
        bot: TelegramBot
    ) {
        super(bot)
    }

    handle(): void {
        this.bot.on('callback_query', async (ctx) => {
            try {
                console.log();
                this.bot.sendMessage(ctx.from.id, 'asfsadsa')
            } catch (error) {
                throw new Error('Event Error')
            }
        })
    }
}