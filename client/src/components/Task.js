import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrowRounded';
import PauseIcon from '@material-ui/icons/PauseRounded';
import StopIcon from '@material-ui/icons/StopRounded';
import EditIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';

const Task = ({ task, editTask, removeTask }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [savedInterval, setSavedInterval] = useState();

    useEffect(() => {
        if (task.running) {
            let alreadyElapsedTime = task.savedElapsedTime
                + (Date.now() - task.lastStartTime);
            setElapsedTime(alreadyElapsedTime);
            start(alreadyElapsedTime);
        } else {
            setElapsedTime(task.savedElapsedTime);
        }
        return () => {
            clearInterval(savedInterval);
        };
    }, []);

    const start = (alreadyElapsedTime) => {
        let timeNow = Date.now();
        editTask({
            ...task,
            running: true,
            savedElapsedTime: alreadyElapsedTime,
            lastStartTime: timeNow,
            state: "Työnalla",
        });
        let lastTimeFromIntervalEnd = timeNow;
        let interval = setInterval(() => {
            timeNow = Date.now();
            let delta = timeNow - lastTimeFromIntervalEnd;
            setElapsedTime(prevTime => prevTime + delta);
            lastTimeFromIntervalEnd = timeNow;
        }, 1000 * 60);
        setSavedInterval(interval);
    };

    const stop = () => {
        clearInterval(savedInterval);
        editTask({
            ...task,
            running: false,
            savedElapsedTime: elapsedTime,
            lastStartTime: 0,
            state: "Valmis",
        });
    };

    const pause = () => {
        clearInterval(savedInterval);
        editTask({
            ...task,
            running: false,
            savedElapsedTime: elapsedTime,
            lastStartTime: 0,
            state: "Kesken",
        });
    };

    const renderTime = () => {
        let formatedTime = {
            hours: Math.floor((elapsedTime / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((elapsedTime / (1000 * 60)) % 60),
        };
        return (
            <div>
                <span>{formatedTime.hours}</span>
                <span>h </span>
                <span>{formatedTime.minutes}</span>
                <span>min</span>
            </div>
        );
    };

    const getStateColor = () => {
        switch (task.state) {
            case 'Aloittamaton':
                return '#ffffff';
            case 'Kesken':
                return '#ffff00';
            case 'Työnalla':
                return '#0000ff';
            case 'Valmis':
                return '#00ff00';
            default:
                return '#ffffff';
        }
    }

    return (
        <TableRow>
            <TableCell>
                {task.name}
            </TableCell>
            <TableCell style={{ backgroundColor: getStateColor(), minWidth: "6rem" }}>
                {task.state}
            </TableCell>
            <TableCell>
                {task.description}
            </TableCell>
            <TableCell style={{ minWidth: "5rem" }}>
                {renderTime()}
            </TableCell>
            <TableCell>
                {task.dateCreated}
            </TableCell>
            <TableCell align="right" style={{ minWidth: "8rem" }}>
                {task.running ?
                    <IconButton
                        size="small"
                        onClick={() => pause()}
                    >
                        <PauseIcon color="secondary" />
                    </IconButton>
                    :
                    <IconButton
                        size="small"
                        onClick={() => start(elapsedTime)}
                    >
                        <PlayIcon color="primary" />
                    </IconButton>
                }
                <IconButton
                    size="small"
                    onClick={() => stop()}
                >
                    <StopIcon color="secondary" />
                </IconButton>
                <Link to={{ pathname: '/create', task: task }}>
                    <IconButton size="small">
                        <EditIcon />
                    </IconButton>
                </Link>
                <IconButton
                    size="small"
                    onClick={() => removeTask(task._id)}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default Task;