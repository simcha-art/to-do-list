import { useAtomValue } from "jotai";
import { UserAtom } from "../atoms/UserAtom";
import UserDetailsCard from "../components/UserDetailsCard";
import UpdateUserDetails from "../components/UpdateUserDetails";
import { useState } from "react";

function UserDetailsPage() {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const user = useAtomValue(UserAtom);
    function toggle(){
        setIsEdit(prev => !prev)
    }


    return (
        <>
            {isEdit ? <UpdateUserDetails user={user} toggle={toggle}/> : <UserDetailsCard user={user} toggle={toggle}/>}
        </>
    );
}

export default UserDetailsPage;
