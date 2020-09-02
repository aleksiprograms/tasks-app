const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATABASE_URI = require('./config/keys').MONGODB_URI;
mongoose.connect(
    DATABASE_URI,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Database connected');
        }
    }
);

const Task = require('./models/Task');

app.get('/tasks', (request, response) => {
    Task.find(
        {},
        (error, tasks) => {
            if (error) {
                return response.status(500);
            } else {
                return response.status(200).json(tasks);
            }
        }
    ).sort({ dateCreated: -1 });
});

app.post('/tasks', (request, response) => {
    const newTask = new Task(request.body);
    newTask.save(
        (error, task) => {
            if (error) {
                return response.status(500);
            } else {
                return response.status(200).json({ _id: task._id });
            }
        }
    );
});

app.put('/tasks/:id', (request, response) => {
    Task.findByIdAndUpdate(
        request.params.id,
        request.body,
        (error, task) => {
            if (error) {
                return response.status(500);
            } else {
                return response.status(200);
            }
        }
    );
});

app.delete('/tasks/:id', (request, response) => {
    Task.findByIdAndRemove(
        request.params.id,
        (error, task) => {
            if (error) {
                return response.status(500);
            } else {
                return response.status(200);
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});