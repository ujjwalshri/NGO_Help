import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashBoard from "./pages/AdminDashBoard";
import SubmitReport from "./pages/SubmitReport";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AdminDashBoard />
              </ProtectedRoute>
            } />
            <Route path="/" element={<SubmitReport />} />
          </Routes>
        </main>
        <ToastContainer />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
