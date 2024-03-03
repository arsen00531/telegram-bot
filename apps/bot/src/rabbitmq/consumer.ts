import { Channel, ConsumeMessage } from "amqplib";

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
            (message: ConsumeMessage | null) => 
            {
                if (message) {
                    console.log("reply", JSON.parse(message.content.toString()));
                }
            },
            {
                noAck: true
            }
        )
    }
}