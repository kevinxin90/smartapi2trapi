const translator = require("../../src/translate");

describe("Testing translate module", () => {

    describe("snake2Pascal", () => {
        let rt;
        beforeEach(() => {
            rt = new translator({ nodes: [], edges: [] });
        });
        test("test with valid input", () => {
            const queryGraph = {
                "edges": [
                    {
                        "id": "qg3",
                        "source_id": "qg1",
                        "target_id": "qg2"
                    },
                    {
                        "id": "qg4",
                        "source_id": "qg0",
                        "target_id": "qg2"
                    }
                ],
                "nodes": [
                    {
                        "id": "qg0",
                        "name": "viral pneumonia",
                        "curie": "DOID:10533",
                        "type": "disease"
                    },
                    {
                        "id": "qg1",
                        "name": "hereditary angioedema",
                        "curie": "DOID:14735",
                        "type": "disease"
                    },
                    {
                        "id": "qg2",
                        "type": "gene"
                    },
                    {
                        "id": "qg3",
                        "type": "chemical_substance"
                    },
                    {
                        "id": "qg4",
                    }
                ]
            };
            rt.queryGraph = queryGraph;
            expect(rt.queryGraph.nodes[0].type).toEqual("disease");
            expect(rt.queryGraph.nodes).toHaveLength(queryGraph.nodes.length);
            rt.snake2Pascal();
            expect(rt.queryGraph.nodes[0].type).toEqual("Disease");
            expect(rt.queryGraph.nodes[3].type).toEqual("ChemicalSubstance");
            expect(rt.queryGraph.nodes).toHaveLength(queryGraph.nodes.length);
        })
    })
});