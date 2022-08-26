import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./firebase.init";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
const auth = getAuth(app);
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [registerd, setRegisterd] = useState(false);
  const [error, setError] = useState("");
  const [msg, setSuccessMsg] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCheckbox = (event) => {
    setRegisterd(event.target.checked);
  };

  const handleFormSubmit = (e) => {
    console.log("Submit done", email, password);

    if (registerd) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          varifyEmail();
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    }
    e.preventDefault();
    //for validation bootstrap
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (!/(?=.*[0-9])/.test(password)) {
      setError("Password should contain at least one number");
      return;
    }
    setValidated(true);
    setError("");
    setSuccessMsg("Thanks");
  };

  const varifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email varification Sent");
    });
  };
  return (
    <div>
      <div className="Registration-form w-50 mx-auto mt-5">
        <h1 className="text-info">Please {registerd ? "Login" : "Sign Up"}</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              onBlur={handleEmail}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onBlur={handlePassword}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Already Registerd?"
              onChange={handleCheckbox}
            />
          </Form.Group>
          <p className="text-danger">{error}</p>
          <p className="text-danger">{msg}</p>
          <Button variant="primary" type="submit">
            {registerd ? "Login" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
