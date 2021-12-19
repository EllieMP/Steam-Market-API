dbConnection = new(require('../database/connection.js'));

/*
    Not used in any routes.  This file shows how the controllers were setup before making this prokect a RESTful api.
*/

class UserController {
    constructor(){
        console.log("User Controller Initialized");
    }

    getUserBySteamID(steamID) {
        return new Promise((resolve, reject) => {
            dbConnection.query({
                sql: 'SELECT * FROM MKT_user WHERE steam_id = ?',
                values: [steamID]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    updateTradeURL(steamID, url) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE MKT_user
                SET trade_url = ?
                WHERE steam_id = ?;
            `;
            
            dbConnection.query(
                {
                    sql: query,
                    values: [url, steamID]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(res);
            });
        });
    }

    // Adds a certain amout of currency to the user's balance.  A negative integer can be used to subtract.  
    addToUserBalance(steamID, value){
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE MKT_user
                SET balance = ?
                WHERE steam_id = ?;
            `;
            user = await this.getUserBySteamID(steamID);
            if (user[0].balance == null){
                dbConnection.query(
                    {
                        sql: query,
                        values: [value, steamID]
                    }, (err, res) => {
                        if(err) {
                            reject(err);
                        }
                        resolve(res);
                });
            }
            else {
                dbConnection.query(
                    {
                        sql: query,
                        values: [user[0].balance + value, steamID64]
                    }, (err, res) => {
                        if(err) {
                            reject(err);
                        }
                        resolve(res);
                });
            }
        });
    }
    
    /*
    subtractFromUserBalance(steamID, value){
        return new Promise((resolve, reject) => {
            const fullSteamID = new SteamID(steamID.toString());
            const steamID64 = fullSteamID.getSteamID64();
            const query = `
                UPDATE MKT_user
                SET balance = ?
                WHERE steam_id = ?;
            `;
            user = await this.getUserBySteamID(steamID);

            if (user[0].balance == null){
                reject('User does not have a wallet');
            }
            else {
                let newBalance = user[0].balance - value;
                if (newBalance < 0) {
                    reject('User does not have enough currency');
                }
                else {
                    dbConnection.query(
                        {
                            sql: query,
                            values: [newBalance, steamID64]
                        }, (err, res) => {
                            if(err) {
                                reject(err);
                            }
                            resolve(res);
                    });
                }
            }
        });
    */

}

module.exports = UserController;