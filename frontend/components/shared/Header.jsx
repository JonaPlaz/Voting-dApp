import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="grow">Voting dApp</div>
      <div>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Header;
