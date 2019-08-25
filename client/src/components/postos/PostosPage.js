import React from 'react'
import PostoForm from './PostoForm'
import PostoSearch from './PostoSearch'
import Postos from './Postos'
import { ToastContainer } from 'react-toastify';

const PostosPage = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-5 shadow form-container">
          <ToastContainer autoClose={8000} />
          <PostoForm />
        </div>
        <div className="col-lg-7 boder">
          <PostoSearch />
          <Postos />
        </div>
      </div>
    </div>
  )
}

export default PostosPage
