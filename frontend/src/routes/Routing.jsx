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
function RoutingApp() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LayautPublic />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registro />} />
          </Route>
          <Route path="/social" element={<LayautPrivate/>} >
           <Route index element={<FeedPage/>}/>
           <Route path="feed" element={<FeedPage/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default RoutingApp;
