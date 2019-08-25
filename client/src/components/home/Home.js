import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostos, calcAvgs } from '../../actions/postoActions';

const Home = ({ posto: {postos, current_avg }, getPostos, calcAvgs }) => {

  useEffect(() => {
    getPostos()
    calcAvgs(postos)
    // eslint-disable-next-line
  }, []);

  return (
    <div>
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
                    {current_avg.comun}/L
                    <span><i className="fas fa-chevron-down text-success fa-sm"></i></span>
                    <span className="text-success small-percentage"> 2.37% </span>
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
                  {current_avg.alcool}/L
                    <span><i className="fas fa-chevron-up text-danger fa-sm"></i></span>
                    <span className="text-danger small-percentage"> 0.28% </span>
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
                  {current_avg.etanol}/L
                    <span><i className="fas fa-equals text-warning fa-sm"></i></span>
                    <span className="text-warning small-percentage"> 0.00% </span>
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
                  {current_avg.diesel}/L
                    <span><i className="fas fa-equals text-warning fa-sm"></i></span>
                    <span className="text-warning small-percentage"> 0.00% </span>
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
                  {current_avg.aditivada}/L
                    <span><i className="fas fa-equals text-warning fa-sm"></i></span>
                    <span className="text-warning small-percentage"> 0.00% </span>
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
                  {current_avg.gnv}/L
                    <span><i className="fas fa-equals text-warning fa-sm"></i></span>
                    <span className="text-warning small-percentage"> 0.00% </span>
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

