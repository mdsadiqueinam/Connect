const queries = require('./queries.resolver');
const mutations = require('./mutations.resolver');

module.exports = {
    ...queries,
    ...mutations
}