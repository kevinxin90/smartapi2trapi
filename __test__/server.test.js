const createServer = require("../src/server");
const request = require('supertest');

describe("Testing endpoints", () => {
    const app = createServer("59dce17363dce279d389100834e43648");

    test("GET /predicates", async () => {
        await request(app)
            .get("/predicates")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toHaveProperty("gene");
            })
    })
})