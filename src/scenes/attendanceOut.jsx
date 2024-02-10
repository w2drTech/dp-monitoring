import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateAttendance } from "../Services/studentAttService";
import { toast } from "react-toastify";
import "./style.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
const AttendanceOut = () => {
  const [studentName, setStudentName] = useState("");
  const [attendanceKey, setAttendanceKey] = useState("");

  let timeOut = null;
  useEffect(() => {
    const stdName = localStorage.getItem("studentName");
    const atdKey = localStorage.getItem("studentAttendanceKey");
    setStudentName(stdName);
    setAttendanceKey(atdKey);
  });

  const handleAttendanceMark = async () => {
    try {
      const response = await updateAttendance(attendanceKey);
      if (response.data.o_sql_msg === "success") {
        localStorage.removeItem("studentName");
        localStorage.removeItem("studentAttendanceKey");
        window.location = "/";
      } else if (response.data.o_sql_msg === "STUDENT ALREADY LOGGED OUT") {
        toast.error("STUDENT ALREADY LOGGED OUT");
        localStorage.removeItem("studentName");
        localStorage.removeItem("studentAttendanceKey");
        console.log(response);
        window.location = "/";
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="carousel"
      style={{background: "#141b2d", height: "100vh" }}
    >
      <div className="carousel_wrapper">
        <div className="card_overlay">
          <Typography
            variant="contained"
            style={{
              top: 0,
              position: "absolute",
              fontSize: "15px",
              marginBottom: "10px",
              margin: "10px",
              width: "100px",
            }}
          >
            {studentName}
          </Typography>
          <Card
            sx={{
              minWidth: 500,
              backgroundColor: "rgba(211, 205, 208, 0.36)",
            }}
          >
            <CardContent>
              <Button
                variant="contained"
                type="button"
                onClick={handleAttendanceMark}
                style={{
                  display: "flex",
                  position: "absolute",
                  right: "30px",
                  backgroundColor: "black",
                  fontSize: "15px",
                  marginBottom: "10px",
                  margin: "10px",
                  width: "100px",
                }}
              >
                Logout
              </Button>
              <Typography
                sx={{ textAlign: "center" }}
                color="text.secondary"
                gutterBottom
                variant="h3"
              >
                Useful links
              </Typography>
            </CardContent>
            <Box>
              <CardActions sx={{ justifyContent: "center" }}>
                <Box display="grid">
                  <Box marginBottom="10px">
                    <a href="https://dpcode.lk/" target="_blank">
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ width: "300px", height: "70px" }}
                      >
                        <IconButton sx={{ display: "flex" }}>
                       
                        </IconButton>
                        <Typography variant="h6">To DP Coding</Typography>
                      </Button>
                    </a>
                  </Box>
                  <Box marginBottom="10px">
                    <a
                      href="https://outlook.office365.com/mail/?JitExp=1"
                      target="_blank"
                    >
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ width: "300px", height: "70px" }}
                      >
                        <IconButton>
            
                        </IconButton>
                        <Typography variant="h6">To Outlook Website</Typography>
                      </Button>
                    </a>
                  </Box>
                  <Box>
                    <a
                      href="https://studio.code.org/users/sign_in"
                      target="_blank"
                    >
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ width: "300px", height: "70px" }}
                      >
                        <IconButton>
                    
                        </IconButton>
                        <Typography variant="h6">
                          To code.org website
                        </Typography>
                      </Button>
                    </a>
                  </Box>
                </Box>
              </CardActions>
            </Box>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOut;
