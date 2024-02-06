import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

//layouts
import ServerLayout, { serverLayoutLoader } from "./layouts/ServerLayout.tsx";

//pages
import App from "./App.tsx";
import DashboardPage from "./pages/dashboard.tsx";
import ChannelPage, { channelLoader } from "./pages/channel.tsx";

const queryClient = new QueryClient();

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
        path: "channels/:channelId",
        loader: channelLoader,
        element: <ChannelPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
