import { FormEvent, useState } from 'react';

import './styles.css';

interface Task {
  id: number;
  name: string;
  done: boolean;
}

export function Main() {
  const [taskName, setTaskName] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([
    {
      id: 1,
      name: 'Estudar HTML',
      done: false
    }
  ]);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if(!taskName) return; 
  

    const newTask = {
      id: taskList.length + 1,
      name: taskName,
      done: false
    }

    setTaskList(taskList => [...taskList, newTask])
    setTaskName('');

    console.log(taskList);
  }

  function handleTogleTaskDone(id: number) {
    const newTask = taskList.map(taskList => taskList.id === id ? {
      ...taskList,
      done: !taskList.done
    } : taskList);

    setTaskList(newTask);
  }

  function handleDeleteTask(id: number) {
    const filteredLTaskList = taskList.filter(task => task.id != id);

    setTaskList(filteredLTaskList);
  }

  return (
    <div className="container">
      <h2>Lista de tarefas</h2>

      <form>
        <input
        className="text" 
          type="text"
          placeholder="Digite uma tarefa"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)} 
        />

        <button type='submit' onClick={handleCreateNewTask}>➕</button>
      </form>

      <div className="lista">
        <ul>
          {
            taskList.map(task => {
              return (
                <>
                  <input 
                    type="checkbox" 
                    className="checkbox"
                    checked={task.done}
                    onChange={() => handleTogleTaskDone(task.id)}
                  />
                  <li key={task.id} className={task.done ? 'completed' : ''}>{task.name}</li>
                  <button type='button' className='delete' onClick={() => handleDeleteTask(task.id)}>❌</button>
                </>
              );
            })    
          }
        </ul>
      </div>
    </div>
  );
}