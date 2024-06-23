import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom"

function UserProtectedRoutes() {
    const { currentUser } = useSelector((state) => state.user);
    const authenticatedUser = () => {
        return currentUser !== null;
    }

    const isAuthenticated = authenticatedUser();

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

export default UserProtectedRoutes;
