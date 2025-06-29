import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createTask } from '../services/taskService';
import { useAppDispatch } from '../app/hooks';
import { addTask } from '../features/tasks/taskSlice';
import type { Task } from '../types/task';

interface TaskFormProps {
  task?: Task;
  onSubmit?: (values: any, formikHelpers?: any) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const dispatch = useAppDispatch();

  const initialValues = {
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '',
    tags: task?.tags.join(', ') || '',
    completed: task?.completed || false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('El título es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    dueDate: Yup.date().required('La fecha de vencimiento es obligatoria'),
  });

  const handleSubmit = async (values: typeof initialValues, formikHelpers: any) => {
    if (onSubmit) {
      await onSubmit({
        ...values,
        tags: values.tags.split(',').map((tag) => tag.trim()),
      }, formikHelpers);
    } else {
      try {
        const taskData = {
          ...values,
          tags: values.tags.split(',').map((tag) => tag.trim()),
        };
        const newTask = await createTask(taskData);
        dispatch(addTask(newTask));
        formikHelpers.resetForm();
      } catch (error) {
        console.error('Error creando tarea:', error);
      }
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{task ? 'Editar tarea' : 'Crear Nueva Tarea'}</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">Título</label>
              <Field
                name="title"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Título de la tarea"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Descripción</label>
              <Field
                name="description"
                as="textarea"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Descripción"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Fecha de vencimiento</label>
              <Field
                type="date"
                name="dueDate"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Etiquetas (separadas por coma)</label>
              <Field
                name="tags"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ej: Calidad, Testing"
              />
            </div>
            <div>
              <label className="inline-flex items-center">
                <Field type="checkbox" name="completed" className="mr-2" />
                <span>¿Tarea completada?</span>
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {task ? 'Actualizar' : 'Crear'}
              </button>

              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
