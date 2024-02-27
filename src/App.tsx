import React from 'react';
import TaskList from './TaskList';
import AddTaskForm from './addForm.tsx';

const App: React.FC = () => {
    return (
        <div>
            <h1>Todo App</h1>
            <TaskList />
            <AddTaskForm />
        </div>
    );
};

export default App;