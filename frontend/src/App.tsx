import { Route, Routes, BrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/users/RegisterPage";
import UserDetailsPage from "./pages/users/UserDetailsPage";
import LoginPage from "./pages/users/LoginPage";
import MissionsList from "./components/missions/MissionsList";
import DetailedMissionPage from "./pages/missions/DetailedMissionPage";
import UpdateMissionPage from "./pages/missions/UpdateMissionPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/user-details" element={<UserDetailsPage />}/>
                    <Route path="/missions-list" element={<MissionsList />}/>
                    <Route path="/mission-details/:id" element={<DetailedMissionPage />}/>
                    <Route path="/update-mission/:id" element={<UpdateMissionPage />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
