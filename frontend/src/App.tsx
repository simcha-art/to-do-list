import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" />
                    <Route path="/register" />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
