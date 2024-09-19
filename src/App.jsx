import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import MainLayout from "@/layouts/MainLayout"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
// import Callback from "@/pages/Callback";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/*<Route path="/callback" element={<Callback />} />*/}
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  )
}