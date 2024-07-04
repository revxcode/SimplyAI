import { ThemeProvider } from "@/components/theme-provider";
import MainLayout from "@/layouts/MainLayout";
import Home from "./components/Home";

// eslint-disable-next-line react/prop-types
export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MainLayout>
        <Home />
      </MainLayout>
    </ThemeProvider>
  );
}
