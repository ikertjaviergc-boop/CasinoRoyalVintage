import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ nombre: '', apellido: '', correo: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre && formData.apellido && formData.correo && formData.password) {
      onLoginSuccess({ nombre: formData.nombre, apellido: formData.apellido });
    } else {
      alert('Por favor, complete todos los campos de la casa.');
    }
  };

  return (
    <div style={{ 
      maxWidth: '420px', 
      margin: '2rem auto', 
      padding: '2.5rem', 
      border: '10px solid #4a2c11', // Borde de Madera
      borderRadius: '4px', 
      boxShadow: '0 15px 30px rgba(0,0,0,0.7)', 
      background: 'linear-gradient(145deg, #1c3b2b, #0f241a)', // Color tapete verde oscuro
      color: '#ffd700'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', textShadow: '2px 2px 4px #000', letterSpacing: '1px', fontSize: '1.8rem' }}>
        REGISTRO DE JUGADORES
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        
        {['nombre', 'apellido', 'correo', 'password'].map((campo) => (
          <div key={campo}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {campo === 'password' ? 'Contraseña' : campo}:
            </label>
            <input 
              type={campo === 'password' ? 'password' : campo === 'correo' ? 'email' : 'text'} 
              name={campo} 
              value={formData[campo]} 
              onChange={handleChange} 
              style={{ 
                width: '100%', 
                padding: '0.6rem', 
                borderRadius: '3px', 
                border: '1px solid #ffd700', 
                backgroundColor: '#121212', 
                color: '#fff',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }} 
              required 
            />
          </div>
        ))}

        <button type="submit" style={{ 
          padding: '0.8rem', 
          backgroundColor: '#ffd700', 
          color: '#1a100a', 
          border: '2px solid #b89700', 
          borderRadius: '3px', 
          fontSize: '1.1rem', 
          fontWeight: 'bold',
          cursor: 'pointer', 
          marginTop: '1rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
          textTransform: 'uppercase'
        }}>
          Adquirir Fichas e Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;