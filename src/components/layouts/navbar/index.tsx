import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="flex items-center fixed h-10 w-full p-5 bg-black">
      <button
        className="bg-white border-none px-3"
        onClick={() => (data ? signOut() : signIn())}
      >
        {data ? "logout" : "login"}
      </button>
    </div>
  );
};

export default Navbar;
