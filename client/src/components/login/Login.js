import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logUser, getUser } from '../../actions/userActions';

const Login = ({logUser, getUser, login_token}) => {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        logUser(
            email,
            password
        );
        
        getUser(login_token);
        
        
        setEmail('');
        setPassword('');
    }

    return (
    <Fragment>
        <div className="modal fade" id="loginModal" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ModalLabel">Login</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" id="InputEmail" value={email} onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email"></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="InputPassword" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit"className="btn btn-primary" form="loginForm" value="Submit" >Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

Login.propTypes = {
  addUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    login_token: state.user.login_token
  });

export default connect(
    mapStateToProps,
  { logUser, getUser }
)(Login);