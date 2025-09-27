import { app, io, server } from "./config/appConfig.js";
import notificationRouter from "./routes/notification.routes.js";
import dotenv from 'dotenv'

dotenv.config();



app.use('/api', notificationRouter)


io.on("connection",(socket) => {

    console.log('A new connection established with socketId:', socket.id)



    socket.on('disconnect', () => {
        console.log('User disconnected with socketId:', socket.id)
    })

})

const port = process.env.PORT || 3009

server.listen(port, () => {
    console.log(`Web-socket-server is running on port http://localhost:${port}`)
})

