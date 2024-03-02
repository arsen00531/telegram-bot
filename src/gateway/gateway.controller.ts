import { Router } from 'express';
import { GatewayService } from './gateway.service.js';

const router = Router()
const gatewayService = new GatewayService()

router.post('/bot', gatewayService.bot);

export { router }