export const AlertError = ({ isVisible, msg }) => {
  return (
    <>
      <div className="alert-container">
        <div className={`alert ${isVisible ? 'active' : ''}`}
             style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
          <i className="fa-solid fa-circle-exclamation"></i>
          <p>{msg}</p>
        </div>
      </div>
    </>
  )
}