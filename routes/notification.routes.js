import express from 'express'
import { NotifyDriversController, ReomveRideUIController } from '../controllers/notification.controller.js';

const notificationRouter = express.Router();


notificationRouter.post('/notify-drivers',NotifyDriversController);
notificationRouter.post('/remove-ride-notification',ReomveRideUIController)
export default notificationRouter