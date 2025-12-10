import express from "express";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use("/", express.static(__dirname + "/Pages"));

var logged = false;
app.get("/", (req, res) => {
	if (logged) {
		res.redirect("/main-page.html");
		console.log("afa");
	} else {
		res.redirect("/login.html");
	}
});

app.post("/main-page.html", (req, res) => {
	res.redirect("/main-page.html");
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});
