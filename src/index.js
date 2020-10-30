#!/usr/bin/env node
const createServer = require("./server");
const yargs = require('yargs/yargs')
const { hideBin } = yargs
const argv = yargs(hideBin(process.argv)).argv

let smartapiID;
if ("smartapi_id" in argv) {
    smartapiID = argv.smartapi_id;
} else if (argv._.length > 0) {
    smartapiID = argv._.reverse()[0];
} else {
    smartapiID = "27a5b60716c3a401f2c021a5b718c5b1"
}
app = createServer(smartapiID);

let port = argv.port || 3000;

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
