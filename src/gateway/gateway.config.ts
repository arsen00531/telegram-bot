import { configService } from "../config/config.service.js"
import { GatewayService } from "./gateway.service.js"

const gatewayService = new GatewayService()

export const gatewayConfigs = [
    {
        path: `/bot${configService.get('BOT_TOKEN')}`,
        handler: gatewayService.botHandler
    }
]