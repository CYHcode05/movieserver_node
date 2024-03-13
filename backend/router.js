module.exports = (app) =>{
    const user = require('./user.controller.js');
    const evaluation = require('./evaluation.controller.js');


    app.get('/evaluation', evaluation.findAll);
    app.get('/evaluation/:movieid', evaluation.findOne);
    app.post('/evaluation/:userid', evaluation.create);
    app.put('/evaluation/:movieid/:userid', evaluation.update);
    app.delete('/evaluation/:userid', evaluation.delete);

    app.get('/user', user.findAll);
    app.post('/user', user.create);
    app.get('/user/:userid', user.findOne);
    app.put('/user/:userid', user.update);
    app.delete('/user/:userid', user.delete);

}
