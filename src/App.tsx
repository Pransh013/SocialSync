import { Route, Routes } from "react-router-dom";
import Home from "./root/pages/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Auth from "./root/pages/Auth";
import RootLayout from "./root/RootLayout";
import AllUsers from "./root/pages/AllUsers";
import CreatePost from "./root/pages/CreatePost";
import Saved from "./root/pages/Saved";
import Explore from "./root/pages/Explore";
import EditPost from "./root/pages/EditPost";
import PostDetails from "./root/pages/PostDetails";
import Profile from "./root/pages/Profile";
import UpdateProfile from "./root/pages/UpdateProfile";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<Auth />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
