import React, { useEffect } from 'react'
import PostoItem from './PostoItem'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostos } from '../../actions/postoActions';

const Postos = ({ posto: { postos, searched_postos }, getPostos }) => {

  useEffect(() => {
    getPostos();
    // eslint-disable-next-line
  }, []);


  return (
    <div>
      {searched_postos !== null ? searched_postos.map(posto => <PostoItem posto={posto} key={posto._id} />) : (postos !== null ? postos.map(posto => <PostoItem posto={posto} key={posto._id} />) : <Spinner />)}
    </div>
  )
}

Postos.propTypes = {
  posto: PropTypes.object.isRequired,
  getPostos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posto: state.posto
});

export default connect(
  mapStateToProps,
  { getPostos }
)(Postos);

