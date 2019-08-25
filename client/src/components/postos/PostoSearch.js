import React, { useRef } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchPostos, clearSearchedPostos } from '../../actions/postoActions';

const PostoSearch = ({ searchPostos, clearSearchedPostos }) => {

  const text = useRef('');

  const onChange = e => {
    if (text.current.value !== '') {
      searchPostos(text.current.value);
    } else {
      clearSearchedPostos();
    }

  };


  return (
    <form className="mb-2">
      <div className="input-group">
        <input id="search" type="text" className="form-control" ref={text}
          onChange={onChange} placeholder="Pesquisar Posto..." />
        <div className="input-group-append">
          <button className="btn btn-dark" type="button">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </form>
  )
}

PostoSearch.propTypes = {
  searchPostos: PropTypes.func.isRequired,
  clearSearchedPostos: PropTypes.func.isRequired
};

export default connect(
  null,
  { searchPostos, clearSearchedPostos }
)(PostoSearch);


