// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Books from "./pages/Books";
// import Dashboard from "./pages/Dashboard";
// import Payment from "./pages/Payment";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";

// export default function App() {
//   return (
//     <BrowserRouter>
//       {localStorage.getItem("token") && <Navbar />}
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route path="/books" element={
//           <ProtectedRoute><Books /></ProtectedRoute>
//         } />

//         <Route path="/dashboard" element={
//           <ProtectedRoute><Dashboard /></ProtectedRoute>
//         } />

//         <Route path="/payment/:id" element={
//           <ProtectedRoute><Payment /></ProtectedRoute>
//         } />

//         <Route path="*" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }




import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Books from "./pages/Books";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
