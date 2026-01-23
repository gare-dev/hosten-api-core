import { envs } from "./config/env"
import app from "./socket/server"
import express from 'express'
import serverRoutes from "../modules/servers/routes"
import userRoutes from "../modules/users/routes"
import roleRoutes from "../modules/role/routes"
import permissionRoutes from "../modules/resource/route"
import rolePermissionRoutes from "../modules/role-permission/routes"
import userRoleRoutes from "../modules/user-role/routes"
import checkPermission from "./infra/http/middleware/check-permission"
import cors from "cors"
import resourceRoutes from "../modules/resource/route"

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.use('/server', serverRoutes)
app.use('/user', userRoutes)
app.use('/role', checkPermission, roleRoutes)
app.use('/resource', checkPermission, resourceRoutes)
app.use('/role-permission', checkPermission, rolePermissionRoutes)
app.use('/user-role', checkPermission, userRoleRoutes)

app.listen(envs.HTTP_PORT, () => {
    console.log(`HTTP server is running on port ${envs.HTTP_PORT}`);
});