const itemController = require('../controllers/itemController')
const itemRouter = require('koa-router')({
    prefix: '/item'
});

itemRouter.get('/:appid/:contextid/:assetid', itemController.findItem);

itemRouter.put('/update/:appid/:contextid/:assetid/:steamid', itemController.updateItemOwner)

itemRouter.post('/new/:appid/:contextid/:assetid/:amount/:marketname/:classid/:instanceid/:steamid', itemController.addNewItem)

itemRouter.delete('/delete/:appid/:contextid/:assetid', itemController.removeItem)

module.exports = itemRouter;