const CosmosClient = require('@azure/cosmos').CosmosClient
const TaskDao = require("../shared/taskDao");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
 
    const cosmosClient = new CosmosClient({
        endpoint: process.env.HOST,
        key: process.env.AUTH_KEY
    })

    const taskDao = new TaskDao(cosmosClient, "ToDoList", "Items");

    await taskDao
        .init(err => {
            console.error(err)
        })
        .catch(err => {
            console.error(err)
            console.error(
                'Shutting down because there was an error setting up the database.'
            )
            process.exit(1)
        })

    // create the item
    const item = await taskDao.addItem(req.body);

    // return the created item
    context.res = {
        status: 201,
        body: item
    };
}