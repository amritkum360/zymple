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
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
