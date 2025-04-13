import React from "react";
import InstagramLoginPage from "./Components/InstagramLoginPage";
import Dashboard from "./Components/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InstagramProfile from "./Components/InstagramProfile";
import Wrapper from "./Wrappers/Wrapper";
import PrivateWrapper from "./Wrappers/PrivateWrapper";
import NonPrivateWrapper from "./Wrappers/NonPrivateWrapper";

export default function AppRouters() {
  const router = createBrowserRouter([
    {
      element: <Wrapper />,
      children: [
        {
          element: <NonPrivateWrapper />,
          children: [
            {
              path: "/",
              element: <InstagramLoginPage />,
            },
          ],
        },
        {
          element: <PrivateWrapper />,
          children: [
            {
              path: "/dashboard",
              element: <InstagramProfile />,
              //   element: <Dashboard />,
            },
          ],
        },
        {
          path: "*",
          element: <InstagramLoginPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
