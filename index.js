const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const employeeRouters = require("./routes/employee.routers")
const authRouters = require("./routes/auth.routes")
const auth = require("./middlewares/auth")
const PORT = process.env.PORT || 8080
const app = express()
app.enable('trust proxy', 1);
app.use(cookieParser());

app.use(cors({credentials: true, origin: "https://employee-client-app.herokuapp.com/"}));
app.use(express.json())

app.use('/api',auth, employeeRouters)
app.use('/auth', authRouters)

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))