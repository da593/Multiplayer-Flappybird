import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'styles/index.css';
import 'styles/nav.css';
import {MainPage} from 'routes/MainPage';
import {LobbyPage} from 'routes/LobbyPage';
import {ErrorPage} from "routes/ErrorPage";
import {Navbar} from 'Navbar/Navbar';
import {dimensionsLoader} from 'routes/loaders'



let router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <MainPage/>,
            loader: dimensionsLoader,
          },
          {
            path: "game/:lobbyId",
            element: <LobbyPage/>,
            loader: dimensionsLoader,
          }
        ]
      },
    ]
  }
])



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

