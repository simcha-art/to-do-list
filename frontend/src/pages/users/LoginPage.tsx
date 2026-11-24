import { useNavigate } from "react-router-dom";
import LoginForm_v2 from "../../components/users/LoginForm_v2";
import Welcome from "../../components/Welcome";
import {  useRef } from "react";

function LoginPage() {
    const loginRef = useRef<HTMLDivElement>(null);
    function moveToLogin() {
      loginRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      })
    }

    const navigate = useNavigate();
    return (
        <>

            <Welcome moveToLogin={moveToLogin} />
            <div ref={loginRef}>
                <LoginForm_v2 onSuccess={() => navigate("/missions-list")} />
            </div>
        </>
    );
}

export default LoginPage;
