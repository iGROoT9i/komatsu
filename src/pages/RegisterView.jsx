import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { supabase } from '../supabaseClient';
import confetti from 'canvas-confetti';
import './RegisterView.css';

const RegisterView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    idMaquina: '',
    horometro: '',
    fecha: new Date().toISOString().split('T')[0],
    tecnico: '',
    codigoMuestra: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fireConfetti = () => {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const { data, error } = await supabase
        .from('muestras_kowa')
        .insert([
          { 
            id_maquina: formData.idMaquina,
            horometro: parseInt(formData.horometro),
            fecha: formData.fecha,
            tecnico: formData.tecnico,
            codigo_muestra: formData.codigoMuestra
          }
        ]);

      if (error) throw error;
      
      setSuccess(true);
      fireConfetti();
      
      // Auto close and redirect after 4 seconds
      setTimeout(() => navigate('/'), 4000);
    } catch (error) {
      console.error('Error guardando los datos:', error);
      setErrorMsg('Error al conectar con la base de datos o guardar el registro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="page-content register-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Volver a la guía
        </button>
        
        <div className="form-card">
          {errorMsg && (
            <div className="error-msg">
              ❌ {errorMsg}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="idMaquina">ID Máquina:</label>
              <input 
                type="text" 
                id="idMaquina" 
                name="idMaquina" 
                className="form-control" 
                value={formData.idMaquina}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="horometro">Horómetro:</label>
              <input 
                type="number" 
                id="horometro" 
                name="horometro" 
                className="form-control" 
                value={formData.horometro}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fecha">Fecha:</label>
              <input 
                type="date" 
                id="fecha" 
                name="fecha" 
                className="form-control" 
                value={formData.fecha}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="tecnico">Técnico:</label>
              <input 
                type="text" 
                id="tecnico" 
                name="tecnico" 
                className="form-control" 
                value={formData.tecnico}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="codigoMuestra">Código Muestra:</label>
              <input 
                type="text" 
                id="codigoMuestra" 
                name="codigoMuestra" 
                className="form-control" 
                value={formData.codigoMuestra}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading || success}
            >
              {loading ? 'Guardando...' : '✓ Confirmar Registro'}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="success-modal-overlay">
          <div className="success-modal-content">
            <img src="/images/success_meme.webp" alt="Éxito" className="success-image-meme" />
            <h2 className="success-modal-title">¡Registro Exitoso!</h2>
            <p className="success-modal-text">Volviendo al inicio en unos segundos...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterView;
