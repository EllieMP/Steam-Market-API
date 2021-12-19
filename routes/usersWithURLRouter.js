const userUrlController = require('../controllers/usersWithURLController.js');
const userURLRouter = require('koa-router')({
    prefix: '/userURL'
});


// Can be done since user with url is a simple view
userURLRouter.get('/all', userUrlController.getAllUsersWithURL)

userURLRouter.delete('/delete/:steamid', userUrlController.deleteUser)

userURLRouter.get('/:steamid', userUrlController.getUserBySteamID)

userURLRouter.put('/update/:steamid/:url', userUrlController.updateTradeURL)

module.exports = userURLRouter;