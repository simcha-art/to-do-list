import { Route, Routes, BrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import UserDetailsPage from "./pages/UserDetailsPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" />
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/user-details" element={<UserDetailsPage />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
