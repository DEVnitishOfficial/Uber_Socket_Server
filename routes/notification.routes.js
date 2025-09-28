import express from 'express'
import { NotifyDriversController } from '../controllers/notification.controller.js';

const notificationRouter = express.Router();


notificationRouter.post('/notify-drivers',NotifyDriversController);

export default notificationRouter