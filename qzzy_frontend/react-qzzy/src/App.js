import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login";
import Register from "./components/register";
// import Home from "./components/Home";
import Profile from "./components/profile";
import QuizList from "./components/quizlist";
import Quiz from "./components/quiz";
import AdminQuizEdit from "./components/admin-quiz-edit";
import AdminQuiz from "./components/admin-quiz";
import Score from "./components/score";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log(user)

    if (user) {
      setCurrentUser(user);
      // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  
  return (
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
  );
};

export default App;