import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostos } from '../../actions/postoActions';
import { Line } from 'react-chartjs-2';
//import { set } from 'mongoose';

const Home = ({ posto: { postos }, getPostos }) => {

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
  // Diferença entre hoje e 30 dias atras
  let gasolinaComunDiference30day = 0;
  let gasolinaAditivadaDiference30day = 0;
  let etanolDiference30day = 0;
  let gnvDiference30day = 0;
  let dieselDiference30day = 0;
  let alcoolDiference30day = 0;

  let chartData = {
    labels: ['22/08', '23/08', '24/08', '25/08', '26/08', '27/08', '28/08', '29/08'],
    datasets: [{
      label: 'Gasolina Comum',
      data: [1, 2, 3, 4, 5, 6, 7, 8
      ],
      fill: false,
      borderColor: "red"
    }, {
      label: 'Gasolina Aditivada',
      data: [2, 12, 8, 5, 3, 18, 20, 24
      ],
      fill: false,
      borderColor: "blue"
    }]
  }

  let options = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }


  useEffect(() => {
    getPostos()
    // eslint-disable-next-line
  }, []);


  const novoCalc = () => {
    if(postos){

      // arrays que guardam as medias dos 31 dias
      let gasolinaComunAvgsArray = [];
      let gasolinaAditivadaAvgsArray = [];
      let etanolAvgsArray = [];
      let alcoolAvgsArray = [];
      let gnvAvgsArray = [];
      let dieselAvgsArray = [];

      let size = 0;
      let sum = 0;
      let count;

      // Mostrando os ultimos count+1 dias
      for (count = 30; count > -1; count--) { 
        // arrays que guardam os preços dos postos por dia
        let gasolinaComunPricesArray = [];
        let gasolinaAditivadaPricesArray = [];
        let etanolPricesArray = [];
        let alcoolPricesArray = [];
        let gnvPricesArray = [];
        let dieselPricesArray = [];

        postos.forEach(posto => {
          if (posto.gasolina_comun_price.length > count) {
            gasolinaComunPricesArray.push(posto.gasolina_comun_price[count])
          }
          if (posto.gasolina_aditivada_price.length > count) {
            gasolinaAditivadaPricesArray.push(posto.gasolina_aditivada_price[count])
          }
          if (posto.etanol_price.length > count) {
            etanolPricesArray.push(posto.etanol_price[count])
          }
          if (posto.alcool_price.length > count) {
            alcoolPricesArray.push(posto.alcool_price[count])
          }
          if (posto.gnv_price.length > count) {
            gnvPricesArray.push(posto.gnv_price[count])
          }
          if (posto.diesel_price.length > count) {
            dieselPricesArray.push(posto.diesel_price[count])
          }
        });

        if(gasolinaComunPricesArray.length > 0){
          size = gasolinaComunPricesArray.length;
          sum = gasolinaComunPricesArray.reduce((previous, current) => current += previous);
          gasolinaComunAvgsArray.push(sum/size);
        }
        if(gasolinaAditivadaPricesArray.length > 0){
          size = gasolinaAditivadaPricesArray.length;
          sum = gasolinaAditivadaPricesArray.reduce((previous, current) => current += previous);
          gasolinaAditivadaAvgsArray.push(sum/size);
        }
        if(etanolPricesArray.length > 0){
          size = etanolPricesArray.length;
          sum = etanolPricesArray.reduce((previous, current) => current += previous);
          etanolAvgsArray.push(sum/size);
        }
        if(alcoolPricesArray.length > 0){
          size = alcoolPricesArray.length;
          sum = alcoolPricesArray.reduce((previous, current) => current += previous);
          alcoolAvgsArray.push(sum/size);
        }
        if(gnvPricesArray.length > 0){
          size = gnvPricesArray.length;
          sum = gnvPricesArray.reduce((previous, current) => current += previous);
          gnvAvgsArray.push(sum/size);
        }
        if(dieselPricesArray.length > 0){
          size = dieselPricesArray.length;
          sum = dieselPricesArray.reduce((previous, current) => current += previous);
          dieselAvgsArray.push(sum/size);
        }
      }

      gasolinaComunDiferenceYesterday = gasolinaComunAvgsArray[29];
      gasolinaAditivadaDiferenceYesterday = gasolinaAditivadaAvgsArray[29];
      etanolDiferenceYesterday = etanolAvgsArray[29];
      gnvDiferenceYesterday = gnvAvgsArray[29];
      dieselDiferenceYesterday = dieselAvgsArray[29];
      alcoolDiferenceYesterday = alcoolAvgsArray[29];
      
      gasolinaComunDiference30day = gasolinaComunAvgsArray[0];
      gasolinaAditivadaDiference30day =  gasolinaAditivadaAvgsArray[0];
      etanolDiference30day = etanolAvgsArray[0];
      gnvDiference30day = gnvAvgsArray[0];
      dieselDiference30day = dieselAvgsArray[0];
      alcoolDiference30day = alcoolAvgsArray[0];

      gasolinaComunAvgToday = gasolinaComunAvgsArray[30];
      gasolinaAditivadaAvgToday = gasolinaAditivadaAvgsArray[30];
      etanolAvgToday = etanolAvgsArray[30];
      gnvAvgToday = gnvAvgsArray[30];
      dieselAvgToday = dieselAvgsArray[30];
      alcoolAvgToday = alcoolAvgsArray[30];

    }
  }
  
  return (
    <div>
      {novoCalc()}
      <div className="container my-4">
        <div>
          <Line data={chartData} options={options} />
        </div>
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
                    R$ {gasolinaComunAvgToday.toFixed(2)}/L
                    <span><i className={gasolinaComunDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : gasolinaComunDiferenceYesterday === 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={gasolinaComunDiferenceYesterday > 0 ? 'text-danger small-percentage' : gasolinaComunDiferenceYesterday === 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {gasolinaComunDiferenceYesterday.toFixed(2)} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className={gasolinaComunDiference30day > 0 ? 'fas fa-chevron-up text-danger fa-3x' : gasolinaComunDiference30day === 0 ? 'fas fa-equals text-warning fa-3x' : 'fas fa-chevron-down text-success fa-3x'}></i>
                  <span className={gasolinaComunDiference30day > 0 ? 'ml-2 text-danger big-percentage' : gasolinaComunDiference30day === 0 ? 'ml-2 text-warning big-percentage' : 'ml-2 text-success big-percentage'}>{gasolinaComunDiference30day.toFixed(2)} R$</span>
                </div>
              </div>
              <div className="py-3">
                {/*
                <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
                */}
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
                    R$ {alcoolAvgToday.toFixed(2)}/L
                    <span><i className={alcoolDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : alcoolDiferenceYesterday === 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={alcoolDiferenceYesterday > 0 ? 'text-danger small-percentage' : alcoolDiferenceYesterday === 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {alcoolDiferenceYesterday.toFixed(2)} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className={alcoolDiference30day > 0 ? 'fas fa-chevron-up text-danger fa-3x' : alcoolDiference30day === 0 ? 'fas fa-equals text-warning fa-3x' : 'fas fa-chevron-down text-success fa-3x'}></i>
                  <span className={alcoolDiference30day > 0 ? 'ml-2 text-danger big-percentage' : alcoolDiference30day === 0 ? 'ml-2 text-warning big-percentage' : 'ml-2 text-success big-percentage'}>{alcoolDiference30day.toFixed(2)} R$</span>
                </div>

              </div>
              <div className="py-3">
                {/*
                    <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
                  */}
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
                    R$ {etanolAvgToday.toFixed(2)}/L
                    <span><i className={etanolDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : etanolDiferenceYesterday === 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={etanolDiferenceYesterday > 0 ? 'text-danger small-percentage' : etanolDiferenceYesterday === 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {etanolDiferenceYesterday.toFixed(2)} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className={etanolDiference30day > 0 ? 'fas fa-chevron-up text-danger fa-3x' : etanolDiference30day === 0 ? 'fas fa-equals text-warning fa-3x' : 'fas fa-chevron-down text-success fa-3x'}></i>
                  <span className={etanolDiference30day > 0 ? 'ml-2 text-danger big-percentage' : etanolDiference30day === 0 ? 'ml-2 text-warning big-percentage' : 'ml-2 text-success big-percentage'}>{etanolDiference30day.toFixed(2)} R$</span>
                </div>

              </div>
              <div className="py-3">
                {/*
                <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
                */}
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
                    R$ {dieselAvgToday.toFixed(2)}/L
                    <span><i className={dieselDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : dieselDiferenceYesterday === 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={dieselDiferenceYesterday > 0 ? 'text-danger small-percentage' : dieselDiferenceYesterday === 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {dieselDiferenceYesterday.toFixed(2)} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className={dieselDiference30day > 0 ? 'fas fa-chevron-up text-danger fa-3x' : dieselDiference30day === 0 ? 'fas fa-equals text-warning fa-3x' : 'fas fa-chevron-down text-success fa-3x'}></i>
                  <span className={dieselDiference30day > 0 ? 'ml-2 text-danger big-percentage' : dieselDiference30day === 0 ? 'ml-2 text-warning big-percentage' : 'ml-2 text-success big-percentage'}>{dieselDiference30day.toFixed(2)} R$</span>
                </div>

              </div>
              <div className="py-3">
                {/*
                <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
                */}
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
                    R$ {gasolinaAditivadaAvgToday.toFixed(2)}/L
                    <span><i className={gasolinaAditivadaDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : gasolinaAditivadaDiferenceYesterday === 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={gasolinaAditivadaDiferenceYesterday > 0 ? 'text-danger small-percentage' : gasolinaAditivadaDiferenceYesterday === 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {gasolinaAditivadaDiferenceYesterday.toFixed(2)} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className={gasolinaAditivadaDiference30day > 0 ? 'fas fa-chevron-up text-danger fa-3x' : gasolinaAditivadaDiference30day === 0 ? 'fas fa-equals text-warning fa-3x' : 'fas fa-chevron-down text-success fa-3x'}></i>
                  <span className={gasolinaAditivadaDiference30day > 0 ? 'ml-2 text-danger big-percentage' : gasolinaAditivadaDiference30day === 0 ? 'ml-2 text-warning big-percentage' : 'ml-2 text-success big-percentage'}>{gasolinaAditivadaDiference30day.toFixed(2)} R$</span>
                </div>

              </div>
              <div className="py-3">
                {/*
                <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
                */}
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
                    R$ {gnvAvgToday.toFixed(2)}/L
                    <span><i className={gnvDiferenceYesterday > 0 ? 'fas fa-chevron-up text-danger fa-sm ml-2' : gnvDiferenceYesterday === 0 ? 'fas fa-equals text-warning fa-sm ml-2' : 'fas fa-chevron-down text-success fa-sm ml-2'} ></i></span>
                    <span className={gnvDiferenceYesterday > 0 ? 'text-danger small-percentage' : gnvDiferenceYesterday === 0 ? 'text-warning small-percentage' : 'text-success small-percentage'}> {gnvDiferenceYesterday.toFixed(2)} R$ </span>
                  </h3>
                </div>
                <div className="price-variation-container py-3">
                  <p className="card-text mb-0">Variação nos últimos 30 dias</p>
                  <i className={gnvDiference30day > 0 ? 'fas fa-chevron-up text-danger fa-3x' : gnvDiference30day === 0 ? 'fas fa-equals text-warning fa-3x' : 'fas fa-chevron-down text-success fa-3x'}></i>
                  <span className={gnvDiference30day > 0 ? 'ml-2 text-danger big-percentage' : gnvDiference30day === 0 ? 'ml-2 text-warning big-percentage' : 'ml-2 text-success big-percentage'}>{gnvDiference30day.toFixed(2)} R$</span>
                </div>

              </div>
              <div className="py-3">
                {/*
                <a href="#" className="btn btn-outline-dark"><i className="fas fa-chart-line mr-2"></i>Histórico</a>
                */}
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
};

const mapStateToProps = state => ({
  posto: state.posto
});

export default connect(
  mapStateToProps,
  { getPostos }
)(Home);

