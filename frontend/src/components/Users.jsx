import { useEffect, useState } from 'react';

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);

  return (
    <section class='p-4'>
      <h1 class='text-center font-semibold text-xl'>Nuestros Usuarios</h1>
      {users.length > 0 ? (
        <article class="">
          <table class="table-auto mx-auto border">
            <thead>
              <tr class="bg-gray-200">
                <th class="px-4 py-2">Nombre</th>
                <th class="px-4 py-2">Correo</th>
                <th class="px-4 py-2">Rol</th>
                <th class="px-4 py-2">Acción</th>
                <th class="px-4 py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr class="border-b" key={user._id}>
                  <td class="px-4 py-2">{user.first_name} {user.last_name}</td>
                  <td class="px-4 py-2">{user.email}</td>
                  <td class="px-4 py-2">{user.rol}</td>
                  <td class="px-4 py-2">
                    <button class="bg-violet-500 w-auto px-2 text-white font-bold text-center">
                      Eliminar
                    </button>
                  </td>
                  <td class="px-4 py-2">
                    <button class="bg-violet-500 w-auto px-2 text-white font-bold text-center">
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}
    </section>
  )
}

