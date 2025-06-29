import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setStatusFilter, setDueDateFilter, clearFilters } from '../features/filters/filterSlice';

const TaskFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded shadow max-w-xl mx-auto">


      {/* FILTRO POR ESTADO*/}
      <div>
        <label className="block font-semibold mb-1">Estado</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={filters.status}
          onChange={(e) => dispatch(setStatusFilter(e.target.value as any))}
        >
          <option value="all">Todos</option>
          <option value="completed">Completada</option>
          <option value="pending">Pendiente</option>
        </select>
      </div>

      {/* FILTRO DE FECHA*/}
      <div>
        <label className="block font-semibold mb-1">Fecha de vencimiento</label>
        <input
          type="date"
          className="border rounded px-3 py-2 w-full"
          value={filters.dueDate || ''}
          onChange={(e) => dispatch(setDueDateFilter(e.target.value || undefined))}
        />
      </div>

      <div className="flex items-end">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => dispatch(clearFilters())}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;
