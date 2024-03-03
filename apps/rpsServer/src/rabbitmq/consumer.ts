import { Channel, ConsumeMessage } from "amqplib";
import { MessageHandler } from "../messageHandler";

export interface IConsumer {
    consumeMessage(): void
}

export class Consumer {

    constructor(
        private channel: Channel,
        private rpcQueue: string
    ) {}

    async consumeMessage() {
        console.log("Ready to consume");

        this.channel.consume(
            this.rpcQueue, 
            async (message: ConsumeMessage | null) => 
            {
                const { correlationId, replyTo } = message.properties
                if (!correlationId || !replyTo) {
                    console.log("Missing properties");
                } else {
                    await MessageHandler.handle(
                        JSON.parse(message.content.toString()),
                        correlationId,
                        replyTo
                    )
                }
            },
            {
                noAck: true
            }
        )
    }
}