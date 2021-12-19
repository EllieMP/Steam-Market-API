const botController = require('../controllers/botController');
const botRouter = require('koa-router')({
    prefix: '/bot' // bot table functions path
});

// Using static async methods as functions to get closer to making the api store less temporary data
botRouter.get('/:steamid', botController.getBotBySteamID);

botRouter.put('/update/:steamid/:status', botController.updateBotStatus);

botRouter.post('/new/:steamid/:status', botController.addBot);

module.exports = botRouter;
