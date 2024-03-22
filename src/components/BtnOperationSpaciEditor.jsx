export const BtnOperationSpaciEditor = ({message,SetNewOperation}) => {
    const setNewOperation = () => {
        SetNewOperation()

    }
    return (
        <>
            <>
                <div className="button-panel">
                    <button className="button" onClick={setNewOperation}>
                        <span>{message}</span>
                    </button>
                </div>
            </>
        </>
    )
}