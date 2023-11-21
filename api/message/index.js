module.exports = async function (context, req) {
    context.log('Header: ' + req.headers['authorization']);

    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');

    context.log("client principal: " + decoded)

    context.res = {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.parse(decoded)
    };

    // module.exports = async function (context, req) {

    //     context.log('Header: ' + req.headers['authorization']);


    //     context.res.json({
    //         text: "Hello from the API"
    //     });
};