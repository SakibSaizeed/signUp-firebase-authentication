import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth } from "firebase/auth";
import app from "./firebase.init";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const auth = getAuth(app);
function App() {
  const handleEmail = (e) => {
    console.log(e.target.value);
  };
  const handlePassword = (e) => {
    console.log(e.target.value);
  };

  const handleFormSubmit = (e) => {
    console.log("Submit done");
    e.preventDefault();
  };

  return (
    <div>
      <div className="Registration-form w-50 mx-auto mt-5">
        <h1 className="text-info">Sign Up</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onBlur={handleEmail}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onBlur={handlePassword}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
