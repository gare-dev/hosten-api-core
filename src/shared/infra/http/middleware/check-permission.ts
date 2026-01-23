import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { envs } from "../../../config/env";
import jwtType from "../../../types/jwt-type";
import { STATUS_CODES } from "../status-codes";

async function checkPermission(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.cookie?.substring(6)
        const { resource, action } = req.body

        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: "You must be logged in to access this resource.",
            });
        }
        const decoded = jwt.verify(token, envs.JWT_TOKEN) as jwtType

        if (!decoded.permissions.includes(`${resource}:${action}`)) {
            req.userId = decoded.userId
            return next()
        }

        return res.status(STATUS_CODES.FORBIDDEN).json({
            message: "You do not have permission to access this resource.",
        });

    } catch (error) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            message: "You must be logged in to access this resource.",
        });
    }
}

export default checkPermission;
