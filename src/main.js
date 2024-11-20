import express from 'express'
import { router } from './route/api.js'
import { errorMiddleware } from './middleware/error-middleware.js'
const app = express()
const PORT = 3000


app.use(express.json())
app.use(router)
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});