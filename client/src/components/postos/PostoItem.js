import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePosto, setCurrentPosto } from '../../actions/postoActions';

const PostoItem = ({ posto, deletePosto, setCurrentPosto }) => {
  return (
    <div className="card shadow-lg mb-2">
      <div className="card-body">
        <h5 className="card-title">{posto.name}</h5>
        <p className="card-text">{posto.address}</p>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <label className="font-weight-bold">
                  Gasolina Comum
              </label>
                <div>
                  {posto.gasolina_comun_price[posto.gasolina_comun_price.length - 1] ? 'R$ ' + posto.gasolina_comun_price[posto.gasolina_comun_price.length - 1] : 'Não Informado'}
                </div>
              </td>
              <td>
                <label className="font-weight-bold">
                  Alcool
                  </label>
                <div>
                  {posto.alcool_price[posto.alcool_price.length - 1] ? 'R$ ' + posto.alcool_price[posto.alcool_price.length - 1] : 'Não Informado'}
                </div>
              </td>
              <td>
                <label className="font-weight-bold">
                  Etanol
                  </label>
                <div>
                  {posto.etanol_price[posto.etanol_price.length - 1] ? 'R$ ' + posto.etanol_price[posto.etanol_price.length - 1] : 'Não Informado'}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label className="font-weight-bold">
                  Diesel
                  </label>
                <div>
                  {posto.diesel_price[posto.diesel_price.length - 1] ? 'R$ ' + posto.diesel_price[posto.diesel_price.length - 1] : 'Não Informado'}
                </div>
              </td>
              <td>
                <label className="font-weight-bold">
                  G. Aditiva
                  </label>
                <div>
                  {posto.gasolina_aditivada_price[posto.gasolina_aditivada_price.length - 1] ? 'R$ ' + posto.gasolina_aditivada_price[posto.gasolina_aditivada_price.length - 1] : 'Não Informado'}
                </div>
              </td>
              <td>
                <label className="font-weight-bold">
                  GNV
              </label>
                <div>
                  {posto.gnv_price[posto.gnv_price.length - 1] ? 'R$ ' + posto.gnv_price[posto.gnv_price.length - 1] : 'Não Informado'}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="d-flex justify-content-between">
          <a href='#top' onClick={() => setCurrentPosto(posto)} className="btn btn-primary"><i className="fas fa-edit mr-2"></i>Editar</a>
          <a href="#!" onClick={() => deletePosto(posto._id)} className="btn btn-danger"><i className="fas fa-trash mr-2"></i>Remover</a>
        </div>
      </div>
    </div>
  )
}


PostoItem.propTypes = {
  posto: PropTypes.object.isRequired,
  deletePosto: PropTypes.func.isRequired,
  setCurrentPosto: PropTypes.func.isRequired
};

export default connect(
  null, { deletePosto, setCurrentPosto }
)(PostoItem);