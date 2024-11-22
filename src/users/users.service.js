import bcrypt from 'bcrypt'
import { prisma } from '../route/database.js'
import { ResponseError } from '../middleware/response-error.js'
import { getUserByIdValidation, loginUserValidation, registerUserValidation, tokenValidation, validate } from './users.validation.js'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const sendToken = async (user, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "learnbygoogling@gmail.com",
                pass: "rnic edih qzsr ntln",
            },
        });
        console.log(`"Verifikasi" Code : ${token}`)
        await transporter.sendMail({
            from: 'learnbygoogling@gmail.com',
            to: user.email, 
            subject: `Hello ${user.username}, this is your verification code`,
            text: "Verification Code : " + token,
        });

        return token;

    } catch (error) {
        console.error(error.message);
        throw new ResponseError(500, 'Error sending token email');
    }
}

const register = async (req) => {
    const user = validate(registerUserValidation, req)

    const isAvailable = await prisma.user.count({
        where: { username: user.username }
    });

    if (isAvailable > 0) {
        throw new ResponseError(404, `Username ${user.username} telah dipakai orang lain.`);
    }

    if (user.password.length < 8) {
        throw new ResponseError(404, `Password tidak boleh kurang dari 8 karakter`);
    }

    const token = uuidv4();

    user.password = await bcrypt.hash(user.password, 10);

    await sendToken(user, token);

    return prisma.user.create({
        data: {
            username: user.username,
            password: user.password,
            email: user.email,
            token: token,
            isVerified: false
        },
        select: {
            username: true,
            password: true,
            email: true,
            token: true
        }
    });
}

const verification = async (req) => {
    const token = validate(tokenValidation, req)
    if (!token) {
        throw new ResponseError(400, "Token is required");
    }

    const isToken = await prisma.user.findUnique({
        where: { token: token }
    });

    if (!isToken) {
        throw new ResponseError(404, "Token Anda Tidak valid");
    }

    return prisma.user.update({
        where: { token: token },
        data: {
            isVerified: true,
            token: null 
        }
    });
};


const login = async (req) => {
    const loginReq = validate(loginUserValidation, req);

    const isToken = await prisma.user.findFirst({
        where: {
            username: loginReq.username,
            isVerified: true,
        }
    });

    if(!isToken){
        throw new ResponseError(400, `Silahkan verifikasi dulu`)
    }

    const findUser = await prisma.user.findUnique({
        where: { username: loginReq.username },
        select: { username: true, password: true }
    });

    if (!findUser) {
        throw new ResponseError(404, `Username atau password salah!`);
    }

    const isPasswordValid = await bcrypt.compare(loginReq.password, findUser.password);
    if (!isPasswordValid) {
        throw new ResponseError(404, `Username atau password salah!`);
    }

}

const getUserById = async (req) => {
    const userID = validate(getUserByIdValidation, req)
    
    const user = await prisma.user.findFirst({
        where: {
            id: userID
        },
        select: {
            id: true,
            username: true,
            email: true,
            password: true,
        }
    })

    if(!user){
        throw new ResponseError(404, `Account Not Found`)
    }

    return user
}

export default {
    register,
    verification,
    login,
    getUserById
}
