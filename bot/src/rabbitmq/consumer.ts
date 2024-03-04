import { Channel, ConsumeMessage } from "amqplib";
import TelegramBot from "node-telegram-bot-api";
import Bot from "../bot/Bot";

export interface IConsumer {
    consumeMessage(): void
}

export class Consumer {

    constructor(
        private channel: Channel,
        private replyQueueName: string
    ) {}

    async consumeMessage() {
        console.log("Ready to consume");

        this.channel.consume(
            this.replyQueueName, 
            async (message: ConsumeMessage | null) => 
            {
                if (message) {
                    const { msg }: { msg: TelegramBot.Message } = JSON.parse(message.content.toString())
                    
                    const bot = Bot.getBot()
                    bot.sendMessage(msg.chat.id, 'Выбери действие', {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: 'Выбрать тариф', callback_data: 'chooseWay' }],
                                [{ text: 'Попробовать бесплатно', callback_data: 'tryFree' }],
                            ]
                        }
                    })
                }
            },
            {
                noAck: true
            }
        )
    }
}