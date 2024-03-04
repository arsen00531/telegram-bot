import rabbitMQClient from './rabbitmq/client'
import TelegramBot from 'node-telegram-bot-api';

export class MessageHandler {
    static async handle(msg: TelegramBot.Message, correlationId: string, replyTo: string) {
        let response = {} 
        console.log("options server ", msg.chat);

        response = { msg }

        // Produce response back to the Client
        await rabbitMQClient.produce(response, correlationId, replyTo)
    }
}