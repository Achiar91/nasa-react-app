import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function handleToggleModal() {
        setShowModal(!showModal);
    }

    useEffect(() => {
        async function fetchApiData() {
            const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
            const url =
                "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`;

            const today = new Date().toDateString();
            const localKey = `NASA-${today}`;
            if (localStorage.getItem(localKey)) {
                const apiData = JSON.parse(localStorage.getItem(localKey));
                setData(apiData);
                console.log("fetched from cache today");
                return;
            }

            localStorage.clear();

            try {
                const resp = await fetch(url);
                const apiData = await resp.json();
                localStorage.setItem(localKey, JSON.stringify(apiData));
                setData(apiData);
                console.log("fetched from api today");
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchApiData();
    }, []); // if [] runs the funtion on page reload
    return (
        <>
            {data ? (
                <Main data={data} />
            ) : (
                <div className="loadingState">
                    <i className="fa-solid fa-gear"></i>
                </div>
            )}
            {showModal && (
                <SideBar handleToggleModal={handleToggleModal} data={data} />
            )}

            {data && (
                <Footer handleToggleModal={handleToggleModal} data={data} />
            )}
        </>
    );
}

export default App;
