// src/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Public from './components/Public/Public';
import Login from './components/Login/Login';
import Secure from './components/Secure/Secure';
import { useAppSelector } from './store/hooks';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((s: any) => s.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/public" element={<Public />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/secure"
        element={
          <ProtectedRoute>
            <Secure />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
