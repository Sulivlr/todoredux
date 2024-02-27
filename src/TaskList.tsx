import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {selectAllTasks, selectTasksLoading, selectTasksError} from './taskThunks.ts';
import {deleteTask, fetchTasks} from "./taskThunks.ts";

const TaskList: React.FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);
    const loading = useSelector(selectTasksLoading);
    const error = useSelector(selectTasksError);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const DeleteTask = (id: string) => {
        dispatch(deleteTask(id));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <input type="checkbox" checked={task.status}/>
                    <span>{task.title}</span>
                    <button onClick={() => DeleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
