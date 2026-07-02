import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { supabase } from '../supabaseClient';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      // Assuming a table named 'muestras_kowa' exists in Supabase
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
      // Reset form or navigate away after a delay
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error('Error guardando los datos:', error);
      setErrorMsg('Error al conectar con la base de datos o guardar el registro. Verifique que la tabla "muestras_kowa" exista.');
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
          {success && (
            <div className="success-container">
              <img src="/images/success.png" alt="Éxito" className="success-image" />
              <div className="success-msg">
                ✅ ¡Registro guardado exitosamente! Volviendo al inicio...
              </div>
            </div>
          )}
          {errorMsg && (
            <div className="error-msg">
              ❌ {errorMsg}
            </div>
          )}
          
          {!success && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterView;
