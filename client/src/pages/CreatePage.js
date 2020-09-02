import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const CreatePage = ({ addTask, editTask }) => {
    const [task, setTask] = useState({
        name: '',
        description: '',
    });
    const [title, setTitle] = useState('');
    const [newTask, setNewTask] = useState(true);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.task != null) {
            setTitle('Muokkaa tehtävää');
            setTask(location.task);
            setNewTask(false);
        } else {
            setTitle('Luo uusi tehtävä');
            setNewTask(true);
        }
    }, [location.task]);

    const submit = (event) => {
        event.preventDefault();
        if (newTask) {
            addTask(task);
        } else {
            editTask(task);
        }
        history.push('/');
    }

    const cancel = () => {
        history.push('/');
    }

    return (
        <div>
            <Box m="1rem">
                <Typography variant="h5">
                    {title}
                </Typography>
            </Box>
            <Grid container justify="center" direction="column">
                <Box ml="25%" mr="25%" mt="1rem" mb="1rem">
                    <Box mb="1rem">
                        <FormControl fullWidth>
                            <InputLabel>Nimi</InputLabel>
                            <Input
                                value={task.name}
                                onChange={({ target }) => {
                                    setTask(prevState => {
                                        return {
                                            ...prevState,
                                            name: target.value
                                        }
                                    });
                                }}
                            />
                        </FormControl>
                    </Box>
                    <FormControl fullWidth>
                        <InputLabel>Kuvaus</InputLabel>
                        <Input
                            value={task.description}
                            onChange={({ target }) => {
                                setTask(prevState => {
                                    return {
                                        ...prevState,
                                        description: target.value
                                    }
                                });
                            }}
                        />
                    </FormControl>
                </Box>
                <Grid container justify="center" direction="row">
                    <Box m="0.5rem">
                        <Button
                            size='medium'
                            variant="contained"
                            color="secondary"
                            onClick={cancel}>
                            PERUUTA
                        </Button>
                    </Box>
                    <Box m="0.5rem">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={submit}>
                            TALLENNA
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default CreatePage;