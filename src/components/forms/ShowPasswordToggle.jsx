import { useState } from "react";

const ShowPasswordToggle = ({ inputId }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => {
      const input = document.getElementById(inputId);
      if (input) {
        input.type = !prevShowPassword ? "text" : "password";
      }
      return !prevShowPassword;
    });
  };

  return (
    <div className="mt-2">
      <input type="checkbox" id="showPassword" name="showPassword" checked={showPassword} onChange={togglePasswordVisibility} />
      <label className="ml-1 text-zinc-500" htmlFor="showPassword">
        Mostrar senha
      </label>
    </div>
  );
};

export default ShowPasswordToggle;
