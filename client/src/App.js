import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import moment from 'moment';
import taskService from './services/tasks';
import TasksPage from './pages/TasksPage';
import CreatePage from './pages/CreatePage';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        taskService
            .getAll()
            .then(data => { setTasks(data) });
    }, []);

    const addTask = async (task) => {
        task.state = "Aloittamaton";
        task.dateCreated = moment().format("DD.MM.YYYY");
        task.running = false;
        task.savedElapsedTime = 0;
        task.lastStartTime = 0;
        let result = await taskService.create(task);
        task._id = result._id;
        setTasks(prevTasks => {
            return [...prevTasks, task];
        });
    }

    const editTask = (task) => {
        setTasks(prevTasks => {
            return prevTasks.map(prevTask => {
                if (prevTask._id === task._id) {
                    return task;
                } else {
                    return prevTask;
                }
            });
        });
        taskService.update(task);
    }

    const removeTask = (id) => {
        setTasks(prevTasks => {
            return prevTasks.filter(task => task._id !== id);
        });
        taskService.remove(id);
    }

    return (
        <div>
            <BrowserRouter>
                <Route
                    exact path="/"
                    render={() =>
                        <TasksPage
                            tasks={tasks}
                            editTask={editTask}
                            removeTask={removeTask}
                        />
                    }
                />
                <Route
                    path="/create"
                    render={() =>
                        <CreatePage
                            addTask={addTask}
                            editTask={editTask}
                        />
                    }
                />
            </BrowserRouter>
        </div>
    );
};

export default App;