import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/FakeauthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { IA } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!IA) navigate("/");
    },
    [IA, navigate]
  );

  return IA ? { children } : null;
};

export default ProtectedRoute;
