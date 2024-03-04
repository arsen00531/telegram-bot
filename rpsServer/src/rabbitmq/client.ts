import { Channel, Connection, connect } from "amqplib";
import { IConfigService } from "../config/config.interface";
import { Consumer, IConsumer } from "./consumer";
import { IProducer, Producer } from "./producer";
import { configService } from "../config/config.service";

class RabbitMQClient {
    private constructor() {
        this.consumer = undefined;
        this.connection = undefined;
        this.producerChannel = undefined;
        this.consumerChannel = undefined;
        this.producer = undefined;
        this.configService = configService
    }

    private consumer: IConsumer | undefined
    private connection: Connection | undefined
    private producerChannel: Channel | undefined
    private consumerChannel: Channel | undefined
    private producer: IProducer | undefined
    private configService: IConfigService
    private isInitialized = false

    private static instanse: RabbitMQClient

    public static getInstance() {
        if (!this.instanse) {
            this.instanse = new RabbitMQClient()
        }
        return this.instanse
    }

    async initialize() {
        if (this.isInitialized) {
            return;
        }
        try {
            this.connection = await connect(this.configService.get('RABBITMQ_URL'))

            this.producerChannel = await this.connection.createChannel()
            this.consumerChannel = await this.connection.createChannel()

            const { queue: rpcQueue } = await this.consumerChannel.assertQueue(
                configService.get('RPS_QUEUE_NAME'), 
                {exclusive: true}
            )

            this.producer = new Producer(this.producerChannel)
            this.consumer = new Consumer(this.consumerChannel, rpcQueue)

            this.consumer.consumeMessage()

            this.isInitialized = true
            
        } catch (error) {
            throw new Error(`RabbitMQ init error ${error}`)
        }
    }

    async produce(data: any, correlationId: string, replyToQueue: string) {
        if (!this.isInitialized) {
            await this.initialize()
        }

        if (this.producer) {
            return this.producer.produceMessages(data, correlationId, replyToQueue)
        } else {
            throw new Error("Producer was not initialized")
        }
    }
}

export default RabbitMQClient.getInstance()