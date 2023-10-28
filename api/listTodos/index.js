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

    const querySpec = {
        query: "SELECT * FROM root r"
    };

    const items = await taskDao.find(querySpec);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: items
    };
}