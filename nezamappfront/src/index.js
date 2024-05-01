import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import Home from "./components/Home/Home";
import Post from "./components/Post/Post";
import Transaction from "./components/Transaction/Transaction";
import CreateUser from "./components/Create/CreateUser";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <CreateUser /> },
  { path: "*", element: <Navigate to="/" /> },

  {
    path: "/home/:name",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Post />,
  },
  {
    path: "/transaction/:id",
    element: <Transaction />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
