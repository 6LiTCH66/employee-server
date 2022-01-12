const express = require("express")
const routers = require("./routes/employee.routers")
const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use('/api', routers)


app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))