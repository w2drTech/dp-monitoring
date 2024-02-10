import { Route, Routes } from "react-router-dom";
import Register from "../scenes/register";
import AttendanceOut from "./attendanceOut";
import Attendance from "./attendance";
import NotFound from "./notFound";

const HomeLayout = () => {
  const attendanceKey = localStorage.getItem("studentAttendanceKey");
  return (
    <Routes>
      {attendanceKey ? (
        <Route path="/" element={<AttendanceOut />} />
      ) : (
        <Route path="/" element={<Attendance />} />
      )}
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default HomeLayout;
