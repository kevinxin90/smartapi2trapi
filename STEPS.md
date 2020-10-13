# How to Set up a TRAPI service from BioThings API

## Step 1: Use BioThings Studio to set BioThings API

[Link to BioThings Studio tutorial](https://docs.biothings.io/en/latest/doc/studio.html)

## Step 2: Annotate your API using SmartAPI

[How to add x-bte extension to SmartAPI](https://x-bte-extension.readthedocs.io/en/latest/)

All BioThings API share the same query syntax and endpoints. So it's very easy to simply modify the SmartAPI files for existing BioThings API to fit your new API.

Example SmartAPI specifications for existing BioThings APIs:

1. [Text Mining KP API](http://text-mining-target-assoc.smart-api.info/editor/978fe380a147a8641caf72320862697b)

2. [MyDisease.info API](http://text-mining-target-assoc.smart-api.info/editor/f307760715d91908d0ae6de7f0810b22)

3. [Multiomics TCGA Mut Freq API](http://text-mining-target-assoc.smart-api.info/editor/5219cefb9d2b8d5df08c3a956fdd20f3)

## Step 3: Register your API in SmartAPI and get your unique SmartAPI ID

[Link](https://smart-api.info/add_api)

## Step 4: Spin up your TRAPI service

[Documentation](https://github.com/kevinxin90/smartapi2trapi/blob/main/README.md)