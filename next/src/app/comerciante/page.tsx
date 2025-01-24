'use client';

import { useStore } from '../store/useStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Comerciante {
  Id: number;
  NombreRazonSocial: string;
  Telefono: string;
  CorreoElectronico: string;
  FechaRegistro: string;
  cantidadEstablecimientos: number;
  Estado: string;
  Municipio: string;
}

export default function PaginaInicio() {
  const { nombre, rol } = useStore();
  const router = useRouter();
  
  const [formData, setFormData] = useState<Comerciante>({
    Id: 0,
    NombreRazonSocial: '',
    Telefono: '',
    CorreoElectronico: '',
    FechaRegistro: '',
    cantidadEstablecimientos: 0,
    Estado: '',
    Municipio: ''
  });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {

      const dateString = formData.FechaRegistro;
      const date = new Date(dateString);
      const isoString = date.toISOString(); // Convierte a ISO-8601

      const respuesta = await fetch('http://localhost:4000/api/Comerciantes', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          NombreRazonSocial: formData.NombreRazonSocial,
          Telefono: formData.Telefono,
          CorreoElectronico: formData.CorreoElectronico,
          FechaRegistro: isoString,
          Estado: formData.Estado,
          Municipio: formData.Municipio
        }),
      });
      if (respuesta.status === 401) {
        router.push('/auth');
        return;
      }
      if (respuesta.status === 400) {
        alert('Error al guardar');
        return;
      }
      if (respuesta.status === 201) {
        alert('Guardado correctamente');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const cerrarSesion = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/auth');
  };

  return (
    <div className="bg-gray-200 min-h-screen">
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

        
      <div className="mx-10 mt-10 p-10 border-2 border-gray-300 rounded-lg bg-white" >
        <div className="overflow-x-auto ">
        <p className="text-4xl font-bold">
          Crear un nuevo comerciante
        </p>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label>Razón Social</label>
              <input 
                className="peer w-full border border-gray-300 rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                type="text" 
                name="NombreRazonSocial" 
                value={formData.NombreRazonSocial} 
                onChange={(e) => setFormData({...formData, NombreRazonSocial: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label>Municipio</label>
              <select
                className="peer w-full border border-gray-300 rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                name="MunicipioCiudad" 
                value={formData.Municipio} 
                onChange={(e) => setFormData({...formData, Municipio: e.target.value})} 
                required
              >
                <option value="">Seleccione...</option>
                <option value="Ciudad1">Ciudad1</option>
                <option value="Ciudad2">Ciudad2</option>
              </select>
            </div>
            <div>
              <label>Teléfono</label>
              <input
                className="peer w-full border border-gray-300 rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                type="tel" 
                name="Telefono" 
                value={formData.Telefono} 
                onChange={(e) => setFormData({...formData, Telefono: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label>Correo Electrónico</label>
              <input
                className="peer w-full border border-gray-300 rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"  
                type="email" 
                name="CorreoElectronico" 
                value={formData.CorreoElectronico} 
                onChange={(e) => setFormData({...formData, CorreoElectronico: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label>Fecha de Registro</label>
              <input 
                className="peer w-full border border-gray-300 rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="date" 
                name="FechaRegistro" 
                value={formData.FechaRegistro} 
                onChange={(e) => setFormData({...formData, FechaRegistro: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label>Estado</label>
              <select 
                className="peer w-full border border-gray-300 rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                name="Estado" 
                value={formData.Estado} 
                onChange={(e) => setFormData({...formData, Estado: e.target.value})} 
                required
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            {/* <div>
              <label>¿Posee establecimientos?</label>
              <input
                className="peer w-full border border-gray-300 rounded-md px-3 py-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"  
                type="checkbox" 
                name="PoseeEstablecimientos" 
                checked={formData.cantidadEstablecimientos > 0} 
                disabled 
              />
            </div> */}
          </div>
          <button 
            className="group relative w-full flex justify-center mt-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Guardar
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}