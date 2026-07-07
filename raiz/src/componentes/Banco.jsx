import React, { useState } from 'react';

const Banco = ({ saldo, setSaldo, deuda, setDeuda }) => {
  const [montoSolicitado, setMontoSolicitado] = useState(500);
  const [montoAPagar, setMontoAPagar] = useState('');

  const LIMITE_PRESTAMO_INDIVIDUAL = 100000;
  const LIMITE_DEUDA_TOTAL = 7000000;

  const pedirPrestamo = () => {
    if (montoSolicitado <= 0) {
      alert('Por favor, ingresa un monto válido para el préstamo.');
      return;
    }

    if (montoSolicitado > LIMITE_PRESTAMO_INDIVIDUAL) {
      alert(`❌ No puedes solicitar más de $${LIMITE_PRESTAMO_INDIVIDUAL.toLocaleString()} fichas en un solo préstamo.`);
      return;
    }

    if (deuda + montoSolicitado > LIMITE_DEUDA_TOTAL) {
      alert(`❌ Operación denegada. Este préstamo excede el límite de deuda total permitido de $${LIMITE_DEUDA_TOTAL.toLocaleString()} fichas.`);
      return;
    }
    
    setSaldo(prev => prev + montoSolicitado);
    setDeuda(prev => prev + montoSolicitado);
    alert(`🏦 Préstamo aprobado. Se han abonado $${montoSolicitado.toLocaleString()} fichas a tu cuenta.`);
  };

  const pagarPrestamo = () => {
    const cantidadAPagar = Number(montoAPagar);
    if (cantidadAPagar <= 0 || cantidadAPagar > deuda) {
      alert('Monto a pagar inválido o superior a tu deuda actual.');
      return;
    }

    const interes = Math.round(cantidadAPagar * 0.05);
    const costoTotal = cantidadAPagar + interes;

    if (costoTotal > saldo) {
      alert(`❌ Saldo insuficiente. Para saldar $${cantidadAPagar.toLocaleString()} de deuda necesitas $${costoTotal.toLocaleString()} fichas (incluye 5% de comisión: $${interes.toLocaleString()}).`);
      return;
    }

    setSaldo(prev => prev - costoTotal);
    setDeuda(prev => prev - cantidadAPagar);
    setMontoAPagar('');

    alert(`✅ Pago exitoso. Devolviste $${cantidadAPagar.toLocaleString()} de deuda + $${interes.toLocaleString()} de comisión.`);
  };

  // BOTÓN MAX PARA DEUDA: Calcula el máximo que puedes pagar según tus fichas o tu deuda total
  const aplicarMaxPago = () => {
    if (deuda <= 0) return;
    
    // Cuánto cuesta pagar TODA la deuda con el 5%
    const costoTodaLaDeuda = Math.round(deuda * 1.05);

    if (saldo >= costoTodaLaDeuda) {
      // Si te alcanza para todo, el monto base a pagar es la deuda completa
      setMontoAPagar(deuda);
    } else {
      // Si no te alcanza, calculamos el máximo monto base que tu saldo actual puede cubrir incluyendo el 5%
      // saldo = montoBase * 1.05  =>  montoBase = saldo / 1.05
      const maxMontoBasePosible = Math.floor(saldo / 1.05);
      setMontoAPagar(maxMontoBasePosible > 0 ? maxMontoBasePosible : 0);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #1e2530, #11161d)',
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
      
      <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '5px', marginBottom: '2rem', border: '1px solid #333' }}>
        <div>
          <span style={{ display: 'block', color: '#aaa', fontSize: '0.9rem' }}>Fichas Disponibles</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2ecc71' }}>${saldo.toLocaleString()}</span>
        </div>
        <div style={{ borderLeft: '1px solid #333' }}></div>
        <div>
          <span style={{ display: 'block', color: '#aaa', fontSize: '0.9rem' }}>Deuda ({deuda.toLocaleString()} / {LIMITE_DEUDA_TOTAL.toLocaleString()})</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#e74c3c' }}>${deuda.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Solicitud */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#ffd700', fontSize: '1.2rem' }}>Solicitar Crédito VIP</h3>
          <p style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '-0.5rem', marginBottom: '1rem' }}>
            Máximo por transacción: <strong>$100.000</strong>. Límite de línea de crédito: <strong>$7.000.000</strong>.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
            <input 
              type="number" 
              value={montoSolicitado} 
              onChange={(e) => setMontoSolicitado(Math.max(1, Number(e.target.value)))}
              style={{ width: '120px', padding: '0.5rem', backgroundColor: '#000', color: '#fff', border: '1px solid #ffd700', borderRadius: '4px', textAlign: 'center', fontSize: '1.1rem' }}
            />
            <button 
              onClick={pedirPrestamo} 
              disabled={deuda >= LIMITE_DEUDA_TOTAL}
              style={{ 
                padding: '0.6rem 1.5rem', 
                backgroundColor: deuda >= LIMITE_DEUDA_TOTAL ? '#555' : '#ffd700', 
                color: '#000', 
                border: 'none', 
                fontWeight: 'bold', 
                cursor: deuda >= LIMITE_DEUDA_TOTAL ? 'not-allowed' : 'pointer', 
                borderRadius: '4px' 
              }}
            >
              {deuda >= LIMITE_DEUDA_TOTAL ? 'Límite Alcanzado' : 'Pedir Fichas'}
            </button>
          </div>
        </div>

        {/* Devolución con botón MAX */}
        {deuda > 0 && (
          <div style={{ background: 'rgba(46, 204, 113, 0.05)', padding: '1.2rem', borderRadius: '5px', border: '1px solid rgba(46, 204, 113, 0.2)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#2ecc71', fontSize: '1.2rem' }}>Devolver Fichas</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}>
              <input 
                type="number" 
                placeholder={`Máx $${deuda}`}
                value={montoAPagar} 
                onChange={(e) => setMontoAPagar(e.target.value)}
                style={{ width: '120px', padding: '0.5rem', backgroundColor: '#000', color: '#fff', border: '1px solid #2ecc71', borderRadius: '4px', textAlign: 'center', fontSize: '1.1rem' }}
              />
              <button 
                onClick={aplicarMaxPago}
                style={{ padding: '0.5rem 0.8rem', backgroundColor: '#27ae60', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', fontSize: '0.9rem' }}
              >
                MAX
              </button>
              <button onClick={pagarPrestamo} style={{ padding: '0.6rem 1.5rem', backgroundColor: '#2ecc71', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>
                Pagar
              </button>
            </div>
            {montoAPagar > 0 && (
              <p style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.5rem' }}>
                Total a retirar de tus fichas: <strong>${Math.round(Number(montoAPagar) * 1.05).toLocaleString()}</strong> (incluye 5% de interés)
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Banco;
