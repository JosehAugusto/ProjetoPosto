import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../../actions/userActions';

const Register = user => {

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target[1].value);
    }

    return (
    <div>
        <div className="modal fade" id="registerModal" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="ModalLabel">Registro</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form id="registerForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email"></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" id="InputUsername" placeholder="Username"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="InputPassword" placeholder="Password"></input>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" form="registerForm">Salvar</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

Register.propTypes = {
  user: PropTypes.object.isRequired,
  addUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { addUser }
)(Register);