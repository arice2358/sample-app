// @ts-check
const CosmosClient = require('@azure/cosmos').CosmosClient
const debug = require('debug')('todo:taskDao')

// For simplicity we'll set a constant partition key
const partitionKey = "/id"
class TaskDao {
  /**
   * Manages reading, adding, and updating Tasks in Azure Cosmos DB
   * @param {CosmosClient} cosmosClient
   * @param {string} databaseId
   * @param {string} containerId
   * @param {string} userId
   */
  constructor(cosmosClient, databaseId, containerId, userId) {
    this.client = cosmosClient
    this.databaseId = databaseId
    this.collectionId = containerId
    this.userId = userId

    this.database = null
    this.container = null
  }

  async init() {
    debug('Setting up the database...')
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId
    })
    this.database = dbResponse.database
    debug('Setting up the database...done!')
    debug('Setting up the container...')
    const coResponse = await this.database.containers.createIfNotExists({
      id: this.collectionId
    })
    this.container = coResponse.container
    debug('Setting up the container...done!')
  }

  async find() {
    debug('Querying for items from the database')

    if (!this.container) {
      throw new Error('Collection is not initialized.')
    }

    // const querySpec = {
    //   query: "SELECT * FROM root r"
    // };

    const querySpec = {
      query: "SELECT * FROM root r WHERE r.owner=@owner",
      parameters: [
        {
          name: "@owner",
          value: this.userId
        }
      ]
    };

    const { resources } = await this.container.items.query(querySpec).fetchAll()
    return resources
  }

  async addItem(item) {
    debug('Adding an item to the database')

    if (!this.container) {
      throw new Error('Collection is not initialized.')
    }

    item.date = Date.now()
    item.completed = false
    item.owner = this.userId
    const { resource: doc } = await this.container.items.create(item)
    return doc
  }

  async updateItem(item) {
    debug('Update an item in the database')

    if (!this.container) {
      throw new Error('Collection is not initialized.')
    }

    let dbItem = await this.getItem(item.id);

    if (dbItem.owner != this.userId) {
      throw new Error('User not authorized to delete this item.');
    }

    item.owner = this.userId;

    const { resource: replaced } = await this.container
      .item(item.id, item.id)
      .replace(item);
    return replaced
  }

  async getItem(itemId) {
    debug('Getting an item from the database')

    if (!this.container) {
      throw new Error('Collection is not initialized.')
    }

    const { resource } = await this.container.item(itemId, itemId).read()
    return resource
  }

  async deleteItem(itemId) {
    debug('Deleting an item from the database');

    if (!this.container) {
      throw new Error('Collection is not initialized.')
    }


    let dbItem = await this.getItem(itemId);

    if (dbItem.owner != this.userId) {
      throw new Error('User not authorized to delete this item.');
    }

    const { resource } = await this.container.item(itemId, itemId).delete();
  }
}

module.exports = TaskDao