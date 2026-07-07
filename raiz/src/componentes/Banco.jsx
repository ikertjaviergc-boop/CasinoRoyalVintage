import React, { useState } from 'react';

const Banco = ({ saldo, setSaldo, deuda, setDeuda }) => {
  const [montoSolicitado, setMontoSolicitado] = useState(500);
  const [montoAPagar, setMontoAPagar] = useState('');

  const pedirPrestamo = () => {
    if (montoSolicitado <= 0) {
      alert('Por favor, ingresa un monto válido para el préstamo.');
      return;
    }
    
    // Sumamos el monto directo al saldo de fichas
    setSaldo(prev => prev + montoSolicitado);
    // Sumamos el monto a la deuda acumulada
    setDeuda(prev => prev + montoSolicitado);
    
    alert(`🏦 Préstamo aprobado. Se han abonado $${montoSolicitado} fichas a tu cuenta.`);
  };

  const pagarPrestamo = () => {
    const cantidadAPagar = Number(montoAPagar);
    if (cantidadAPagar <= 0 || cantidadAPagar > deuda) {
      alert('Monto a pagar inválido o superior a tu deuda actual.');
      return;
    }

    // Calcular el costo total incluyendo el 5% de comisión
    const interes = Math.round(cantidadAPagar * 0.05);
    const costoTotal = cantidadAPagar + interes;

    if (costoTotal > saldo) {
      alert(`❌ Saldo insuficiente. Para saldar $${cantidadAPagar} de deuda necesitas $${costoTotal} fichas (incluye 5% de comisión: $${interes}).`);
      return;
    }

    // Descontamos las fichas del saldo (monto + comisión)
    setSaldo(prev => prev - costoTotal);
    // Reducimos la deuda original
    setDeuda(prev => prev - cantidadAPagar);
    setMontoAPagar('');

    alert(`✅ Pago exitoso. Devolviste $${cantidadAPagar} de deuda + $${interes} de comisión (Total deducido: $${costoTotal}).`);
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #1e2530, #11161d)', // Estética bancaria elegante oscura
      border: '8px solid #ffd700',
      borderRadius: '8px',
      padding: '2rem',
      maxWidth: '600px',
      margin: '2rem auto',
      color: '#fff',
      boxShadow: '0 10px 25px rgba(0,0,0,0.7)',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#ffd700', marginBottom: '1.5rem', textShadow: '2px 2px 4px #000' }}>🏛️ BANCO DE FICHAS CENTRAL 🏛️</h2>
      
      {/* Resumen Financiero */}
      <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '5px', marginBottom: '2rem', border: '1px solid #333' }}>
        <div>
          <span style={{ display: 'block', color: '#aaa', fontSize: '0.9rem' }}>Fichas Disponibles</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2ecc71' }}>${saldo}</span>
        </div>
        <div style={{ borderLeft: '1px solid #333' }}></div>
        <div>
          <span style={{ display: 'block', color: '#aaa', fontSize: '0.9rem' }}>Deuda con el Casino</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#e74c3c' }}>${deuda}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Sección de Solicitud */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#ffd700', fontSize: '1.2rem' }}>Solicitar Crédito VIP</h3>
          <p style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '-0.5rem', marginBottom: '1rem' }}>Recibe fichas al instante. Recuerda que la devolución aplica un 5% de interés.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
            <input 
              type="number" 
              value={montoSolicitado} 
              onChange={(e) => setMontoSolicitado(Math.max(1, Number(e.target.value)))}
              style={{ width: '120px', padding: '0.5rem', backgroundColor: '#000', color: '#fff', border: '1px solid #ffd700', borderRadius: '4px', textAlign: 'center', fontSize: '1.1rem' }}
            />
            <button onClick={pedirPrestamo} style={{ padding: '0.6rem 1.5rem', backgroundColor: '#ffd700', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>
              Pedir Fichas
            </button>
          </div>
        </div>

        {/* Sección de Pago (Sólo se muestra si hay deuda) */}
        {deuda > 0 && (
          <div style={{ background: 'rgba(46, 204, 113, 0.05)', padding: '1.2rem', borderRadius: '5px', border: '1px solid rgba(46, 204, 113, 0.2)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#2ecc71', fontSize: '1.2rem' }}>Devolver Fichas</h3>
            <p style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '-0.5rem', marginBottom: '1rem' }}>Monto a abonar + 5% de comisión.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
              <input 
                type="number" 
                placeholder={`Máx $${deuda}`}
                value={montoAPagar} 
                onChange={(e) => setMontoAPagar(e.target.value)}
                style={{ width: '120px', padding: '0.5rem', backgroundColor: '#000', color: '#fff', border: '1px solid #2ecc71', borderRadius: '4px', textAlign: 'center', fontSize: '1.1rem' }}
              />
              <button onClick={pagarPrestamo} style={{ padding: '0.6rem 1.5rem', backgroundColor: '#2ecc71', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>
                Pagar Deuda
              </button>
            </div>
            {montoAPagar > 0 && (
              <p style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.5rem' }}>
                Total a retirar de tus fichas: <strong>${Math.round(Number(montoAPagar) * 1.05)}</strong> (incluye ${Math.round(Number(montoAPagar) * 0.05)} de interés)
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Banco;