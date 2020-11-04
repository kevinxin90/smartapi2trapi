const predicates = require("../../src/predicates");

describe("Testing constructing predicates", () => {

    test("test constructing predicates function without mock", async () => {
        const pd = await predicates("978fe380a147a8641caf72320862697b");
        expect(pd).toHaveProperty("gene");

    });
});