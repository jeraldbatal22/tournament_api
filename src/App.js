import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Tournaments from './components/Tournaments/Tournaments'
import Header from './components/Header'
import CreateTournaments from './components/Tournaments/CreateTournaments';
import EditTournaments from './components/Tournaments/EditTournaments';
import ViewTournaments from './components/Tournaments/ViewTournaments';
import List from './components/Participants/List';
function App() {
  const getTournaments = (tournaments) => {
    return tournaments
  }
  return (
    <Container>
      <Router>
        <Header />
        <Switch>

          <Route exact path="/">
            <Tournaments getTournaments={getTournaments} />
          </Route>

          <Route path="/tournaments/create">
            <CreateTournaments />
          </Route>

          <Route path="/tournaments/edit/:id">
            <EditTournaments />
          </Route>

          <Route path="/tournaments/view/:id">
            <ViewTournaments />
          </Route>

          <Route path="/tournaments/:id/participants">
            <List />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
