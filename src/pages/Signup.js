import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Input, InputAdornment, IconButton, Button, FormControl } from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { firebaseConfig } from "../Configs/fbsConfig"
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 40
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Signup() {
  document.title = "Signup";
  const classes = useStyles();

  const [refForm, setRefForm] = React.useState();
  const [formDisabler, setFormDisabler] = React.useState("inline-block");
  const [vfDisabler, setVfDisabler] = React.useState("hidden");
  const [lblError, setLblError] = React.useState("");
  const [userValues, setUserValues] = React.useState({
    username: '',
    email: "",
    password: '',
    confPass: '',
    showPassword: false,
    showConfPassword: false,
    verified: false
  });

  function emailLinkComplete() {
    if (firebaseConfig.auth().isSignInWithEmailLink(window.location.href)) {
      var email = window.localStorage.getItem('emailForSignIn');
      var password = window.localStorage.getItem('passwordSignIn');
      var verified = window.localStorage.getItem('verificationSignIn');
      if (!email) {
        setFormDisabler("none")
        setVfDisabler("visible")
        setRefForm(
          <div style={{ visibility: formDisabler }}>
            <h4>Please Verify Your Email Address to Process</h4>
            <button onClick={sendingVerification}>Verify Email</button>
          </div>
        )
      }
      else {
        firebaseConfig.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            firebaseConfig.database().ref(`storeUsers/user${userCredential.user.uid}`).update(
              { verified: true, id: userCredential.user.uid })
              .then(() => {
                window.location.replace("/login")

                window.localStorage.removeItem("emailForSignIn");
                window.localStorage.removeItem("passwordSignIn");
                window.localStorage.removeItem("verificationSignIn");
              })
              .catch((err) => {
                console.log(err)
                console.log(err)
              })
          })
      }
    }
  }
  function sendingVerification() {
    var actionCodeSettings = {
      url: 'http://localhost:3000/Signup' || "https://arsprostore.web.app/Signup",
      handleCodeInApp: true,
    };
    firebaseConfig.auth().sendSignInLinkToEmail(userValues.email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', userValues.email);
        window.localStorage.setItem('passwordSignIn', userValues.password);
        window.localStorage.setItem('verificationSignIn', userValues.verified);
        alert("Email has been send to email address")
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ...
      });
  }
  const UserRegisteration = (e) => {
    e.preventDefault();

    if (userValues.confPass === "") {

    }
    else if (userValues.password !== userValues.confPass) {
      setLblError("Password Doesnot match!")
    }
    else if (userValues.password === userValues.confPass) {

    const AddingToDB=()=>{
      firebaseConfig.auth().createUserWithEmailAndPassword(userValues.email, userValues.password)
      .then((userCredential) => {
        firebaseConfig.database().ref('/storeUsers/user' + (userCredential.user.uid)).update(userValues)
          .then((result) => {
            setFormDisabler("none")
            setVfDisabler("visible")
            setRefForm(
              <div style={{ visibility: formDisabler }}>
                <h4>Please Verify Your Email Address to Process</h4>
                <button onClick={sendingVerification}>Verify Email</button>
              </div>
            )
            // sendingVerification()

          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            setLblError(errorMessage)

          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        setLblError(errorMessage)
      });
    }
      firebaseConfig.database().ref('storeUsers').orderByChild('username').equalTo(userValues.username).on("value", function (snapshot) {
        if(snapshot.val() === null){
        console.log(snapshot.val())
        AddingToDB()
        }
        else {
        setLblError(`Username Exist, Please try another`);
          return
        }
        return
      })
      
    }
  }
  const handleChange = (prop) => (event) => {
    setUserValues({ ...userValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setUserValues({ ...userValues, showPassword: !userValues.showPassword });
  };

  const handleClickShowConfPassword = () => {
    setUserValues({ ...userValues, showConfPassword: !userValues.showConfPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  emailLinkComplete();
  return (
    <div className={classes.mainRoot}>
      <div className="signupForm" style={{ display: formDisabler }}>
        <title>Registration</title>
        <form className={classes.root} autoComplete="off" onSubmit={UserRegisteration}>
          <FormControl>
            <InputLabel htmlFor="my-input">Username</InputLabel>
            <Input id="my-input" type="text" aria-describedby="my-helper-text" required
              onChange={handleChange('username')}
              value={userValues.username}
            />
          </FormControl><br />
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" type="email" aria-describedby="my-helper-text" required
              onChange={handleChange('email')}
              value={userValues.email} />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              required
              id="standard-adornment-password"
              type={userValues.showPassword ? 'text' : 'password'}
              value={userValues.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {userValues.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl><br />
          <FormControl>
            <InputLabel htmlFor="standard-adornment-confPassword"> Confirm Password</InputLabel>
            <Input
              required
              id="standard-adornment-confPassword"
              type={userValues.showConfPassword ? 'text' : 'password'}
              value={userValues.confPass}
              onChange={handleChange('confPass')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {userValues.showConfPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl><br />
          <Button type="Submit" variant="contained" color="primary">Submit</Button>
        </form>
        <Link to="/Login" style={{ textDecoration: "none" }}>
          <Button size="small" type="button" variant="outlined" color="primary" style={{ border: "none" }}>Signin Instead</Button>
        </Link><br />
        <span style={{ color: "red" }}>{lblError}</span>
      </div>
      <span>{refForm}</span>
    </div>
  );
}
