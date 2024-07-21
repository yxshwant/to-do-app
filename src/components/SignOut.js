import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = ({ onAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuth(false);
    navigate("/signin");
  }, [navigate, onAuth]);

  return null;
};

export default SignOut;
