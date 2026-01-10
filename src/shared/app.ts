import { envs } from "./config/env"
import app from "./socket/server"
import cors from "cors"
import express from 'express'
import serverRoutes from "../modules/servers/routes"

app.use(cors())
app.use(express.json())

app.use('/server', serverRoutes)

app.listen(envs.HTTP_PORT, () => {
    console.log(`HTTP server is running on port ${envs.HTTP_PORT}`);
});