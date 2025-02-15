import express from "express";
import "dotenv/config";
import { mongoConnect } from "./utils/connection.js";
import routes from "./routes/routes.js";

const { DB_URL, PORT } = process.env;

const app = express();
mongoConnect(DB_URL).then(() => console.log("DB connected"));

app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);
app.get("/", (req, res) => {
	res.end("Hello");
});

app.listen(PORT || 3000, () =>
	console.log(`Server is running on PORT: ${PORT}`)
);
