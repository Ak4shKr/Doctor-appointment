// import { Form, Row, Input, Col, TimePicker, Button } from "antd";
import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import dayjs from "dayjs";

function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    if (!values.experience) {
      throw new Error("Experience field is missing or empty.");
    }
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-doctor-account",
        {
          ...values,
          userId: user._id,
          timings: [
            dayjs(values.timings[0]).format("HH:mm"),
            dayjs(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyDoctor;

// import { Button, Col, Form, Input, Row, TimePicker } from "antd";
// import React from "react";
// import Layout from "../components/Layout";
// import { useDispatch, useSelector } from "react-redux";
// import { showLoading, hideLoading } from "../redux/alertsSlice";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import DoctorForm from "../components/DoctorForm";
// import dayjs from "dayjs";

// function ApplyDoctor() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const onFinish = async (values) => {
//     try {
//       dispatch(showLoading());
//       const response = await axios.post(
//         "/api/user/apply-doctor-account",
//         {
//           ...values,
//           userId: user._id,
//           timings: [
//             dayjs(values.timings[0]).format("HH:mm"),
//             dayjs(values.timings[1]).format("HH:mm"),
//           ],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (response.data.success) {
//         toast.success(response.data.message);
//         navigate("/");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <Layout>
//       <h1 className="page-title">Apply Doctor</h1>
//       <hr />

//       <DoctorForm onFinish={onFinish} />
//     </Layout>
//   );
// }

// export default ApplyDoctor;
