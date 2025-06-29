import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTasks, removeTask, updateTask } from './features/tasks/taskSlice';
import { getTasks, deleteTask, updateTask as apiUpdateTask } from './services/taskService';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters'; // <-- importa filtros
import { createTask } from './services/taskService';

const App = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const filters = useAppSelector((state) => state.filters);  // <-- estado filtros


  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    getTasks().then((data) => dispatch(setTasks(data)));
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      dispatch(removeTask(id));
    } catch (error) {
      console.error('Error eliminando tarea:', error);
    }
  };

  const handleEditClick = (id: number) => {
    setEditingTaskId(id);
    setShowForm(true);
  };

  const handleUpdate = async (updatedTaskData: any) => {
    try {
      const updatedTask = await apiUpdateTask(editingTaskId!, updatedTaskData);
      dispatch(updateTask(updatedTask));
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error actualizando tarea:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
   
    if (filters.status === 'completed' && !task.completed) return false;
    if (filters.status === 'pending' && task.completed) return false;
    if (filters.dueDate) {
      const filterDateStr = filters.dueDate; // formato 'YYYY-MM-DD'

      const taskDate = new Date(task.dueDate);
      const taskDateStr = new Date(
        taskDate.getUTCFullYear(),
        taskDate.getUTCMonth(),
        taskDate.getUTCDate()
      ).toISOString().split('T')[0];


      if (taskDateStr !== filterDateStr) return false;
    }

    return true;
  });

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1
        className="text-4xl font-extrabold mb-10 text-center text-blue-800"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
      >
        Gestión de Tareas
      </h1>

      {/* FILTRO*/}
      <TaskFilters />

      {/* Boton Agregar nueva tarea*/}
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => {
          setEditingTaskId(null);
          setShowForm(true);
        }}
      >        Agregar Tarea
      </button>

      {/* FORMULARIOS*/}
      {showForm && (
        <TaskForm
          task={editingTaskId !== null ? tasks.find((t) => t.id === editingTaskId) : undefined}
          onCancel={() => {
            setEditingTaskId(null);
            setShowForm(false);
          }}
          onSubmit={async (taskData) => {
            if (editingTaskId !== null) {

              await handleUpdate(taskData);
            } else {

              try {
                const newTask = await createTask(taskData); 
                dispatch(setTasks([...tasks, newTask])); 
                setShowForm(false);
              } catch (error) {
                console.error('Error creando tarea:', error);
              }
            }
            setEditingTaskId(null);
            setShowForm(false);
          }}
        />
      )}



      {/* LISTADO DE TAREAS*/}
      <div className="space-y-4 mt-6">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No hay tareas que mostrar</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="p-4 bg-white shadow rounded flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p>{task.description}</p>
                {(() => {
                  const dueDate = new Date(task.dueDate);
                  const dueDateFormatted = `${dueDate.getUTCDate().toString().padStart(2, '0')}/` +
                    `${(dueDate.getUTCMonth() + 1).toString().padStart(2, '0')}/` +
                    `${dueDate.getUTCFullYear()}`;
                  return <p className="text-sm text-gray-500">Vence: {dueDateFormatted}</p>;
                })()}


                <p className={`text-sm font-semibold ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
                  {task.completed ? 'Completada' : 'Pendiente'}
                </p>

                <div className="text-sm text-blue-500 mt-1">
                  {task.tags.map((tag, idx) => (
                    <span key={idx} className="mr-2">#{tag}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <button
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  onClick={() => handleEditClick(task.id)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(task.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );


};

export default App;
