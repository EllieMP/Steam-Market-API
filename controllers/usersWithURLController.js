dbConnection = require('../database/connection.js');

class UserController {

    // Gets all users within the view MKT_users_with_url
    static async getAllUsersWithURL(ctx){
        try{
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT * FROM MKT_users_with_url
                `;
                dbConnection.query({
                    sql: query
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
            console.log(`Error in the url view controller: ${err}`);
        }
    }

    // Gets a user in the aforementioned view by steamid
    static async getUserBySteamID(ctx) {
        try{
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT * FROM MKT_users_with_url WHERE steam_id = ?;
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
            console.log(`Error in the url view controller: ${err}`);
        }
    }

    // Deletes a user from MKT_user through the simple view MKT_users_with_url
   static async deleteUser(ctx) {
        try{
            return new Promise((resolve, reject) => {
                const query = 'DELETE FROM MKT_users_with_url WHERE steam_id = ?'
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
            console.log(`Error in the url view controller: ${err}`);
        }
    }

    // For convience.  Does the same thing as the function in the user controller
    static async updateTradeURL(ctx) {
        try{
            return new Promise((resolve, reject) => {
                const query = `
                    UPDATE MKT_users_with_url
                    SET trade_url = ?
                    WHERE steam_id = ?;
                `;
                
                dbConnection.query(
                    {
                        sql: query,
                        values: [ctx.params.url, ctx.params.steamid]
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
            console.log(`Error in the url view controller: ${err}`);
        }
    }

}

module.exports = UserController;