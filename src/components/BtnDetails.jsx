export const BtnDetails = ({ btn, SetIdDetails, SetModalDetails }) => {
  const SetModalDetail = () => {
    SetModalDetails();
  };

  const SetIdDetail = (id) => {
    SetIdDetails(id);
  };

  return (
      <>
      {btn ? <button className="button" onClick={() => { SetIdDetail(btn.Id); SetModalDetail(); }}>
      <span>{btn.Name}</span>
    </button>:null }
      </>
  );
};
