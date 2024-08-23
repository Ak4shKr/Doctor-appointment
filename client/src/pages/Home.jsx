import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Doctor from "../components/Doctor";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
        // console.log(doctors);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      getData();
      if (token) {
        dispatch(showLoading());
        try {
          const response = await axios.post(
            "/api/user/get-user-info-by-id",
            { token: localStorage.getItem("token") },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (response.data.success) {
            dispatch(setUser(response.data.data));
          } else {
            localStorage.clear();
            toast.info("Please login to continue");
            console.log(response.data);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchData();
  }, [token, dispatch]);

  return (
    <Layout>
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col key={doctor._id} span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
