const rt = require("./translate");
const pred = require("./predicates");
const express = require('express');
const compression = require('compression')
const cors = require("cors");
var bodyParser = require('body-parser');

const createServer = (smartapiID) => {
    const app = express()

    app.use(cors());
    app.use(compression());
    app.use(require('express-status-monitor')());

    var jsonParser = bodyParser.json()

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
    return app;
}

module.exports = createServer;

