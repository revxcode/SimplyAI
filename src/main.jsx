import React from 'react'
import ReactDOM from 'react-dom/client'
import NewHome from './pages/Testing/NewHome.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NewHome />
    )
  },
], {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionStatusRevalidation: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </React.StrictMode>,
)
