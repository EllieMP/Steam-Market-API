dbConnection = require('../database/connection.js');

class ItemController{

    /* 
    Finds an item based on app, context, and asset id
        In steam, an app id corosponds to a game or piece of software, a context id corosponds to a catagory in the game,
        and the asset id is a unique identifier within an app id and context id.  Together these values let a steam user 
        find any item on steam the user have permission to view.  This logic is reflected in the database from project 1
        and composite keys that make up the primary key for this controller.
    */
    static async findItem(ctx){
        try{
            return new Promise((resolve, reject) => {
                const query = `SELECT * FROM MKT_item WHERE app_id = ? AND context_id = ? AND asset_id = ?;`;
    
                dbConnection.query(
                    {
                        sql: query,
                        values: [ctx.params.appid, ctx.params.contextid, ctx.params.assetid]
                    }, (err, res) => {
                        if(err) {
                            ctx.body = err;
                            ctx.status = 500;
                            reject(err);
                        }
                        ctx.body = res;
                        ctx.status = 200;
                        resolve();
                });
            });
        } catch(err){
            console.log(`Error in the item controller: ${err}`);
        }
    }
    
    // Adds a new item to the database.  bot_id is optional
    static async addNewItem(ctx){
        try{
            return new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO MKT_item
                    (app_id, context_id, asset_id, amount, market_name, class_id, instance_id, bot_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                `;
                dbConnection.query(
                    {
                        sql: query,
                        values: [ctx.params.appid, ctx.params.contextid, ctx.params.assetid, ctx.params.amount, ctx.params.marketname, ctx.params.classid, ctx.params.instanceid, ctx.params.steamid]
                    }, (err, res) => {
                        if(err) {
                            ctx.body = err;
                            ctx.status = 500;
                            reject(err);
                        }
                        ctx.body = res;
                        ctx.status = 200;
                        resolve();
                });
            });
        } catch(err){
            console.log(`Error in the item controller: ${err}`);
        }
    }

    // Note that bot_id can refer to whoever owns the item, not just a bot.  It has been kept as bot_id because in the future, it will only store bot ids
    static async updateItemOwner(ctx){
        try{
            return new Promise((resolve, reject) => {
                console.log('\n\ngot here\n\n')
                const query = `
                UPDATE MKT_item
                SET bot_id = ?
                WHERE app_id = ? AND context_id = ? AND asset_id = ?`;
                dbConnection.query(
                    {
                        sql: query,
                        values: [ctx.params.steamid, ctx.params.appid, ctx.params.contextid, ctx.params.assetid]
                    }, (err, res) => {
                        if(err) {
                            ctx.body = err;
                            ctx.status = 500;
                            reject(err);
                        }
                        ctx.body = res;
                        ctx.status = 200;
                        resolve();
                });
            });
        } catch(err){
            console.log(`Error in the item controller: ${err}`);
        }
    }

    // Deletes an item based on appid, contextid, and assetid.
    static async removeItem(ctx) {
        try{
            return new Promise((resolve, reject) => {
                const query = `DELETE FROM MKT_item WHERE app_id = ? AND context_id = ? AND asset_id = ?`;
                dbConnection.query(
                    {
                        sql: query,
                        values: [ctx.params.appid, ctx.params.contextid, ctx.params.assetid]
                    }, (err, res) => {
                        if(err) {
                            ctx.body = err;
                            ctx.status = 500;
                            reject(err);
                        }
                        ctx.body = res;
                        ctx.status = 200;
                        resolve();
                });
            });
        } catch(err){
            console.log(`Error in the item controller: ${err}`);
        }
    }
}

module.exports = ItemController;