import { Routes, Route } from "react-router-dom";
import AccountDeck from "./pages/AccountDeck";
import MacCleaner from "./components/MacClearner";
import WindowsCleanerPage from "./components/WindowsCleanerPage";
import LinuxCleanerPage from "./components/LinuxClearnerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AccountDeck />} />
      <Route path="/mac-cleaner" element={<MacCleaner />} />
      <Route path="/windows-cleaner" element={<WindowsCleanerPage />} />
      <Route path="/linux-cleaner" element={<LinuxCleanerPage />} />
    </Routes>
  );
}

export default App;
