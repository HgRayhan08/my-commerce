import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      password: form.password.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      form.reset();
      setLoading(false);
      push("/auth/login");
    } else {
      setLoading(false);
      setError("email is re ady registerd");
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <div className="">
        <h1 className="text-center text-lg font-bold">Registrasi</h1>
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
            <div className="flex flex-col my-2">
              <label htmlFor="fullname">fullname</label>
              <input
                name="fullname"
                id="fullname"
                type="text"
                className="bg-gray-300 p-1"
              />
            </div>{" "}
            <div className="flex flex-col my-2">
              <label htmlFor="phone">Phone</label>
              <input
                name="phone"
                id="phone"
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

export default RegisterView;
