import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PaymentSuccess from "./pages/payments/PaymentSuccess";
import PaymentFail from "./pages/payments/PaymentFail";
import PaymentLoading from "./pages/payments/PaymentLoading";

function App() {
  return (
    <body>
      <Routes>
          <Route path={'/*'} element={<Layout/>}/>
          <Route path={'/sign-in'} element={<SignIn/>}/>
          <Route path={'/sign-up'} element={<SignUp/>}/>
          <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
          <Route path={'/reset-password'} element={<ResetPassword/>}/>
          <Route path={'/payment-success'} element={<PaymentSuccess/>}/>
          <Route path={'/payment-fail'} element={<PaymentFail/>}/>
          <Route path={'/payment-loading'} element={<PaymentLoading/>}/>
      </Routes>

    </body>
  );
}

export default App;
