import * as React from "react";

import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { getStudent, markAttendance } from "../Services/studentAttService";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Link } from "react-router-dom";
const studentAttendanceKey = "studentAttendanceKey";
const studentNameKey = "studentName";
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("required")
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      "Invalid email format: Enter a valid specific email address"
    )
    .trim(),
  pcId: yup
    .string()
    .required("required")
    .matches(
      /^.{7}$/,
      "Invalid PC Id format: Enter a valid specific PC Id (ex:PC50101)"
    )
    .trim(),
});

const initialValues = {
  email: "",
  pcId: "",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
const Attendance = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [pcId, setPcId] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAttendanceMark = async () => {
    try {
      const data = {
        email: email.toLowerCase(),
        pcId: pcId.toLocaleUpperCase(),
      };
      const response = await markAttendance(data);
      console.log(response);
      const attendanceKey = response.data.retunValue;
      if (response.data.o_sql_msg === "success") {
        localStorage.setItem(studentAttendanceKey, attendanceKey);
        localStorage.setItem(studentNameKey, studentName);
        window.location = "/";
      } else if (
        response.data.o_sql_msg === "STUDENT ALREADY INSERTED LOGIN TIME"
      ) {
        toast.error("This user is already logged in");
      } else if (response.data.o_sql_msg === "INVALID PC CODE") {
        toast.error("Error: Invalid PC ID. Please check PC ID and try again.");
      } else if (response.data.o_sql_msg === "THIS PC ALREADY USED") {
        toast.error("Error: This PC Already In Use");
      } else if (
        response.data.o_sql_msg === "YOUR CENTER HAS NOT STARTED YET"
      ) {
        toast.error(
          "Error: Unable to mark attendance: The center you are attempting to mark attendance for has not started yet"
        );
      }
    } catch (error) {}
  };

  return (
    <Box sx={{ background: "#141b2d", height: "100vh" }}>
      <Box>
        <a href="/register">
          <Button
            variant="contained"
            style={{
              top: 5,
              right: 100,
              position: "absolute",
              backgroundColor: "red",
              fontSize: "15px",
            }}
          >
            Student Registration
          </Button>
        </a>
        {/* <a href="/login">
            <IconButton
              aria-label="delete"
              variant="contained"
              type="submit"
              style={{
                top: 0,
                right: 0,
                position: "absolute",
              }}
              size="large"
            >
              <LoginOutlinedIcon fontSize="inherit" />
            </IconButton>
          </a> */}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            HELLO.. {studentName.toUpperCase()}
          </Typography>
          <Typography id="modal-modal-description" variant="h3" sx={{ mt: 2 }}>
            Welcome to DP Coding
          </Typography>
          <Box display="flex" justifyContent="space-between" marginTop="10px">
            <Button
              variant="contained"
              onClick={handleAttendanceMark}
              style={{
                backgroundColor: "red",
                fontSize: "15px",
              }}
            >
              It's me
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              style={{
                backgroundColor: "white",
                fontSize: "15px",
                color: "red",
              }}
            >
              Not me
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="95vh"
        marginLeft={"-50px"}
      >
        <img style={{ width: "500px" }} src="IT campus Sinhala.png" alt="" />
        <Formik
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
              const response = await getStudent(values.email);

              setStudentName(response.data.studentName);
              setPcId(values.pcId);
              setEmail(values.email);

              if (response.data.sql_msg === "SUCCESS") {
                handleOpen();
              } else {
                toast.error(
                  "Error: Invalid email. Please check your credentials and try again."
                );
              }
            } catch (ex) {}
          }}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="-ms-flexbox"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "rgba(211, 205, 208, 0.353)",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "35px",
                    textAlign: "center",
                    paddingTop: "15px",
                  }}
                >
                  Daily Productivity
                </Typography>
                <TextField
                  name="email"
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Enter your outlook email address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  autoFocus={false}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{
                    mt: "15px",
                    mb: "15px",
                    color: "black",
                    fontSize: "50px",
                  }}
                />
                <TextField
                  name="pcId"
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Enter your pc id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pcId}
                  autoFocus={false}
                  error={!!touched.pcId && !!errors.pcId}
                  helperText={touched.pcId && errors.pcId}
                />
                <Box
                  marginTop="10px"
                  display="flex"
                  justifyContent="center"
                  padding="10px"
                >
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      backgroundColor: "red",
                      fontSize: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    Let's Code
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
        <Box sx={{ display: "flex" }}></Box>
        <img
          style={{ width: "400px", marginBottom: "70px", marginLeft: "50px" }}
          src="IT campus en.png"
          alt=""
        />
      </Box>
    </Box>
  );
};

export default Attendance;
