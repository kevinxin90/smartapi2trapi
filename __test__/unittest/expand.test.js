const expand = require("../../src/expand");
const meta_kg = require("@biothings-explorer/smartapi-kg");
const call_api = require("@biothings-explorer/call-apis");
const _ = require("lodash");


jest.mock("@biothings-explorer/smartapi-kg");
jest.mock(
    "@biothings-explorer/call-apis"
);
//jest.mock("lodash");

describe("Testing expand module", () => {
    describe("test get edges", () => {
        beforeEach(() => {
            meta_kg.mockClear();
        });
        test("test get edges", () => {
            const filter_fn = jest.fn(() => [1])
            meta_kg.mockImplementation(() => {
                return {
                    constructMetaKGSync: () => {
                    },
                    filter: filter_fn
                }
            })
            const ep = new expand();
            expect(ep.getEdges("Gene")).toEqual([1]);
            expect(filter_fn.mock.calls.length).toBe(1);
            expect(filter_fn.mock.calls[0][0]).toHaveProperty("input_type");
            expect(filter_fn.mock.calls[0][0]["input_type"]).toBe("Gene")
        });
    })

    describe("test groupByEdges", () => {
        test("test groupByEdges using valid output_ids", () => {
            const ep = new expand();
            const output_ids = [
                {
                    curie: "NCBIGene:1017",
                    type: "Gene"
                },
                {
                    curie: "NCBIGene:1018",
                    type: "Gene"
                },
                {
                    curie: "CHEMBL.COMPOUND:CHEMBL744",
                    type: "ChemicalSubstance"
                },
            ];
            const res = ep.groupIDsbySemanticType(output_ids);
            expect(res).toHaveProperty("Gene");
            expect(res).toHaveProperty("ChemicalSubstance");
            expect(res['Gene']).toHaveLength(2);
            expect(res['Gene'][0]['type']).toEqual("Gene");
        })

        test("test groupByEdges if output ids is empty", () => {
            const ep = new expand();
            const output_ids = [];
            const res = ep.groupIDsbySemanticType(output_ids);
            expect(res).toEqual({});
        });
    })

    describe("test id2curie", () => {
        test("test id2curie if id should not be prefixed", () => {
            const ep = new expand();
            const res = ep.id2curie("NCBIGene", "1017")
            expect(res).toEqual("NCBIGene:1017");
        });

        test("test id2curie if id should not be prefixed and value is integer", () => {
            const ep = new expand();
            const res = ep.id2curie("NCBIGene", 1017)
            expect(res).toEqual("NCBIGene:1017");
        });

        test("test id2curie if id should be prefixed", () => {
            const ep = new expand();
            const res = ep.id2curie("HP", "HP:0007")
            expect(res).toEqual("HP:0007");
        });
    })

    describe("test parseResponse", () => {
        test("test parseResponse if input is an empty array", () => {
            const ep = new expand();
            const res = ep.parseResponse([]);
            expect(res).toBeUndefined();
        });

        test("test parseResponse if input is not an array", () => {
            const ep = new expand();
            const res = ep.parseResponse({});
            expect(res).toBeUndefined();
        });

        test("test parseResponse with valid input", () => {
            const ep = new expand();
            const input = [
                {
                    "$input": "NCBIGene:1017",
                    "$output_id_mapping": {
                        resolved: {
                            id: {
                                identifier: "CHEBML744"
                            }
                        }
                    }
                }
            ];
            const res = ep.parseResponse(input);
            expect(res).toHaveProperty(input[0]["$input"]);
            expect(res[input[0]["$input"]]).toHaveProperty(input[0]["$output_id_mapping"].resolved.id.identifier);
        });
    })

    describe("test annotateEdgesWithInput method", () => {
        let ep;
        beforeEach(() => {
            ep = new expand();
        });
        test("test with valid inputs", () => {
            const edges = [
                {
                    query_operation: {
                        supportBatch: true
                    },
                    association: {
                        input_id: "NCBIGene"
                    }
                },
                {
                    query_operation: {
                        supportBatch: false
                    },
                    association: {
                        input_id: "NCBIGene"
                    }
                },
            ];
            const inputs = [
                {
                    db_ids: {
                        "NCBIGene": ["1017"]
                    }
                },
                {
                    db_ids: {
                        "NCBIGene": ["1018"]
                    }
                }
            ];
            const res = ep.annotateEdgesWithInput(edges, inputs);
            expect(res).toHaveLength(3);
        })
    })
});