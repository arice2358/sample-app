const CosmosClient = require('@azure/cosmos').CosmosClient
const TaskDao = require("../shared/taskDao");
const CurrentUser = require('../shared/currentUser');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log("Deleting todo id=" + context.bindingData.id);

    const header = req.headers['x-ms-client-principal'];
    const currentUser = new CurrentUser(header);
    const userId = await currentUser.getCurrentUser();

    const cosmosClient = new CosmosClient({
        endpoint: process.env.HOST,
        key: process.env.AUTH_KEY
    })

    const taskDao = new TaskDao(cosmosClient, "ToDoList", "Items", userId);

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

    // delete the item
    await taskDao.deleteItem(context.bindingData.id);

    context.res = {
        status: 200
    };
}