import React, { useState, useEffect } from 'react';

import './App.css'

function BlocDeNotas() {
  const [contenido, setContenido] = useState('');
  const [notasGuardadas, setNotasGuardadas] = useState([]);

  useEffect(() => {
    const notasAlmacenadas = localStorage.getItem('notasGuardadas');

    if (notasAlmacenadas) {
      setNotasGuardadas(JSON.parse(notasAlmacenadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notasGuardadas', JSON.stringify(notasGuardadas));
  }, [notasGuardadas]);

  const handleChangeContenido = (event) => {
    setContenido(event.target.value);
  };

  const guardarNota = () => {
    if (contenido.trim() !== '') {
      const nuevaNota = {
        id: Date.now(),
        contenido: contenido.trim(),
      };

      setNotasGuardadas([...notasGuardadas, nuevaNota]);
      setContenido('');
    }
  };

  const eliminarNota = (id) => {
    const nuevasNotas = notasGuardadas.filter((nota) => nota.id !== id);
    setNotasGuardadas(nuevasNotas);
  };

  return (
    <div>
      <div>
        <textarea value={contenido} onChange={handleChangeContenido} />
        <button onClick={guardarNota}>Guardar</button>
      </div>
      <div>
        {notasGuardadas.map((nota) => (
          <div key={nota.id}>
            <p>{nota.contenido}</p>
            <button onClick={() => eliminarNota(nota.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlocDeNotas;
