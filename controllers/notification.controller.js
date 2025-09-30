import { io } from "../config/appConfig.js";
import { getDriverSocketIdFromRedis } from "../services/notification.services.js";

export async function NotifyDriversController(req, res){

    const {rideId, rideInfo, driverIds} = req.body;

    const notificationData = {
            rideId, // refers to bookingId
            rideInfo, // source, dest, fare, distance, 
            timeStamp: new Date().toISOString()
        }


        const notifiedDrivers = []
        const failedDrivers = []

        for(let driverId of driverIds){
            const socketId = await getDriverSocketIdFromRedis(driverId)


            if(socketId && io.sockets.sockets.has(socketId)){
                io.to(socketId).emit("New-Ride-Notification", notificationData)
                notifiedDrivers.push(driverId)
            }else{
                failedDrivers.push(driverId)
            }
        }

        const driverNotificationResult = {
            notifiedDrivers,
            failedDrivers,
            totalNotifiedDrivers : notifiedDrivers.length
        }


        res.status(200).json({
            success : true,
            message : "All nearby drivers notified successfully corresponding to given bookingId",
            data : {
                bookingId : rideId,
                notificationDetails : driverNotificationResult
            }
        })
}


export async function ReomveRideUIController(req, res){


    const {rideId, driverIds} = req.body;

    if(!rideId || !driverIds || !Array.isArray(driverIds)){
        throw new Error("Incoming data from backend is not in required format")
    }


    const notifiedDrivers = [];
    const failedDrivers = [];

    for(const driverId of driverIds){
        const driverSocketId = await getDriverSocketIdFromRedis(driverId)

    if (driverSocketId && io.sockets.sockets.has(driverSocketId)) {
          io.to(driverSocketId).emit('Remove-Ride-Notification', rideId);
          notifiedDrivers.push(driverId);
        } else {
          failedDrivers.push(driverId);
        }
    }

    console.log(`Ride : ${rideId} Notification removed from driver: ${driverIds} UI`)

    const result = {
        notifiedDrivers,
        failedDrivers,
        totalNotifiedDriver : driverIds.length,
        removedBookingsCount : notifiedDrivers.length
    }

    res.status(200).json({
        success : true,
        message : "Booking Notification removed from all drivers UI",
        data : {
            rideId,
            ...result
        }
    })
}