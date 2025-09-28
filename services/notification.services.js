import redisClient from "../utils/redis.Client.js"


export async function setDriverSocketIdInRedis(driverId, socketId){

    try{

        await redisClient.hSet('driver_sockets', driverId, socketId)

    }catch(error){

        throw new Error("Unable to set hash in redis",error.message)

    }

}


export async function getDriverSocketIdFromRedis(driverId){
    
    try{

       return await redisClient.hGet('driver_sockets', driverId)

    }catch(error){

        throw new Error("socketId value not found with given field driverId in driver_sockets hash", error.message)

    }
}