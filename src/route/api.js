import express from 'express'
import usersController from '../users/users.controller.js'

const router = express.Router()

router.post("/api/users/", usersController.register)
router.post("/api/users/verify", usersController.verify)
router.post("/api/users/login", usersController.login)
router.get("/api/users/:userID", usersController.getUserById)

export {
    router
}