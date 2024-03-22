// SubscribeRoutes.ts
import { Router } from 'express';
import SubscribeController from '../controller/subscribe_controller';
const subscribeRoutes = Router();

subscribeRoutes.post('/post-subscribe', SubscribeController.createSubscribe);
subscribeRoutes.put('/update-subscribe/:id', SubscribeController.updateSubscribe);
subscribeRoutes.get('/getall-subscribe', SubscribeController.getAllSubscriptions);
subscribeRoutes.get('/getone-subscribe/:id', SubscribeController.getOneSubscription);
subscribeRoutes.delete('/delete-subscribe/:id', SubscribeController.deleteSubscription);

export default subscribeRoutes;