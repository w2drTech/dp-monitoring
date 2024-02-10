import { Route, Routes } from "react-router-dom";
import Register from "./scenes/register";
import AttendanceOut from "./scenes/attendanceOut";
import NotFound from "./scenes/notFound";
import HomeLayout from "./scenes/HomeLayout";

function App() {
  return (
    <div className="app">
      <main className="content">
        <Routes>
          <Route index element={<HomeLayout />} />
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<AttendanceOut />} />
            <Route path="/register" element={<Register />} />
          </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
