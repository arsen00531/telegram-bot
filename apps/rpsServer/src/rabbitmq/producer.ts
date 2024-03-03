import { Channel } from "amqplib";

export interface IProducer {
    produceMessages(data: any, correlationId: string, replyQueueName: string): void
}

export class Producer {
    constructor(
        private channel: Channel,
    ) {}

    async produceMessages(data: any, correlationId: string, replyToQueue: string) {
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