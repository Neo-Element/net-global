import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/* import { setPosition } from "./states/geoLocalizacion"; */
import { effectLogin } from "./states/user";
import Login from "./components/Login";
import ClientForm from "./components/ClientFrom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import UserPage from "./components/UserPage";
import "bootstrap/dist/css/bootstrap.min.css";
import UserInfo from "./components/UserInfo";
import Security from "./components/Security";
import "./style/index.scss";
import Sidebar from "./components/Sidebar";
import Clients from "./components/Clients";
import { effectDevice } from "./states/device";
import HomeMobile from "./components/homeMobile";
import CardClient from "./components/CardClient";
import EditClient from "./components/EditClient";
import NavbarMobile from "./components/NavMobile";
import SecurityList from "./components/SecurityList";
import BranchOfficeForm from "./components/BranchOfficeForm";
import SearchBranchOffice from "./components/SearchBranchOffice";
import CardBranchOffice from "./components/CardBranchOffice";
import EditBranchOffice from "./components/EditBranchOffice";
import AvisosForm from "./components/AvisosForm";
import ClientFormNuevo from "./components/ClientFormNuevo";
import SecurityFormNuevo from "./components/SecurityFormNuevo";
import EditSecurityNuevo from "./components/EditSecurityNuevo";
import EstadisticasUser from "./components/EstadisticasUser";
import Footer from "./components/Footer";
import CalendarAssignment from "./components/CalendarAssignment";
import CalendarSelectBranch from "./components/CalendarSelectBranch";
import AssignSecurity from "./components/AssignSecurity";
import { pendientes } from "./states/geoLocalizacion";
import NextService from "./components/NextService";
import CalendarBranchFilter from "./components/CalendarBranchFilter";
import Home from "./components/Home";
import NewCalendar from "./components/NewCalendar";
import ClientSelect from "./components/ClientSelect";
import BranchSelectNuevo from "./components/BranchSelectNuevo";
import MasInfo from "./components/MasInfo";
import ClientSelectNuevo from "./components/ClientSelectNuevo";
import StatesSecurity from "./components/StatesSecurity"
import ChangePassword from "./components/ChangePassword";
import SinPass from "./components/SinPass";
import AdminForgotPassword from "./components/AdminForgotPassword";
import EditRequest from "./components/EditRequest";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    pendientes();
    dispatch(effectLogin())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    dispatch(effectDevice()).catch((err) => console.log(err));
  }, []);
  
  const device = useSelector((state) => state.device);
  const admin = useSelector((state) => state.usuario);

  return admin ? (
    <>
      <div>
        <div style={{ position: "relative" }}>
          {device === "desk" ? <Navbar /> : <NavbarMobile />}
        </div>

        {device === "desk" ? (
          <div style={{ position: "absolute" }}>
            <Sidebar />
          </div>
        ) : (
          <></>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homemobile" element={<HomeMobile />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/client" element={<ClientFormNuevo />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:clientId" element={<CardClient />} />
          <Route path="/edit/client/:id" element={<EditClient />} />
          <Route path="/security" element={<SecurityFormNuevo />} />
          <Route path="/status" element={<UserPage />} />
          <Route path="/user/info" element={<UserInfo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search/securities/:id" element={<Security />} />
          <Route path="/edit/security/:id" element={<EditSecurityNuevo />} />
          <Route path="/user/estadisticas" element={<EstadisticasUser />} />
          <Route path="/addbranchoffice" element={<BranchOfficeForm />} />
          <Route path="/search/branchoffice" element={<SearchBranchOffice />} />
          <Route path="/branch/:id" element={<CardBranchOffice />} />
          <Route path="/edit/branch/:id" element={<EditBranchOffice />} />
          <Route path="/search/securities" element={<SecurityList />} />
          <Route path="/user/avisos" element={<AvisosForm />} />
          {/* // <Route path="/calendar" element={<Calendar />} />
          // <Route path="/assign" element={<AssignSecurity />} />
          // <Route path="/assign/branch/:id" element={<CalendarBranchFilter />} />
          // <Route path="/select/branch/:id" element={<CalendarSelectBranch />} /> */}
          <Route path="/user/calendar" element={<NextService />} />
          <Route path="/user/masinfo" element={<MasInfo />} />
          <Route path="/calendar/:clientId" element={<NewCalendar />} />
          <Route path="/assign" element={<AssignSecurity />} />
          <Route path="/assign/branch/:id" element={<CalendarBranchFilter />} />
          <Route path="/select/branch/:id" element={<CalendarSelectBranch />} />
          <Route path="/states" element={<StatesSecurity />} />
          <Route path="/states/:id" element={<EditRequest />} />
          <Route path="/set/client" element={<BranchSelectNuevo />} />
          <Route path="/set/branch/:id" element={<ClientSelectNuevo />} />
        </Routes>
      </div>
    </>
  ) : (
    <>
      <div style={{ position: "relative" }}>
        {device === "desk" ? <Navbar /> : <NavbarMobile />}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homemobile" element={<HomeMobile />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/user/passw" element={<ChangePassword />} />
        <Route path="/newSecurityPassword/:token" element={<SinPass />} />
        <Route path="/changePassword/admin" element={<AdminForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
