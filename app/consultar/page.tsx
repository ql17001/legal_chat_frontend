"use client"

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect, useSelector } from "react";

interface User {
    nombre: string;
    apellido: string;
    email: string;
    rol:  string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    axios.get("http://localhost:8000/usuario/consulta")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);


  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredResults = users.filter(
      (user) =>
        user.nombre.toLowerCase().includes(searchTerm) ||
        user.apellido.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.rol.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filteredResults);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre, apellido, email o rol"
        onChange={handleFilter}
        className="border border-gray-300 p-2 rounded-md mb-4"
      />
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-blue-200">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Apellido</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Rol</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.nombre}</td>
              <td className="border px-4 py-2">{user.apellido}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {}
      <div className="mt-4">
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 mx-1 ${
              i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-blue-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserTable;


