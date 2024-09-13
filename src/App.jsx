import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import Mainpage from './Mainpage/Mainpage';
import BeforePay from './BeforePay/BeforePay';
import DocsUpload from './docsupload/docsupload';
import FormStaus from './FormStatus/FormStatus';
import Search from './Mainpage/components/Search/Search';
import Header from './Mainpage/components/header/header';
import Login from './Auth/Login/Login';
import Repay from './BeforePay/Repayment/Repayment';
import Reupload from './docsupload/Reupload/Reupload';
import MyForms from './MyForms/MyForms';
import Profile from './Profile/Profile'
import AboutUs from './pages/AboutUs';
import CancellationPolicy from './pages/Cancelation';
import ContactUs from './pages/contactus';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/Termsandconditions';

function ProtectedRoute({ element }) {
  console.log(element)
  const { hasToken } = useAuth();
  console.log(hasToken)
    return hasToken ? element : < Navigate to = "/login" />;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <ProtectedRoute element={<Mainpage />} />,
      element: <Mainpage />
    },
    {
      path: "/b/:id",
        element: (<>
            <Header /> <ProtectedRoute element={<BeforePay />} />,</>)
    },
    {
      path: "/repay/:id",
      element: <ProtectedRoute element={<Repay />} />,
    },
    {
      path: "/docs/:id",
        element: (<>
            <Header /><ProtectedRoute element={<DocsUpload />} /> </>)
    },
    {
      path: "/reupload/:id",
      element: <ProtectedRoute element={<Reupload />} />,
    },
    {
      path: "/formstatus/:id",
        element: (<>
            <Header /><ProtectedRoute element={<FormStaus />} /> </>)
      }, {
          path: "/profile",
        element: (<>
            <Header /><ProtectedRoute element={<Profile />} /></>)
      },
    {
      path: "/search",
      element: (
        <>
          <Header />
          <ProtectedRoute element={<Search />} />
        </>
      ),
    },
    {
      path: "/login",
      element: <><Header /><Login /></>
    },
    {
      path: "/myforms",
      element: <><Header /><MyForms /></>
    },
    {
      path: "/about",
      element: <><Header /><AboutUs /></>
    },
    {
      path: "/cancelation",
      element: <><Header /><CancellationPolicy /></>
    },
    {
      path: "/contact",
      element: <><Header /><ContactUs /></>
    },
    {
      path: "/privacy",
      element: <><Header /><PrivacyPolicy /></>
    },
    {
      path: "/refund",
      element: <><Header /><RefundPolicy /></>
    },
    {
      path: "/terms",
      element: <><Header /><TermsAndConditions /></>
    },

  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
