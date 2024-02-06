import React from "react";
import "./index.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import DashboardPage from "./pages/dashboard.tsx";
import ServerLayout, { serverLayoutLoader } from "./layouts/ServerLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "dashboard",
    element: <DashboardPage />,
  },
  {
    path: "servers/:serverId",
    loader: serverLayoutLoader,
    element: <ServerLayout />,
    children: [
      {
        path: ":channelId",
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
