import { app, io, server } from "./config/appConfig.js";
import notificationRouter from "./routes/notification.routes.js";
import { setDriverSocketIdInRedis } from "./services/notification.services.js";
import dotenv from 'dotenv'

dotenv.config();



app.use('/api', notificationRouter)


io.on("connection",(socket) => {

    console.log('A new connection established with socketId:', socket.id)

    socket.on('Driver-Login', async (data) => {
    try {
        const {driverId} = data
        await setDriverSocketIdInRedis(driverId, socket.id)
        console.log(`Driver login with id ${driverId} and connected with socket id : ${socket.id}`)

        socket.emit('Login-Success',{
            driverId,
            message : "Driver loggedIn and connected with socketId successfully"
        })

    } catch (error) {
        socket.emit('error',{
        message : "connection failed"
        }) 
    }
    })  


    socket.on('disconnect', () => {
        console.log('User disconnected with socketId:', socket.id)
    })

})

const port = process.env.PORT || 3009

server.listen(port, () => {
    console.log(`Web-socket-server is running on port http://localhost:${port}`)
})

