import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import DashboardHeader from "./components/DashboardHeader";
import Bookings from "./components/Bookings/Dashboard";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Channels from "./components/Channels/Channels";
import Notifications from "./components/Notifications/Notifications";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import RPC from "./web3RPC"; // for using web3.js
//import RPC from "./ethersRPC"; // for using ethers.js

const clientId =
  "BO7LRv2PDLLoXc1XvKWRE4DqbxsOHdk-5XVlr7rbfL9AfzNW0Hk1ANzw8hyBYpxf5YKW191kfQf-7hwr03nITFw";

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const LoginPage = () => {
    return (
      <div className="unloggedContainer">
        <button onClick={login} className="card">
          Login
        </button>
      </div>
    );
  };

  if (!provider) {
    return <LoginPage />;
  }

  return (
    <Router>
      <div className="container">
        <DashboardHeader />
        <div className="dashboardNav">
          <img
            src={process.env.PUBLIC_URL + "CheckoutDAOBlue.png"}
            className={"logo"}
            alt="logo"
          />
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/channels">Channels</Link>
              </li>
              <li>
                <Link to="/">Bookings</Link>
              </li>
              <li>
                <Link to="/notifications">Notifications</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>
          <button onClick={logout} className="card logoutButton">
            Log Out
          </button>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        </div>
        <Routes>
          <Route path="/" element={<Bookings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <div id="console" style={{ whiteSpace: "pre-line" }}>
          <p style={{ whiteSpace: "pre-line" }}></p>
        </div>
      </div>
    </Router>
  );
}

export default App;
