import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import QuizList from "./components/quizlist";
import Quiz from "./components/quiz";
import AdminQuizEdit from "./components/admin-quiz-edit";
import AdminQuiz from "./components/admin-quiz";
import Score from "./components/score";
import AuthVerify from "./common/AuthVerify";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const isUserEmpty = !localStorage.getItem('user');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname)
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    if (isUserEmpty && location.pathname!="/register") {
      console.log()
      navigate('/login')
    }
  }, [isUserEmpty]);
  
  return (
    <>
    <div>
        <Routes>
          <Route path="/" element={<QuizList/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/quiz/:id" element={<Quiz/>} />
          <Route path="/admin_quiz" element={<AdminQuiz/>} />
          <Route path="/admin_quiz_edit/:id" element={<AdminQuizEdit/>} />
          <Route path="/admin_user" element={<AdminQuiz/>} />
          <Route path="/score" element={<Score/>} />
        </Routes>
    </div>
    <AuthVerify/>
    </>
  );
};

export default App;