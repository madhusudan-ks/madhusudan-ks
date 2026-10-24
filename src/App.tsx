import { lazy, Suspense } from 'react';
import './App.css';
import { Box } from "@mui/material";
import NavAndTabs from "./components/navBarTabs/NavBarTabs";
import AppRoutes from "./app/AppRoutes";
import AppFooter from "./components/common/footer/AppFooter";

// Lazy load ChatWidget to ensure zero delay on initial portfolio page load
const ChatWidget = lazy(() => import('./features/chatbot/components/ChatWidget'));

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <NavAndTabs />
      <Box component="main" sx={{ flex: 1 }}>
        <AppRoutes />
      </Box>
      <AppFooter />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </Box>
  );
}

export default App;
