import { Route, Routes, BrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/users/RegisterPage";
import UserDetailsPage from "./pages/users/UserDetailsPage";
import LoginPage from "./pages/users/LoginPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/user-details" element={<UserDetailsPage />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
