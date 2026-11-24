import { Route, Routes, BrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/users/RegisterPage";
import UserDetailsPage from "./pages/users/UserDetailsPage";
import LoginPage from "./pages/users/LoginPage";
import MissionsList from "./components/missions/MissionsList";
import DetailedMissionPage from "./pages/missions/DetailedMissionPage";
import UpdateMissionPage from "./pages/missions/UpdateMissionPage";
import NewMissionForm from "./components/missions/NewMissionForm";
import Layout from "./components/Layout";
import Protected from "./components/Protected";
import { useSetAtom } from "jotai";
import { UserAtom } from "./atoms/UserAtom";
import { useEffect } from "react";

function App() {
    const setUser = useSetAtom(UserAtom)
    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            setUser(JSON.parse(user))
        } else {
            setUser({})
        }

    }, [setUser])
    
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/login" element={<LoginPage />}/>
                        <Route path="/register" element={<RegisterPage />}/>
                        <Route element={<Protected/>}>
                            <Route path="/user-details" element={<UserDetailsPage />}/>
                            <Route path="/missions-list" element={<MissionsList />}/>
                            <Route path="/mission-details/:id" element={<DetailedMissionPage />}/>
                            <Route path="/update-mission/:id" element={<UpdateMissionPage />}/>
                            <Route path="/new-mission" element={<NewMissionForm />}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
