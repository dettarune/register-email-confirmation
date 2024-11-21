import userService from './users.service.js'

const register = async(req, res, next) => {
    try {
        const userRegister = req.body
        const result = await userService.register(userRegister)
        res.status(200).json({
            message: `Berhasil menambahkan user ${userRegister.username}`,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const verify = async(req, res, next) => {
    try {
        const token = req.body.token
        const result = await userService.verification(token)
        res.status(200).json({
            message: "Akun Anda berhasil diverifikasi!",
            data: result
        });
    } catch (error) {
       next(error) 
    }
}

const login = async(req, res, next) => {
    try {
        const result = await userService.login(req.body)
        res.status(200).json({
            message: `${req.body.username} telah berhasil login!`,
        })
    } catch (error) {
       next(error) 
    }
}

export default {
    register,
    verify,
    login
}