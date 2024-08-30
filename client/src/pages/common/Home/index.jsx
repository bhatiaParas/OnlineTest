// import { Col, message, Row } from "antd";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllExams } from "../../../apicalls/exams";
// import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
// import PageTitle from "../../../components/PageTitle";
// import { useNavigate } from "react-router-dom";
// function Home() {
//   const [exams, setExams] = React.useState([]);
//   const [attempt, setattempt] = React.useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.users);
//   const getExams = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getAllExams();
//       if (response.success) {
//         setExams(response.data);
//       } else {
//         message.error(response.message);
//       }
//       dispatch(HideLoading());
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getExams();
//   }, []);

//   return (
//     user && (
//       <div>
//         <PageTitle title={`Hi ${user.name}, Welcome to Online Quiz`} />
//         <div className="divider"></div>
//         <Row gutter={[16, 16]}>
//           {exams.map((exam) => (
//             <Col span={6}>
//               <div className="card-lg flex flex-col gap-1 p-2">
//                 <h1 className="text-2xl">{exam?.name}</h1>

//                 <h1 className="text-md">Category : {exam.category}</h1>

//                 <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
//                 <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
//                 <h1 className="text-md">Duration : {exam.duration}</h1>

//                 <button
//                   className="primary-outlined-btn"
//                   onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                  
//                 >
//                   Start Exam
//                 </button>
//               </div>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     )
//   );
// }

// export default Home;


import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

function Home() {
  const [exams, setExams] = React.useState([]);
  const [attemptedExams, setAttemptedExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();

    // Load attempted exams from localStorage when the component mounts
    const storedAttempts = JSON.parse(localStorage.getItem("attemptedExams")) || [];
    setAttemptedExams(storedAttempts);
  }, []);

  const handleStartExam = (examId) => {
    // Logic to start the exam
    navigate(`/user/write-exam/${examId}`);

    // Mark the exam as attempted and save it to localStorage
    const updatedAttempts = [...attemptedExams, examId];
    setAttemptedExams(updatedAttempts);
    localStorage.setItem("attemptedExams", JSON.stringify(updatedAttempts));
  };

  return (
    user && (
      <div>
        <PageTitle title={`Hi ${user.name}, Welcome to Online Quiz`} />
        <div className="divider"></div>
        <Row gutter={[16, 16]}>
          {exams.map((exam) => (
            <Col span={6} key={exam._id}>
              <div className="card-lg flex flex-col gap-1 p-2">
                <h1 className="text-2xl">{exam?.name}</h1>
                <h1 className="text-md">Category : {exam.category}</h1>
                <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
                <h1 className="text-md">Duration : {exam.duration}</h1>

                <button
                  className="primary-outlined-btn"
                  onClick={() => handleStartExam(exam._id)}
                  disabled={attemptedExams.includes(exam._id)}
                >
                  {attemptedExams.includes(exam._id) ? "Exam Attempted" : "Start Exam"}
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
}

export default Home;
