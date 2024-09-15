import Logo from "./_components/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-red-500 flex flex-col items-center gap-y-4">
      <div className="bg-green-400">Join livestream now</div>
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
