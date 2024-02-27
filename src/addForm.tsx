import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './taskThunks.ts';

const AddTaskForm: React.FC = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        dispatch(addTask(title));
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTaskForm;
