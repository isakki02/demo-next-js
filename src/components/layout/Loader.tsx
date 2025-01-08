import React from 'react'

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center text-center w-100" style={{ minHeight: '100vh' }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}


export default Loader