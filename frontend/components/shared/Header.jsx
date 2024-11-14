import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <nav className="navbar bg-[#0a0a23] text-white p-4 flex items-center">
      <div className="text-xl font-bold grow">Voting dApp</div>
      <div>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Header;
