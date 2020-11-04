const meta_kg = require("@biothings-explorer/smartapi-kg");
const snakeCase = require("snake-case");


module.exports = async (smartapiID) => {
    const kg = new meta_kg();
    await kg.constructMetaKG(false, "translator", smartapiID);
    let predicates = {};
    const ops = kg.getOps();
    ops.map(op => {
        let input = snakeCase.snakeCase(op.association.input_type);
        let output = snakeCase.snakeCase(op.association.output_type);
        let pred = snakeCase.snakeCase(op.association.predicate);
        if (!(input in predicates)) {
            predicates[input] = {};
        }
        if (!(output in predicates[input])) {
            predicates[input][output] = [];
        }
        if (!(predicates[input][output].includes(pred))) {
            predicates[input][output].push(pred);
        }
    })
    return predicates;
}