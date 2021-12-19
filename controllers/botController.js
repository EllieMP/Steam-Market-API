const dbConnection = require('../database/connection.js');

class BotController {

    // Retrieves a bot by it's steam id
    static async getBotBySteamID(ctx) {
        try{
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT * FROM MKT_bot WHERE steam_id = ?;
                `;
                dbConnection.query({
                        sql: query,
                        values: [ctx.params.steamid]
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
            console.log(`Error in the bot controller: ${err}`);
        }
    }

    // Changes a bot's status by steamid
    static async updateBotStatus(ctx){
        try{
            return new Promise((resolve, reject) => {
                const query = `UPDATE MKT_bot SET bot_status = ? WHERE steam_id = ?;`;
                console.log(ctx.params);
                dbConnection.query(
                    {
                        sql: query,
                        values: [ctx.params.status, ctx.params.steamid]
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
            console.log(`Error in the bot controller: ${err}`);
        }
    }
    
    // Adds a new bot to the database
    static async addBot(ctx){
        try{
            return new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO MKT_bot (steam_id, bot_status)
                    VALUES (?, ?);
                `;
                dbConnection.query(
                    {
                        sql: query,
                        values: [ctx.params.steamid, ctx.params.status]
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
            console.log(`Error in the bot controller: ${err}`);
        }
    }
}

module.exports = BotController;