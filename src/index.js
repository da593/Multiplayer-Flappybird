import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'styles/index.css';
import 'styles/nav.css';
import {MainPage} from 'routes/MainPage';
import {GamePage} from 'routes/GamePage';
import {ErrorPage} from "routes/ErrorPage";
import {Navbar} from 'Navbar/Navbar';


let router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "gamepage",
        element: <GamePage/>,
        errorElement: <ErrorPage/>,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      
      <RouterProvider router={router} />

  </React.StrictMode>
);


