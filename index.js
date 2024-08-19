import express from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import { toi } from './functions/TimesOfIndia.js';
import { hindustantimes } from "./functions/HindustanTimes.js";
import { ndtv } from "./functions/ndtv.js";
import { fileURLToPath } from 'url';

const app = express();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Setting up EJS and view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const fetchData = async () => {
    const toiData = await toi();
    const hindustantimesData = await hindustantimes();
    const ndtvData = await ndtv();

    console.log("DATA RETURNED SUCCESSFUL")
    return { toiData, hindustantimesData, ndtvData };
};

app.get('/', async (req, res) => {
    try {
        console.log("FETCHING DATA ...")
        const { toiData, hindustantimesData, ndtvData } = await fetchData();
        console.log("DATA FETCHED SUCCESSFULLY")

        res.render("home", { toiData, hindustantimesData, ndtvData });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Something went wrong");
    }
});



app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000!");
});
