# Set up SmartAPI-TRAPI service


## Description

This project aims to help user set up a Translator Reasoner API (TRAPI) server based on SmartAPI specification.

## How to use

`docker run -p {port_id}:3000 biothings/smartapi2trapi --smartapi_id {smartapi_id}`

Replace **{port_id}** with the port ID you would like to run the application (TRAPI server is running on port 3000 within the docker).

Replace **{smartapi_id}** with the [SmartAPI ID](#how-to-locate-your-apis-smartapi-id) of your API registered in SmartAPI, which can be found in the [SmartAPI Registry](https://smart-api.info/registry).

For example, to set up a TRAPI API for [MyGene.info](https://smart-api.info/ui/59dce17363dce279d389100834e43648) (SmartAPI ID: 59dce17363dce279d389100834e43648), you could run:
`docker run -p 3000:3000 biothings/smartapi2trapi --smartapi_id 59dce17363dce279d389100834e43648`

Three endpoints will be available once the server is up.

1. **/**: smartapi interface
2. **/predicates**: get all predicates available from the API
3. **/query**: TRAPI query endpoint

### Access the SmartAPI interface for the API

`http://<HOST>:3000`

### Access the /predicates endpoint for the API

`http://<HOST>:3000/predicates`

### Access the /query endpoint for the API (need to use POST method and pass in query graph)

`POST http://<HOST>:3000/query`

## How to locate your API's SmartAPI ID

* Step 1: Go to [SmartAPI registry](https://smart-api.info/registry)

* Step 2: Search for your API within the registry

* Step 3: Click **Show Details**

* Step 4: You should see your SmartAPI ID now, which looks something like this:  67932b75e2c51d1e1da2bf8263e59f0a


---
## Development

For development, you will only need Node.js and a node global package, e.g. npm, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


---

## Install

    $ git clone https://github.com/kevinxin90/smartapi2trapi
    $ cd smartapi2trapi
    $ npm install


## Running the project

    $ npm start



## Deploy

A docker file is included in the base directory and can be used to build the customized container.

```bash
docker build -t biothings/smartapi2trapi .
```

Public Docker image located at [link](https://hub.docker.com/repository/docker/biothings/smartapi2trapi)
