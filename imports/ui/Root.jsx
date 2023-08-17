import { Meteor } from 'meteor/meteor';
import React, { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Navigate, Outlet } from 'react-router-dom';

export default Root = ()=>{
  const {loggingIn, loggedIn, userReady} = useTracker(()=>{
    const userSub = Meteor.subscribe('userData'); // subscribe to extra user data

    const user = Meteor.user();
    const userReady = userSub.ready() && !!user;
    const loggingIn = Meteor.loggingIn();
    const loggedIn = (Meteor.userId()?true:false)||(!loggingIn && userReady);

    return { loggingIn, loggedIn, userReady }; 
  });

  const {status} = useTracker(()=>{
    const status = Meteor.status()?.status;
    return {status};
  });

  return (
    <>
      {status != "connected"?(
      <div className="offline-ui offline-ui-down">
        <div className="offline-ui-content">
          You are offline. Reconnect me to continue saving! Try refreshing.
        </div>
      </div>
      ):null}
      {(!loggedIn && loggingIn) || (!userReady && loggingIn) ? (
        <section className="gk">Loading...</section>
      ) : loggedIn ? <Outlet /> : <Navigate to="/login" />}
    </>
  )
}