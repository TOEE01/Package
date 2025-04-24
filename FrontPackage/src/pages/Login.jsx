import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
import { loginUsuario } from "../services/Usuario";
import { useNavigate } from 'react-router-dom';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

export function Basic({ setLogueado }) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  /*
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUsuario({ email, password });
      setLogueado(true); 
      setError(""); 
      localStorage.setItem("usuario", JSON.stringify(data)); 
      navigate('/home');
      console.log("datos" , data);
    } catch (err) {
      setError("Correo o contraseña incorrectos.",err);
    }
  };
*/

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const data = await loginUsuario({ email, password });
    console.log("datos de la data:" , data);
    //if (data.usuario) {
      //localStorage.setItem("usuario", JSON.stringify(data.usuario));
    //} else {
      //localStorage.setItem("usuario", JSON.stringify(data)); // por si ya es el usuario directamente
    //}
    localStorage.setItem("rol",(data.rol));
  

    setLogueado(true);
    setError("");
    navigate('/home');
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    setError("Correo o contraseña incorrectos.");
  }
};
  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h2" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form action="#" className="mx-auto max-w-[23rem] text-left px-5 py-5 rounded-md" style={{ border: "1px solid black" }} onSubmit={handleLogin}>
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="email" className="mb-2 block font-medium text-gray-900">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 p-2 border border-blue-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="mb-2 block font-medium text-gray-900">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordShown ? "text" : "password"}
                autoComplete="current-password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 p-2 border border-blue-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisiblity}
                className="absolute right-2 top-2.5 text-gray-600"
              >
                {passwordShown ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <Button type="submit" color="grey" size="lg" className="mt-6 text-black py-3" fullWidth>
            Sign in
          </Button>

          <div className="!mt-4 flex justify-self-center">
            <Typography as="a" href="#" color="blue-gray" variant="small" className="font-medium">
              Forgot password
            </Typography>
          </div>

          <Button variant="outlined" size="lg" className="mt-6 flex h-12 items-center justify-center gap-2" fullWidth>
            <img src={`https://www.material-tailwind.com/logos/logo-google.png`} alt="google" className="h-6 w-6" />
            sign in with google
          </Button>

          <Typography variant="small" color="gray" className="!mt-4 text-center font-normal">
            Not registered?{" "}
            <Link to="/usuarios/crear" className="font-medium text-gray-900">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default Basic;
