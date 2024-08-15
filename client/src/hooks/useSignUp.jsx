import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError } from "../redux/slices/error.slice";
import { setLoading } from "../redux/slices/loading.slice";
import { setSuccess } from "../redux/slices/success.slice";
import { setUser } from "../redux/slices/user.slice";
import { signup } from "../api/auth.api";

export default function useSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const moderatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (strongPassword.test(password)) {
      setPasswordStrength("strong");
    } else if (moderatePassword.test(password)) {
      setPasswordStrength("moderate");
    } else {
      setPasswordStrength("weak");
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    checkPasswordStrength(value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignupClick = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const res = await signup({ name, email, password });
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      dispatch(setUser(res.user));
      dispatch(setSuccess(res.message));
      navigate("/dashboard");
    }
    dispatch(setLoading(false));
  };

  return {
    handleSignupClick,
    name,
    setName,
    email,
    setEmail,
    password,
    handlePasswordChange,
    showPassword,
    toggleShowPassword,
    passwordStrength,
  };
}
