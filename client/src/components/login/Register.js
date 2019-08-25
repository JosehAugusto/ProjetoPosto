import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addNewUser } from '../../actions/userActions';

const Register = ({addNewUser}) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        addNewUser({
            email,
            name,
            password,
          });


          setEmail('');
          setName('');
          setPassword('');
    }

    return (
    <Fragment>
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
                        <input type="email" className="form-control" id="InputEmail" onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email"></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" id="InputUsername" onChange={e => setName(e.target.value)} placeholder="Username"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="InputPassword" onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit"className="btn btn-primary" form="registerForm" value="Submit">Salvar</button>
            </div>
            </div>
        </div>
        </div>
    </Fragment>
  )
}

Register.propTypes = {
  addNewUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { addNewUser }
)(Register);