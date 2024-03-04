import rabbitMQClient from "../rabbitmq/client.js";
import TelegramBot from "node-telegram-bot-api";
import { MessageAbstract } from "./abstract/message.class.js";

export class HelloCommand extends MessageAbstract {

    constructor(
        bot: TelegramBot
    ) {
        super(bot)
    }

    handle(): void {
        this.bot.onText(/привет/, async (msg) => {
            const { chat: { id } } = msg

            await rabbitMQClient.produce(
                msg, 
                String(id)
            )
        })
    }
}