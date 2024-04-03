// require syntax (if your code base does not support imports)
const yf2 = require('yahoo-finance2').default; // NOTE the .default

module.exports = {

    test2: async function () {
        const results = await yf2.search('AAPL');
        console.log(results);    
    }

  };



