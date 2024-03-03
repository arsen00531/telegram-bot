import { Channel } from "amqplib";
import { IConfigService } from "../config/config.interface.js";
import { randomUUID } from "crypto";

export interface IProducer {
    produceMessages(data: any, correlationId: string): void
}

export class Producer {
    constructor(
        private configService: IConfigService,
        private channel: Channel,
        private replyQueueName: string
    ) {}

    async produceMessages(data: any, correlationId: string) {
        console.log("the corr id is", correlationId);

        this.channel.sendToQueue(
            this.configService.get('RPS_QUEUE_NAME'), 
            Buffer.from(JSON.stringify(data)),
            {
                replyTo: this.replyQueueName,
                correlationId: correlationId
            }
        )
    }
}