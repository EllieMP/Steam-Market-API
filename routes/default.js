const botRouter = require('./botRouter.js');
const itemRouter = require('./itemRouter.js');
const userWithURL = require('./usersWithURLRouter.js');
const defaultRouter = require('koa-router')({
    prefix: '/api/v1'
});

// Sets the default page
defaultRouter.get('/', (ctx) => {
    ctx.body = `Welcome to the default api page.  Use the following routes to use the api.\n
    \tget | /api/v1/bot/*steam_id* 
    \t\tGets information on a bot by steam id.
    \t\tSample existing steam ids: "76561198095413743", "76561198124042350", and "76561198126203505"\n
    \tput | /api/v1/bot/update/*steam_id*/*status*
    \t\tChanges a bot's status\n
    \tpost | /api/v1/bot/new/*steam_id*/*status*
    \t\tCreates a new bot with a specific steamid\n
    \tget | /api/v1/item/*app_id*/*context_id*/*asset_id*
    \t\tGets an item by app_id, context_id, and asset_id
    \t\tSample id sets: "440/2/2447306840", "440/2/2453312381", and "440/2/2497620866"\n
    \tput | /api/v1/item/update/*app_id*/*context_id*/*asset_id*/*steam_id*
    \t\tUpdates an items owner.  Must be an existing bot id.
    \t\tSample id sets: "440/2/2447306840/76561198095413743" and "440/2/2453312381/6561198126203505"\n
    \tpost | /api/v1/item/new/*app_id*/*context_id*/*asset_id*/*amount*/*market_name*/*class_id*/*instance_id*/*steam_id*
    \t\tCreates a new item from specified paramaters\n
    \tdelete | /api/v1/item/delete/*app_id*/*context_id*/*asset_id*
    \t\tDeletes an item with the specified id sets.  Sample ids are the same as the get method.\n
    \tget | /api/v1/userURL/all
    \t\tGets all users from the view MKT_users_with_url with a trade url\n
    \tget | /api/v1/userURL/*steam_id*
    \t\tGets a user from MKT_user through the simple view MKT_users_with_url
    \t\tSample existing steam ids: "76561198095413743" and "76561198149154231"\n
    \tput | api/v1/userURL/update/*steam_id*/url
    \t\tUpdates the trade url of a user that already has a trade url.  Useful for when users reset their trade url.\n
    \tdelete | /api/v1/userURL/delete/*steam_id*
    \t\tDeletes a user from MKT_user through the simple view MKT_users_with_url
    \t\tSample existing steam ids: "76561198095413743" and "76561198149154231"`});

// Exposing routes from other files organized by table/view to the drfault route
defaultRouter.use(botRouter.routes());
defaultRouter.use(itemRouter.routes());
defaultRouter.use(userWithURL.routes());

module.exports = api => {
    api.use(
        defaultRouter.routes(), 
        defaultRouter.allowedMethods()
    );
}