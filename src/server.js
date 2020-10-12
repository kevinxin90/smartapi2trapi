const rt = require("./translate");
const pred = require("./predicates");
const express = require('express');
const compression = require('compression')
const cors = require("cors");
var bodyParser = require('body-parser');

const app = express()

app.use(cors());
app.use(compression());

const port = 3000
var jsonParser = bodyParser.json()

let smartapiID;
if (process.argv.length > 2) {
    smartapiID = process.argv[2];
} else {
    smartapiID = "27a5b60716c3a401f2c021a5b718c5b1";
}

app.get('/', (req, res) => {
    res.redirect("https://smart-api.info/ui/" + smartapiID);
})

app.get('/predicates', async (req, res) => {
    try {
        let predicates = await pred(smartapiID);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(predicates));
    } catch (error) {
        console.log(error);
        res.end();
    }
})


app.post('/query', jsonParser, async (req, res, next) => {
    //logger.info("query /query endpoint")
    try {
        const queryGraph = req.body.message.query_graph;
        let rt1 = new rt(queryGraph, smartapiID);
        await rt1.queryPlan();
        await rt1.queryExecute();
        //console.log(rt1.query_result);
        rt1.responseTranslate();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(rt1.reasonStdAPIResponse));
    } catch (error) {
        console.log(error);
        res.end();
    }
});


app.listen(port, () => console.log(`App listening at http://localhost:${port}`))