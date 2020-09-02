import React from 'react';
import { Link } from 'react-router-dom';
import Task from '../components/Task';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const TasksPage = ({ tasks, editTask, removeTask }) => {
    return (
        <div>
            <Box m="1rem">
                <Typography variant="h5">
                    Tehtävät
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nimi</TableCell>
                            <TableCell>Tila</TableCell>
                            <TableCell>Kuvaus</TableCell>
                            <TableCell>Kesto</TableCell>
                            <TableCell>Luotu</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <Task
                                key={task._id}
                                task={task}
                                editTask={editTask}
                                removeTask={removeTask}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container justify="flex-end">
                <Box m="1rem">
                    <Link to={{ pathname: '/create', task: null }}>
                        <Fab color="primary" aria-label="Add" >
                            <AddIcon />
                        </Fab>
                    </Link>
                </Box>
            </Grid>
        </div>
    );
}

export default TasksPage;