import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import SingleBook from "../pages/Book/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrdersPage from "../pages/OrdersPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../dashboard/users/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import AddBook from "../dashboard/addBook/AddBook";
import UpdateBook from "../dashboard/EditBook/UpdateBook";
import ManageBooks from "../dashboard/manageBooks/ManageBooks";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/orders",
                element: <PrivateRoute><OrdersPage /></PrivateRoute>
            },
            {
                path: "/about",
                element: <div>About</div>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/checkout",
                element: <PrivateRoute><Checkout /></PrivateRoute>
            },
            {
                path: "/books/:id",
                element: <SingleBook />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLogin />
    },
    {
        path: "/dashboard",
        element: <AdminRoute><DashboardLayout /></AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute><Dashboard /></AdminRoute>
            },
            {
                path: "add-new-book",
                element: <AdminRoute><AddBook /></AdminRoute>
            },
            {
                path: "edit-book:/id",
                element: <AdminRoute><UpdateBook /></AdminRoute>
            },
            {
                path: "manage-books",
                element: <AdminRoute><ManageBooks /></AdminRoute>
            }
        ]
    },
]);

export default router;