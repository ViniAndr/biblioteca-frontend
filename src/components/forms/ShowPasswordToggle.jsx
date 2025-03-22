import { useState } from "react";

const ShowPasswordToggle = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => {
      return !prev;
    });

    onToggle(!showPassword);
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
