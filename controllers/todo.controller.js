const Todo = require("../models/todo.models");


// To get list of Todos
exports.getTodos = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Set up Todo query
    const TodoQuery = Todo.find().sort({
        onDate: -1
    });
    // Execute todo query
    TodoQuery.then(
            todos => {
                if (!todos.length) {
                    return res.status(404).json({
                        'status': 'Success',
                        'message': 'No Todos found!',
                        'todos': todos,
                        'todoCount': todos.length
                    });
                }
                res.status(200).json({
                    'status': 'Success',
                    'message': 'Todos Fetched Successfully!',
                    'todos': todos,
                    'todoCount': todos.length
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}

