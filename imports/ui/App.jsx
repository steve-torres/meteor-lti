import React from 'react';
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider, useRouteError, Route, Link } from "react-router-dom";

import Root from './Root';
import Login from './Login';

const FrontGatekeeper = ({children})=>{
  return (
    <>
      {children}
    </>
  )
}

const Nav = ()=>{
  return (
    <ul>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/contact">Contact</Link>
    </li>
    <li>
      <a href="#" onClick={e=>Meteor.logout()}>Logout &rarr;</a>
    </li>
  </ul>
  )
}

const About = ()=>{
  
  return (
    <div>
      <h1>About</h1>
      <Nav />
      <pre>
        User ID: {Meteor.userId()}
      </pre>
      <div>
        <p>This is a secure route and I must be logged in to view.</p>
      </div>
    </div>
  )
}

const Contact = ()=>{
  return (
    <div>
      <h1>Contact Us</h1>
      <Nav />
      <pre>
        User ID: {Meteor.userId()}
      </pre>
      <p>Another route that is guarded behind login wall.</p>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <FrontGatekeeper />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);

export const App = () => (
  <RouterProvider router={router} />
);
