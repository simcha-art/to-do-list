import { useAtomValue } from "jotai";
import { UserAtom } from "../../atoms/UserAtom";
import UserDetailsCard from "../../components/users/UserDetailsCard";
import UpdateUserDetails from "../../components/users/UpdateUserDetails";
import { useState } from "react";
import UpdateUserDetails_v2 from "../../components/users/UpdateUserDetails_v2";

function UserDetailsPage() {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const user = useAtomValue(UserAtom);
    function toggle(){
        setIsEdit(prev => !prev)
    }


    return (
        <>
            {isEdit ? <UpdateUserDetails_v2 user={user} toggle={toggle}/> : <UserDetailsCard user={user} toggle={toggle}/>}
        </>
    );
}

export default UserDetailsPage;
