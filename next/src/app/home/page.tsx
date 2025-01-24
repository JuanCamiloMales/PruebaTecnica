'use client';

import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Comerciante {
  Id: number;
  NombreRazonSocial: string;
  Telefono: string;
  CorreoElectronico: string;
  FechaRegistro: string;
  cantidadEstablecimientos: number;
  Estado: string;
}

export default function Home() {
  const { nombre, rol } = useStore();
  const router = useRouter();
  const [filtro, setFiltro] = useState({ elementosPorPagina: 5, Page: 1 });
  const [comerciantes, setComerciantes] = useState<Comerciante[]>([]);
  const [elementosPorPagina, setElementosPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    obtenerComerciantes();
  }, [filtro]);

  const obtenerComerciantes = async () => {
    try {
      const respuesta = await fetch('http://localhost:4000/api/Comerciantes/paginacion', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          elementosPorPagina: filtro.elementosPorPagina,
          Page: filtro.Page
        }),
      });
      if (respuesta.status === 401) {
        router.push('/auth');
        return;
      }
      const data = await respuesta.json();
      const comerciantes = data.data
      setComerciantes(comerciantes);

      const ElementosPorPagina = data.pageSize;
      setElementosPorPagina(ElementosPorPagina);

      const PaginaActual = data.page;
      setPaginaActual(PaginaActual);

      const TotalComerciantes = data.total;
      setTotalPaginas(Math.ceil(TotalComerciantes / elementosPorPagina));

    } catch (error) {
      console.error('Error al obtener comerciantes:', error);
    }
  };

  const cambiarEstado = async (id: number) => {
    try {
      await fetch(`http://localhost:4000/api/comerciantes/${id}/estado`, {
        credentials: 'include',
        method: 'PATCH'
      });
      obtenerComerciantes();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  const eliminarComerciante = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este comerciante?')) return;
    try {
      await fetch(`http://localhost:4000/api/comerciantes/${id}`, {
        credentials: 'include',
        method: 'DELETE'
      });
      obtenerComerciantes();
    } catch (error) {
      console.error('Error al eliminar comerciante:', error);
    }
  };

  const descargarCSV = async () => {
    try {
      const respuesta = await fetch('http://localhost:4000/api/comerciantes/reporte');
      const blob = await respuesta.blob();
      const url = window.URL.createObjectURL(blob);
      const enlace = document.createElement('a');
      enlace.href = url;
      enlace.download = 'reporte-comerciantes.csv';
      enlace.click();
    } catch (error) {
      console.error('Error al descargar reporte:', error);
    }
  };

  const cerrarSesion = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/auth');
  };

  return (
    <div className="">
      <header className="flex items-center justify-end p-4 text-white border-b-2 border-gray-300 bg-gray-100">
        <div className="flex items-center">
          <div className="m-2">
            <p className="text-sm text-black">Nombre: {nombre}</p>
            <p className="text-sm text-black">Rol: {rol}</p>
          </div>
        </div>
        <button 
          onClick={cerrarSesion}
          className="bg-red-500 hover:bg-red-700 text-white font-bold m-2 py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </header>

      <div className="flex justify-between items-center p-6 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold">Comerciantes Registrados</h1>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/comerciante')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Crear Comerciante
          </button>
          {rol === 'ADMINISTRADOR' && (
            <button
              onClick={descargarCSV}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Descargar CSV
            </button>
          )}
        </div>
      </div>

      <div className="mx-20 mt-10" >
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 border border-gray-300">
            <thead>
              <tr className="bg-sky-400 text-white">
                <th className="px-6 py-3 border-b">Nombre/Razón Social</th>
                <th className="px-6 py-3 border-b">Teléfono</th>
                <th className="px-6 py-3 border-b">Correo Electrónico</th>
                <th className="px-6 py-3 border-b">Fecha Registro</th>
                <th className="px-6 py-3 border-b">Cantidad Establecimientos</th>
                <th className="px-6 py-3 border-b">Estado</th>
                <th className="px-6 py-3 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {comerciantes.map((comerciante) => (
                <tr key={comerciante.Id}>
                  <td className="px-6 py-4 border-b">{comerciante.NombreRazonSocial}</td>
                  <td className="px-6 py-4 border-b">{comerciante.Telefono}</td>
                  <td className="px-6 py-4 border-b">{comerciante.CorreoElectronico}</td>
                  <td className="px-6 py-4 border-b">{comerciante.FechaRegistro}</td>
                  <td className="px-6 py-4 border-b">{comerciante.cantidadEstablecimientos}</td>
                  <td className="px-6 py-4 border-b">
                    <span className={`px-2 py-1 rounded ${comerciante.Estado === 'ACTIVO' ? 'bg-green-200' : 'bg-red-200'}`}>
                      {comerciante.Estado === 'ACTIVO' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b space-x-2">
                    <button
                      onClick={() => router.push(`/comerciante/${comerciante.Id}`)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => cambiarEstado(comerciante.Id)}
                      className={`${comerciante.Estado === 'ACTIVO' ? 'bg-red-500' : 'bg-green-500'} text-white px-2 py-1 rounded hover:opacity-80`}
                    >
                      {comerciante.Estado === 'ACTIVO' ? 'Inactivar' : 'Activar'}
                    </button>
                    {rol === 'ADMINISTRADOR' && (
                      <button
                        onClick={() => eliminarComerciante(comerciante.Id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-start space-x-4 bg-gray-100">
          <div className="flex items-center space-x-2">
            <span>Registros por página:</span>
            <select
              value={elementosPorPagina}
              onChange={(e) => {
                setFiltro({ ...filtro, elementosPorPagina: Number(e.target.value) });
              }}
              className="border rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFiltro({ ...filtro, Page: Math.max(paginaActual - 1, 1) })} //setPaginaActual(prev => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-3 py-1">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() => setFiltro({ ...filtro, Page: Math.max(paginaActual + 1, totalPaginas) })} //setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      
      </div>
    </div>
  );
}