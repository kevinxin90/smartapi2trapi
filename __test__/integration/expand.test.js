const expand = require("../../src/expand");

describe("Testing Expand Module", () => {
    describe("test expand function", () => {
        let ep;
        beforeEach(() => {
            ep = new expand();
        });
        test("test expand method if inputs is invalid", async () => {
            const inputs = [
                {
                    "type": "ChemicalSubstance",
                    "curie": "1234"
                }
            ];
            const res = await ep.expand(inputs);
            expect(res).toEqual({});
        });
        test("test expand method if inputs is valid", async () => {
            const inputs = [
                {
                    type: "Disease",
                    db_ids: {
                        MONDO: ["MONDO:0016575"]
                    },
                }
            ];
            const res = await ep.expand(inputs);
            expect(res).not.toEqual({});
            expect(res["MONDO:0016575"]).toHaveProperty("MONDO:0008984")
        });
    });
});