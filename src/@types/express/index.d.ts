import { User } from "../../middleware/authGuard"

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}