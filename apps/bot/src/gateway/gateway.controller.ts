import { Router } from 'express';
import { gatewayConfigs } from './gateway.config.js';

const router = Router()

for (const gatewayConfig of gatewayConfigs) {
    router.post(gatewayConfig.path, gatewayConfig.handler)
}

export { router }