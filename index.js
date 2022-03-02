const express = require("express")
const socket = require("socket.io")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const employeeRouters = require("./routes/employee.routers")
const authRouters = require("./routes/auth.routes")
const vastusedRouters = require("./routes/web_scraping.routes")
const auth = require("./middlewares/auth")
const PORT = process.env.PORT || 8080
const app = express()
app.enable('trust proxy');
app.use(cookieParser());

app.use(cors({credentials: true, origin: true}));
app.use(express.json())

app.use('/api',auth, employeeRouters)
app.use('/auth', authRouters)
app.use('/scraping',vastusedRouters)

const server = app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))

const io = socket(server, {
    cors: {
        origin: "http://employee-client-app.herokuapp.com/",
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket', 'polling'],
    },
    allowEIO3: true
})

io.on("connection", function (socket){
    console.log("Made socket connection");

    socket.on("start-client", function (data){
        io.emit("start-event", data)
    })

    socket.on("stop-client", function (data){
        io.emit("stop-event", data)
    })

    socket.emit("test event", "here is some data");

})

