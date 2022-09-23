require('dotenv').config()
const PORT = process.env.port || 8000;
const express = require("express")
const ytdl = require("ytdl-core")

const app = express()

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    return res.render("index");
});

app.get("/download", async (req, res) => {
    const v_id = req.query.url.split('v=')[1];
    const info = await ytdl.getInfo(req.query.url);
    return res.render("download", {
        url: "https://www.youtube.com/embed/" + v_id,
        info: info.formats.sort((a, b) => {
            return a.mimeType < b.mimeType;
        }),
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})