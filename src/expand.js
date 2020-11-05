/**
 * Expand Biomedical objects to include its descendant objects.
 * @module smartapi2trapi/expand
 */
const metakg = require("@biothings-explorer/smartapi-kg");
const call_api = require("@biothings-explorer/call-apis");
const _ = require("lodash");

/** Class to perform node expansion. */
module.exports = class Expander {
    /**
     * Initialize metaKG.
     */
    constructor() {
        this.kg = new metakg();
        this.kg.constructMetaKGSync("biothings");
    }

    /**
     * Retrieve an array of SmartAPI edges delivering subclass relationship
     * @param {string} - semanticType 
     * @return {Array} - An array of SmartAPI edges
     */
    getEdges(semanticType) {
        return this.kg.filter({
            input_type: semanticType,
            output_type: semanticType,
            predicate: "has_subclass"
        })
    }

    /**
     * Restructure response from call api
     * @param {Array} res - An array of structured response
     * @return {object} The restructured response.
     */
    parseResponse(res) {
        if (Array.isArray(res) && res.length > 0) {
            let result = {};
            res.map(rec => {
                if (!(rec["$input"] in result)) {
                    result[rec["$input"]] = {};
                }
                if ("$output_id_mapping" in rec && "resolved" in rec["$output_id_mapping"]) {
                    result[rec["$input"]][rec["$output_id_mapping"]["resolved"]["id"]["identifier"]] = rec["$output_id_mapping"]["resolved"]
                }
            });
            return result;
        }
    }

    /**
     * Group outputs based on semantic type
     * @param {Array} output_ids - An array of output biomedical objects.
     * @return {Object} 
     */
    groupIDsbySemanticType(output_ids) {
        let result = {};
        output_ids.map(item => {
            if (!(item.type in result)) {
                result[item.type] = [];
            }
            result[item.type].push(item);
        });
        return result
    }

    /**
     * Make a curie based on ID
     * @param {string} prefix - id prefix
     * @param {string} val - id value
     * @return {string} curie
     */
    id2curie(prefix, val) {
        const ID_WITH_PREFIXES = ["MONDO", "DOID", "UBERON",
            "EFO", "HP", "CHEBI", "CL", "MGI"];
        if (ID_WITH_PREFIXES.includes(prefix)) {
            return val;
        }
        return prefix + ':' + val;
    }

    /**
     * Create bte edges based on SmartAPI edges and inputs
     * @param {array} edges - an array of SmartAPI edges
     * @param {array} inputs - an array of input objects
     */
    annotateEdgesWithInput(edges, inputs) {
        if (!Array.isArray(inputs)) {
            inputs = [inputs];
        }
        let annotatedEdges = [];
        edges.map(edge => {
            if (edge.query_operation.supportBatch === true) {
                let copy_edge = _.cloneDeep(edge);
                let input_ids = new Set();
                let original_input = {};
                inputs.map(_input => {
                    let prefix = copy_edge.association.input_id;
                    if (prefix in _input.db_ids) {
                        _input.db_ids[prefix].map(val => {
                            input_ids.add(val);
                            original_input[this.id2curie(prefix, val)] = _input;
                        })
                    }
                });
                input_ids = Array.from(input_ids);
                let i, j;
                for (i = 0, j = input_ids.length; i < j; i += 1000) {
                    copy_edge.input = input_ids.slice(i, i + 1000);
                    copy_edge.original_input = original_input;
                    annotatedEdges.push(_.cloneDeep(copy_edge))
                }
            } else {
                inputs.map(_input => {
                    let prefix = edge.association.input_id;
                    if (prefix in _input.db_ids) {
                        _input.db_ids[prefix].map(_id => {
                            let copy_edge = _.cloneDeep(edge);
                            copy_edge.input = _id;
                            copy_edge.original_input = {
                                [this.id2curie(prefix, _id)]: _input
                            };
                            annotatedEdges.push(_.cloneDeep(copy_edge))
                        })
                    }
                })
            }
        });
        return annotatedEdges;
    }

    async expand(inputs) {
        let grpedIDs = this.groupIDsbySemanticType(inputs);
        let bte_edges = [];
        let semanticType;
        for (semanticType in grpedIDs) {
            let smartapi_edges = this.getEdges(semanticType);
            if (Array.isArray(smartapi_edges) && smartapi_edges.length > 0) {
                let tmp_edges = this.annotateEdgesWithInput(smartapi_edges, grpedIDs[semanticType]);
                if (tmp_edges.length > 0) {
                    bte_edges = [...bte_edges, ...tmp_edges];
                }
            }
        };
        if (bte_edges.length > 0) {
            let executor = new call_api(bte_edges);
            await executor.query();
            return this.parseResponse(executor.result);
        } else {
            return {};
        }
    }
}