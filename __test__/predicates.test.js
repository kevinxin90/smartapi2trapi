const predicates = require("../src/predicates");
const meta_kg = require("@biothings-explorer/smartapi-kg");
const snakeCase = require("snake-case");


jest.mock("@biothings-explorer/smartapi-kg");
jest.mock("snake-case")

describe("Testing constructing predicates", () => {
    beforeEach(() => {
        meta_kg.mockClear();
        snakeCase.snakeCase.mockImplementation((item) => {
            return item
        })
    });

    test("test constructing predicates function without mock", async () => {
        meta_kg.mockImplementation(() => {
            return {
                getOps: () => {
                    return [
                        {
                            association: {
                                input_type: "Gene",
                                output_type: "ChemicalSubstance",
                                predicate: "related_to"
                            }
                        },
                        {
                            association: {
                                input_type: "Gene",
                                output_type: "ChemicalSubstance",
                                predicate: "treats"
                            }
                        },
                        {
                            association: {
                                input_type: "Gene",
                                output_type: "Disease",
                                predicate: "related_to"
                            }
                        },
                        {
                            association: {
                                input_type: "PhenotypicFeature",
                                output_type: "ChemicalSubstance",
                                predicate: "related_to"
                            }
                        }
                    ];
                },
                constructMetaKG: (includeReasoner = false, tag = "translator", smartapiID = undefined) => {
                    return undefined;
                }
            }
        })
        const pd = await predicates("978fe380a147a8641caf72320862697b");
        expect(pd).toHaveProperty("Gene");
        expect(pd['Gene']).toHaveProperty("ChemicalSubstance");
        expect(pd['Gene']).toHaveProperty("Disease");
        expect(pd['Gene']['ChemicalSubstance']).toContain("treats");
        expect(pd).toHaveProperty("PhenotypicFeature");
        expect(pd).not.toHaveProperty("chemical")
    });

    test("test constructing predicates function using mock", async () => {
        meta_kg.mockImplementation(() => {
            return {
                getOps: () => {
                    return [];
                },
                constructMetaKG: (includeReasoner = false, tag = "translator", smartapiID = undefined) => {
                    return undefined;
                }
            }
        })
        const pd = await predicates("978fe380a147a8641caf72320862697b");
        expect(pd).toEqual({});
    });



});