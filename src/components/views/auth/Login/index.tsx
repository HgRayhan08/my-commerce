import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const LoginView = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  //   const callbackUrl: string = `${query.callback}` || "/";
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setLoading(false);
        setError("email or password is inCorract");
      }
    } catch (error) {
      setLoading(false);
      setError("email or password is inCorract");
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <div className="">
        <h1 className="text-center text-lg font-bold">Login</h1>
        {error && <div className="text-center mb-3 text-red-500">{error}</div>}
        <div className="w-80 p-3 my-3 border-2 border-b-slate-300">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col my-2">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                id="email"
                type="text"
                className="bg-gray-300 p-1"
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                id="password"
                type="text"
                className="bg-gray-300 p-1"
              />
            </div>
            <button className="bg-black w-full mt-5 p-2 text-white text-sm">
              {isLoading ? "Loading..." : " Registrasi"}
            </button>
          </form>
        </div>
        <p className="text-center">Have account? Sign in here</p>
      </div>
    </section>
  );
};

export default LoginView;
