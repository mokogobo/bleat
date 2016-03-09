const express = require("express")
const http    = require("http")
const path    = require("path")

const app = express()

const clientStaticDir = path.join(__dirname, "../")

app.use("/", express.static(clientStaticDir))
app.get("*", function(req, res) {
	res.sendFile("index.html", {root: clientStaticDir})
})

const server = http.createServer(app)
server.listen(8000)
