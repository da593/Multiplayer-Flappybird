import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'styles/index.css';
import 'styles/nav.css';
import { MainPage } from 'routes/MainPage';
import { LobbyPage } from 'routes/LobbyPage';
import {ErrorPage } from "routes/ErrorPage";
import { Navbar } from 'Navbar/Navbar';
import { dimensionsLoader } from 'routes/loaders'
import { io } from 'socket.io-client';
import { baseUrl } from "api/axios";


const socket = io(baseUrl);

let router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <MainPage socket={socket}/>,
            loader: dimensionsLoader,
          },
          {
            path: "lobby/:lobbyId",
            element: <LobbyPage socket={socket}/>,
            loader:  dimensionsLoader,
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


