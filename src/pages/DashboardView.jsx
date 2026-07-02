import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { supabase } from '../supabaseClient';
import './DashboardView.css';

const DashboardView = () => {
  const navigate = useNavigate();
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistros();
  }, []);

  const fetchRegistros = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('muestras_kowa')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setRegistros(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="page-content dashboard-container">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Historial de Registros KOWA</h2>
          <button className="btn-refresh" onClick={fetchRegistros}>
            🔄 Actualizar
          </button>
        </div>
        
        {loading ? (
          <div className="loading-state">Cargando registros...</div>
        ) : registros.length === 0 ? (
          <div className="empty-state">No hay registros de mantenimiento aún.</div>
        ) : (
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>ID Máquina</th>
                  <th>Horómetro</th>
                  <th>Técnico</th>
                  <th>Código Muestra</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((reg) => (
                  <tr key={reg.id}>
                    <td>{new Date(reg.fecha).toLocaleDateString()}</td>
                    <td className="fw-bold">{reg.id_maquina}</td>
                    <td>{reg.horometro} hrs</td>
                    <td>{reg.tecnico}</td>
                    <td><span className="badge">{reg.codigo_muestra}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardView;
