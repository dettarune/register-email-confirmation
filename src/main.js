import express from 'express'
import { router } from './route/api.js'
import { errorMiddleware } from './middleware/error-middleware.js'
const app = express()
const PORT = 2024

import cors from 'cors'
app.use(
    cors({
      origin: 'http://127.0.0.1:5500', 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
app.options('*', cors());

app.use(express.json())
app.use(router)
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});