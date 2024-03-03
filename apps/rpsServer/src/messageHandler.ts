import rabbitMqClient from './rabbitmq/client'

export class MessageHandler {
    static async handle(data: any, correlationId: string, replyTo: string) {
        let response = {}
        console.log("options server ", data);
        response = data

        // Produce response back to the Client

        await rabbitMqClient.produce(response, correlationId, replyTo)
    }
}