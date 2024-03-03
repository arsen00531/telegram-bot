import { GatewayService } from "./gateway.service.js"

const gatewayService = new GatewayService()

export const gatewayConfigs = [
    {
        path: '/bot',
        handler: gatewayService.bot
    }
]