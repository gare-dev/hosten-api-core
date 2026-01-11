import { envs } from "./config/env"
import app from "./socket/server"
import cors from "cors"
import express from 'express'
import serverRoutes from "../modules/servers/routes"
import userRoutes from "../modules/users/routes"
import roleRoutes from "../modules/role/routes"
import permissionRoutes from "../modules/permission/route"
import rolePermissionRoutes from "../modules/role-permission/routes"
import userRoleRoutes from "../modules/user-role/routes"
import checkPermission from "./infra/http/middleware/check-permission"

app.use(cors())
app.use(express.json())

app.use('/server', serverRoutes)
app.use('/user', userRoutes)
app.use('/role', checkPermission, roleRoutes)
app.use('/permission', checkPermission, permissionRoutes)
app.use('/role-permission', checkPermission, rolePermissionRoutes)
app.use('/user-role', checkPermission, userRoleRoutes)

app.listen(envs.HTTP_PORT, () => {
    console.log(`HTTP server is running on port ${envs.HTTP_PORT}`);
});