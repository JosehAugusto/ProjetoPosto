import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPosto, updatePosto, clearCurrentPosto } from '../../actions/postoActions';

const PostoForm = ({ current_posto, addPosto, updatePosto, clearCurrentPosto }) => {

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gas_com_price, setGasComPrice] = useState('');
  const [gas_adi_price, setGasAdiPrice] = useState('');
  const [eta_price, setEtaPrice] = useState('');
  const [gnvf_price, setGnvfPrice] = useState('');
  const [die_price, setDiePrice] = useState('');
  const [alc_price, setAlcPrice] = useState('');

  useEffect(() => {
    if (current_posto) {
      setName(current_posto.name);
      setAddress(current_posto.address);
      setGasComPrice(current_posto.gasolina_comun_price[current_posto.gasolina_comun_price.length - 1] ? current_posto.gasolina_comun_price[current_posto.gasolina_comun_price.length - 1] : '');
      setGasAdiPrice(current_posto.gasolina_aditivada_price[current_posto.gasolina_aditivada_price.length - 1] ? current_posto.gasolina_aditivada_price[current_posto.gasolina_aditivada_price.length - 1] : '');
      setEtaPrice(current_posto.etanol_price[current_posto.etanol_price.length - 1] ? current_posto.etanol_price[current_posto.etanol_price.length - 1] : '');
      setGnvfPrice(current_posto.gnv_price[current_posto.gnv_price.length - 1] ? current_posto.gnv_price[current_posto.gnv_price.length - 1] : '');
      setDiePrice(current_posto.diesel_price[current_posto.diesel_price.length - 1] ? current_posto.diesel_price[current_posto.diesel_price.length - 1] : '');
      setAlcPrice(current_posto.alcool_price[current_posto.alcool_price.length - 1] ? current_posto.alcool_price[current_posto.alcool_price.length - 1] : '');

    }
  }, [current_posto]);

  const onSubmit = () => {
    if (name === '' || address === '' || gas_com_price === '' || gas_adi_price === '' || eta_price === '' || gnvf_price === '' || die_price === '' || alc_price === '') {
      // Favor preencher todos os campos
    } else {
      if (gas_com_price < 0 || gas_adi_price < 0 || eta_price < 0 || gnvf_price < 0 || die_price < 0 || alc_price < 0) {
        // Numeros precisam ser positivos
      } else {
        const gasolina_comun_price = [gas_com_price];
        const gasolina_aditivada_price = [gas_adi_price];
        const etanol_price = [eta_price];
        const gnv_price = [gnvf_price];
        const diesel_price = [die_price];
        const alcool_price = [alc_price];

        if (current_posto) {
          const updatedPosto = {
            _id: current_posto._id,
            name,
            gasolina_comun_price,
            gasolina_aditivada_price,
            etanol_price,
            gnv_price,
            diesel_price,
            alcool_price
          };

          updatePosto(updatedPosto);

        } else {
          addPosto({
            name,
            address,
            gasolina_comun_price,
            gasolina_aditivada_price,
            etanol_price,
            gnv_price,
            diesel_price,
            alcool_price
          });
        }

        // Mensagem dizendo que um posto foi adicionado

        // Clear Fields
        clearAllFields();
      }

    }
  };

  const clearCurrent = () => {
    clearCurrentPosto();
    clearAllFields();
  }

  // Clear Fields
  const clearAllFields = () => {
    // Clear Fields
    setName('');
    setAddress('');
    setGasComPrice('');
    setGasAdiPrice('');
    setEtaPrice('');
    setGnvfPrice('');
    setDiePrice('');
    setAlcPrice('');
  }


  return (
    <form className="py-2 ">
      <div className="text-center">
        <h5 className="display-5"> {current_posto ? 'Editar' : 'Novo'} Posto </h5>
      </div>
      <div className="form-group">
        <label className="font-weight-normal">Nome</label>
        <input type="text" name='name' value={name} onChange={e => setName(e.target.value)} className="form-control"
          placeholder="Digite o nome do posto..." />
      </div>
      <div className="form-group">
        <label>Endereço</label>
        <input type="text" name='address' value={address} onChange={e => setAddress(e.target.value)} className="form-control" placeholder="Digite o endereço do posto..." />
      </div>
      <div className="d-flex justify-content-between">
        <div className="form-group">
          <label>Gasolina Comum</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">R$</span>
            </div>
            <input type="number" name='gas_com_price' value={gas_com_price} onChange={e => setGasComPrice(e.target.value)} className="form-control number-input" min="0" />
          </div>
        </div>
        <div className="form-group">
          <label>Alcool</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">R$</span>
            </div>
            <input type="number" name='alc_price' value={alc_price} onChange={e => setAlcPrice(e.target.value)} className="form-control number-input" min="0" />
          </div>
        </div>
        <div className="form-group">
          <label>Etanol</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">R$</span>
            </div>
            <input type="number" name='eta_price' value={eta_price} onChange={e => setEtaPrice(e.target.value)} className="form-control number-input" min="0" />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="form-group">
          <label>Diesel</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">R$</span>
            </div>
            <input type="number" name='die_price' value={die_price} onChange={e => setDiePrice(e.target.value)} className="form-control number-input" min="0" />
          </div>
        </div>
        <div className="form-group">
          <label>Gasolina Aditivada</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">R$</span>
            </div>
            <input type="number" name='gas_adi_price' value={gas_adi_price} onChange={e => setGasAdiPrice(e.target.value)} className="form-control number-input" min="0" />
          </div>
        </div>
        <div className="form-group">
          <label>GNV</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">R$</span>
            </div>
            <input type="number" name='gnvf_price' value={gnvf_price} onChange={e => setGnvfPrice(e.target.value)} className="form-control number-input" min="0" />
          </div>
        </div>
      </div>
      <div className="text-center my-2">
        <a href='#!' onClick={onSubmit} className='btn btn-dark mr-2'>
          <i className={current_posto ? 'fas fa-edit mr-2' : 'fas fa-plus-circle mr-2'}></i>{current_posto ? 'Editar' : 'Adicionar'}
        </a>
        {current_posto ? <a href='#!' onClick={clearCurrent} className='btn btn-info'>
          Cancelar
        </a> : null}
      </div>
    </form>
  )
}

PostoForm.propTypes = {
  current_posto: PropTypes.object.isRequired,
  clearCurrentPosto: PropTypes.func.isRequired,
  updatePosto: PropTypes.func.isRequired,
  addPosto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current_posto: state.posto.current_posto
});

export default connect(
  mapStateToProps,
  { updatePosto, addPosto, clearCurrentPosto }
)(PostoForm);
