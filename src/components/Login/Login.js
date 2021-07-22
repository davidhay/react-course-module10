import React, { useState, useReducer, useEffect, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";

// helps prevent typos!
const USER_INPUT = "USER_INPUT";
const INPUT_BLUR = "INPUT_BLUR";

//functional!!!
const emailReducer = (state, action) => {
  const validateEmail = (value) => value.includes("@");
  if (action.type === USER_INPUT) {
    return { value: action.val, isValid: validateEmail(action.val) };
  }
  if (action.type === INPUT_BLUR) {
    //why not just return state?
    return { value: state.value, isValid: validateEmail(state.value) };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  const validatePassword = (value) => value.trim().length > 6;
  if (action.type === USER_INPUT) {
    return { value: action.val, isValid: validatePassword(action.val) };
  }
  if (action.type === INPUT_BLUR) {
    //why not just return state?
    return { value: state.value, isValid: validatePassword(state.value) };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const authCtx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  //This uses object destructing and creates aliases for extracted values!!!
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  //useEffect keeps form state in sync with input fields
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  useEffect(() => {
    console.log("password state", passwordState);
  }, [passwordState]);

  useEffect(() => {
    console.log("email state", emailState);
  }, [emailState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: USER_INPUT, val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: USER_INPUT, val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: INPUT_BLUR });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: INPUT_BLUR });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid ? "" : classes.invalid
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
