export default function SideBar(props) {
    const {handleToggleModal,data} = props
    return (
        <div className="sidebar">
            <div className="bgOverlay"></div>
                <div className="sidebarContent">
                    <h2>{data?.title}</h2>
                    <div className="descriptionContainer">
                        <p className="descriptionDate">{data?.date}</p>
                        <p>{data.explanation}</p>
                    </div>
                    <button onClick={handleToggleModal}>
                    <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            
        </div>
    );
}
