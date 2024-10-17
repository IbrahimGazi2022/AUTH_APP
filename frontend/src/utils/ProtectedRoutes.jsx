import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";


// Redirect Authenticated user to the homepage
export const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    if (isAuthenticated && user.isVerified) {
        return <Navigate to="/" replace />;
    }
    return children;
};
