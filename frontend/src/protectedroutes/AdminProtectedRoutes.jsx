import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoutes() {

    const { currentAdmin } = useSelector((state) => state.admin);

    const authenticatedAdmin = () => {
        return currentAdmin !== null;
    }

    const isAuthenticatedAdmin = authenticatedAdmin();
    return isAuthenticatedAdmin ? <Outlet /> : <Navigate to='/admin-auth' />;
}

export default AdminProtectedRoutes
