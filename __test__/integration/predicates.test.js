const predicates = require("../../src/predicates");

describe("Testing constructing predicates", () => {

    test("test with text mining targeted association API", async () => {
        const pd = await predicates("978fe380a147a8641caf72320862697b");
        expect(pd).toHaveProperty("gene");
        expect(pd['gene']).toHaveProperty("chemical_substance");
        expect(pd['gene']['chemical_substance']).toHaveLength(2);
        expect(pd['gene']['chemical_substance']).toContain("positively_regulated_by")
    });

    test("test with an invalid smartapi ID", async () => {
        const pd = await predicates("9b");
        expect(pd).toEqual({});
    });

    test("test with a valid smartapi ID, but no x-bte extension", async () => {
        const pd = await predicates("97ad4a3edb7aba4ee00448455b8a14fd");
        expect(pd).toEqual({});
    });
});