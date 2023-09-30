import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LayautPublic from "../componets/layaout/public/LayautPublic";
import Login from "../componets/users/Login";
import Registro from "../componets/users/Register";
import LayautPrivate from "../componets/layaout/Private/LayautPrivate";
import FeedPage from "../componets/publication/Feed";
import { AuthProvider } from "../contexts/AuthProvider";
import LogautClose from "../componets/users/Logaut";
import PeoplePage from "../componets/users/People";
import EditPage from "../componets/users/Edit";

function RoutingApp() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LayautPublic />}>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Registro />} />
            </Route>
            <Route path="/social" element={<LayautPrivate />}>
              <Route index element={<FeedPage />} />
              <Route path="feed" element={<FeedPage />} />
              <Route path="logaut" element={<LogautClose />} />
              <Route path="gente" element={<PeoplePage />} />
              <Route path="settings" element={<EditPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default RoutingApp;
