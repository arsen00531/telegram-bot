import { Channel } from "amqplib";
import TelegramBot from "node-telegram-bot-api";

export interface IProducer {
    produceMessages(data: TelegramBot.Message, correlationId: string, replyQueueName: string): void
}

export class Producer {
    constructor(
        private channel: Channel,
    ) {}

    async produceMessages(data: TelegramBot.Message, correlationId: string, replyToQueue: string) {
        console.log("the corr id is", correlationId);

        this.channel.sendToQueue(
            replyToQueue, 
            Buffer.from(JSON.stringify(data)),
            {
                correlationId: correlationId
            }
        )
    }
}