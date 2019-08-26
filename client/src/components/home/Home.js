import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostos, calcAvgs } from '../../actions/postoActions';
import { set } from 'mongoose';

const Home = ({ posto: { postos, current_avg }, getPostos, calcAvgs }) => {
  // Valores dos combustiveis hoje
  let gasolinaComunAvgToday = 0;
  let gasolinaAditivadaAvgToday = 0;
  let etanolAvgToday = 0;
  let gnvAvgToday = 0;
  let dieselAvgToday = 0;
  let alcoolAvgToday = 0;
  // Diferença entre hoje e ontem
  let gasolinaComunDiferenceYesterday = 0;
  let gasolinaAditivadaDiferenceYesterday = 0;
  let etanolDiferenceYesterday = 0;
  let gnvDiferenceYesterday = 0;
  let dieselDiferenceYesterday = 0;
  let alcoolDiferenceYesterday = 0;

  useEffect(() => {
    getPostos()
    // eslint-disable-next-line
  }, []);

  const calc = () => {
    if (postos) {

      let gasolinaComunArrayToday = [];
      let gasolinaAditivadaArrayToday = [];
      let etanolArrayToday = [];
      let gnvArrayToday = [];
      let dieselArrayToday = [];
      let alcoolArrayToday = [];

      let gasolinaComunArrayYesterday = [];
      let gasolinaAditivadaArrayYesterday = [];
      let etanolArrayYesterday = [];
      let gnvArrayYesterday = [];
      let dieselArrayYesterday = [];
      let alcoolArrayYesterday = [];

      postos.forEach(posto => {
        // arrays usados pro calculo da media hoje e de ontem
        if (posto.gasolina_comun_price.length > 1) {
          gasolinaComunArrayToday.push(posto.gasolina_comun_price[posto.gasolina_comun_price.length - 1])
          gasolinaComunArrayYesterday.push(posto.gasolina_comun_price[posto.gasolina_comun_price.length - 2])
        }
        if (posto.gasolina_aditivada_price.length > 1) {
          gasolinaAditivadaArrayToday.push(posto.gasolina_aditivada_price[posto.gasolina_aditivada_price.length - 1])
          gasolinaAditivadaArrayYesterday.push(posto.gasolina_aditivada_price[posto.gasolina_aditivada_price.length - 2])
        }
        if (posto.etanol_price.length > 1) {
          etanolArrayToday.push(posto.etanol_price[posto.etanol_price.length - 1])
          etanolArrayYesterday.push(posto.etanol_price[posto.etanol_price.length - 2])
        }
        if (posto.gnv_price.length > 1) {
          gnvArrayToday.push(posto.gnv_price[posto.gnv_price.length - 1])
          gnvArrayYesterday.push(posto.gnv_price[posto.gnv_price.length - 2])
        }
        if (posto.diesel_price.length > 1) {
          dieselArrayToday.push(posto.diesel_price[posto.diesel_price.length - 1])
          dieselArrayYesterday.push(posto.diesel_price[posto.diesel_price.length - 2])
        }
        if (posto.alcool_price.length > 1) {
          alcoolArrayToday.push(posto.alcool_price[posto.alcool_price.length - 1])
          alcoolArrayYesterday.push(posto.alcool_price[posto.alcool_price.length - 2])
        }
      });

      // gasolina comun hoje
      let size = gasolinaComunArrayToday.length
      let val = gasolinaComunArrayToday.reduce((previous, current) => current += previous);
      val = val / size;
      gasolinaComunAvgToday = val

      // gasolina comun diferença de ontem pra hoje

      let size2 = gasolinaComunArrayYesterday.length
      let val2 = gasolinaComunArrayYesterday.reduce((previous, current) => current += previous);
      val2 = val2 / size2;

      gasolinaComunDiferenceYesterday = val - val2

      // gasolina aditivada hoje
      size = gasolinaAditivadaArrayToday.length
      val = gasolinaAditivadaArrayToday.reduce((previous, current) => current += previous);
      val = val / size;
      gasolinaAditivadaAvgToday = val

      // gasolina aditivada diferença de ontem pra hoje

      size2 = gasolinaAditivadaArrayYesterday.length
      val2 = gasolinaAditivadaArrayYesterday.reduce((previous, current) => current += previous);
      val2 = val2 / size2;

      gasolinaAditivadaDiferenceYesterday = val - val2

      // etanol hoje
      size = etanolArrayToday.length
      val = etanolArrayToday.reduce((previous, current) => current += previous);
      val = val / size;
      etanolAvgToday = val

      // etanol diferença de ontem pra hoje

      size2 = etanolArrayYesterday.length
      val2 = etanolArrayYesterday.reduce((previous, current) => current += previous);
      val2 = val2 / size2;

      etanolDiferenceYesterday = val - val2

      // gnv hoje
      size = gnvArrayToday.length
      val = gnvArrayToday.reduce((previous, current) => current += previous);
      val = val / size;
      gnvAvgToday = val

      // gnv diferença de ontem pra hoje

      size2 = gnvArrayYesterday.length
      val2 = gnvArrayYesterday.reduce((previous, current) => current += previous);
      val2 = val2 / size2;

      gnvDiferenceYesterday = val - val2

      // diesel hoje
      size = dieselArrayToday.length
      val = dieselArrayToday.reduce((previous, current) => current += previous);
      val = val / size;
      dieselAvgToday = val

      // diesel diferença de ontem pra hoje

      size2 = dieselArrayYesterday.length
      val2 = dieselArrayYesterday.reduce((previous, current) => current += previous);
      val2 = val2 / size2;

      dieselDiferenceYesterday = val - val2

      // alcool hoje
      size = alcoolArrayToday.length
      val = alcoolArrayToday.reduce((previous, current) => current += previous);
      val = val / size;
      alcoolAvgToday = val

      // alcool diferença de ontem pra hoje

      size2 = alcoolArrayYesterday.length
      val2 = alcoolArrayYesterday.reduce((previous, current) => current += previous);
      val2 = val2 / size2;

      alcoolDiferenceYesterday = val - val2
    }

  }

  return (
    <div>
      {calc()}
      <div className="container my-4">
        <div className="row">
          <div className="col-xs-12 col-md-6 col-lg-4 mb-2">
            <div className="card mx-2 shadow-lg text-center">
              <div className="card-header bg-dark text-white">
                <span className="font-weight-bold fuel-label">GASOLINA COMUM</span>
              </div>
              <div className="card-body">
                <div className="price-variation-container">
                  <p className="card-text mb-1">Ultimas 24 horas</p>
                  <h3 className="card-title mb-2">
                    R$ {gasolinaComunAvgToday}/L
                    <span><i className={gasolinaComunDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : gasolinaComunDiferenceYesterday == 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={gasolinaComunDiferenceYesterday > 0 ? 'text-danger small-percentage' : gasolinaComunDiferenceYesterday == 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {gasolinaComunDiferenceYesterday} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className="fas fa-chevron-down text-success fa-3x"></i><span
                    className="ml-2 text-success big-percentage">5.74%</span>
                </div>
              </div>
              <div className="py-3">
                <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-4 mb-2">
            <div className="card mx-2 shadow-lg text-center">
              <div className="card-header bg-primary text-white">
                <span className="font-weight-bold fuel-label">ALCOOL</span>
              </div>
              <div className="card-body">
                <div className="price-variation-container">
                  <p className="card-text mb-1">Ultimas 24 horas</p>
                  <h3 className="card-title mb-2">
                    R$ {alcoolAvgToday}/L
                    <span><i className={alcoolDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : alcoolDiferenceYesterday == 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={alcoolDiferenceYesterday > 0 ? 'text-danger small-percentage' : alcoolDiferenceYesterday == 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {alcoolDiferenceYesterday} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className="fas fa-chevron-down text-success fa-3x"></i><span
                    className="ml-2 text-success big-percentage">3.20%</span>
                </div>

              </div>
              <div className="py-3">
                <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-4 mb-2">
            <div className="card mx-2 shadow-lg text-center">
              <div className="card-header bg-success text-white">
                <span className="font-weight-bold fuel-label">ETANOL</span>
              </div>
              <div className="card-body">
                <div className="price-variation-container">
                  <p className="card-text mb-1">Ultimas 24 horas</p>
                  <h3 className="card-title mb-2">
                    R$ {etanolAvgToday}/L
                    <span><i className={etanolDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : etanolDiferenceYesterday == 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={etanolDiferenceYesterday > 0 ? 'text-danger small-percentage' : etanolDiferenceYesterday == 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {etanolDiferenceYesterday} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className="fas fa-chevron-down text-success fa-3x"></i><span
                    className="ml-2 text-success big-percentage">2.74%</span>
                </div>

              </div>
              <div className="py-3">
                <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-4 mb-2">
            <div className="card mx-2 shadow-lg text-center">
              <div className="card-header bg-danger text-white">
                <span className="font-weight-bold fuel-label">DIESEL</span>
              </div>
              <div className="card-body">
                <div className="price-variation-container">
                  <p className="card-text mb-1">Ultimas 24 horas</p>
                  <h3 className="card-title mb-2">
                    R$ {dieselAvgToday}/L
                    <span><i className={dieselDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : dieselDiferenceYesterday == 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={dieselDiferenceYesterday > 0 ? 'text-danger small-percentage' : dieselDiferenceYesterday == 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {dieselDiferenceYesterday} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className="fas fa-chevron-down text-success fa-3x"></i><span
                    className="ml-2 text-success big-percentage">2.74%</span>
                </div>

              </div>
              <div className="py-3">
                <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-4 mb-2">
            <div className="card mx-2 shadow-lg text-center">
              <div className="card-header bg-info text-white">
                <span className="font-weight-bold fuel-label">GASOLINA ADITIVADA</span>
              </div>
              <div className="card-body">
                <div className="price-variation-container">
                  <p className="card-text mb-1">Ultimas 24 horas</p>
                  <h3 className="card-title mb-2">
                    R$ {gasolinaAditivadaAvgToday}/L
                    <span><i className={gasolinaAditivadaDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : gasolinaAditivadaDiferenceYesterday == 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={gasolinaAditivadaDiferenceYesterday > 0 ? 'text-danger small-percentage' : gasolinaAditivadaDiferenceYesterday == 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {gasolinaAditivadaDiferenceYesterday} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className="fas fa-chevron-down text-success fa-3x"></i><span
                    className="ml-2 text-success big-percentage">2.74%</span>
                </div>

              </div>
              <div className="py-3">
                <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-4 mb-2">
            <div className="card mx-2 shadow-lg text-center">
              <div className="card-header bg-purple text-white">
                <span className="font-weight-bold fuel-label">GNV</span>
              </div>
              <div className="card-body">
                <div className="price-variation-container">
                  <p className="card-text mb-1">Ultimas 24 horas</p>
                  <h3 className="card-title mb-2">
                    R$ {gnvAvgToday}/L
                    <span><i className={gnvDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : gnvDiferenceYesterday == 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={gnvDiferenceYesterday > 0 ? 'text-danger small-percentage' : gnvDiferenceYesterday == 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {gnvDiferenceYesterday} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className="fas fa-chevron-down text-success fa-3x"></i><span
                    className="ml-2 text-success big-percentage">2.74%</span>
                </div>

              </div>
              <div className="py-3">
                <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


Home.propTypes = {
  posto: PropTypes.object.isRequired,
  getPostos: PropTypes.func.isRequired,
  calcAvgs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posto: state.posto
});

export default connect(
  mapStateToProps,
  { getPostos, calcAvgs }
)(Home);

