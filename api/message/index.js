const customers = require('../data/customers.json');

module.exports = async function (context, req) {
    context.res = {
        headers: {
          'Content-Type': 'application/json'    
        },
        body: customers
    };

// module.exports = async function (context, req) {
    
//     context.log('Header: ' + req.headers['authorization']);
   
    
//     context.res.json({
//         text: "Hello from the API"
//     });
};