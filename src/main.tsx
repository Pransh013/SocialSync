import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
