const express = require("express");
const TodoController = require('../controllers/todo.controller');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const authentication = require('../middleware/auth.middleware').authentication

const router = express.Router();


/**
 * Get the JWT access token for the User
 */
 router.get("/token", jsonParser,authentication, async(req, res, next) => {
    let body = req.body;
    let userName = body.userName;
    if(!userName){
        res.status(400).send({
            err : 'Payload error'
        });
    }

    let user = {
        name : userName
    }
    try{
        const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        console.log("access_token : ", access_token)
        res.status(200).send({access : access_token})
    }
    catch (err){
        console.log(err)
        res.status(400).send({err : err})
    }
});

router.post('/', TodoController.createTodo);

router.get('/', TodoController.getTodos);

router.get('/:todoId', TodoController.getTodo);

router.put('/:todoId', TodoController.updateTodo);

router.patch('/:todoId', TodoController.completeTodo);

router.delete('/:todoId', TodoController.deleteTodo);

module.exports = router;