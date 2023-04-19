import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import Homepage from "./components/Homepage";
import ProfilePage from "./components/ProfilePage";
import NotFoundPage from "./components/NotFoundPage";
import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory();

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const returnHome = async (e) => {
    e.preventDefault();

    history.push('/');
  }

  return (
    <>
      {isLoaded}
      {sessionUser ? (
        <Switch>
          <Route exact path="/" >
            <Homepage />
          </Route>
          <Route exact path="/users/:userId" >
            <ProfilePage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" >
            <Homepage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      )
      }
    </>
  );
}

export default App;
