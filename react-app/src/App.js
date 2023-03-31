import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import Homepage from "./components/Homepage";
import ProfilePage from "./components/ProfilePage";
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
            <h1 className="page-not-found">Page Not Found</h1>
            <button className="return-button" onClick={returnHome}>
              <p className="return-text">
                Return to Goggbook
              </p>
            </button>
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" >
            <Homepage />
          </Route>
          <Route>
            <h1 className="page-not-found">Page Not Found</h1>
            <button className="return-button" onClick={returnHome}>
              <p className="return-text">
                Return to Goggbook
              </p>
            </button>
          </Route>
        </Switch>
      )
      }
    </>
  );
}

export default App;
