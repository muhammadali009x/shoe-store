import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Input, Button, FormControl } from '@material-ui/core/';
import { firebaseConfig as firebase } from "../Configs/fbsConfig"


const useStyles = makeStyles((theme) => ({
    mainRoot: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 40,
        padding: 40
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
export default function VerificationPage() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
    });

    document.title = "Account Verification";
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(setValues)
    };

    const verificationSubmit = (values) => (e) => {
        e.preventDefault();
        console.log(values)
        sendingVerification(values.email)
    }
    const sendingVerification = (email) => {
        console.log(email)
        var actionCodeSettings = {
            url: 'http://localhost:3000/VerificationPage',
            handleCodeInApp: true,
        };
        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email);
                alert("Mail has been send to email address")
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            });
    }

    function emailLinkComplete() {
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            var email = window.localStorage.getItem('emailForSignIn');
            console.log(email)
            if (!email) {
                return
            }
            else {
                firebase.database().ref('storeUsers').orderByChild('email').equalTo(email).on("value", function (snapshot) {
                    const getVal = snapshot.val();
                    const getId = Object.keys(getVal)
                    console.log(getVal)
                    firebase.database().ref(`storeUsers/${getId}`).update({ verified: true, id: getId })
                        .then(() => {
                            window.location.replace("/login")
                            window.localStorage.removeItem("emailForSignIn");
                        })
                        .catch((err) => {
                            console.log(err)
                            console.log(err)
                        })
                })
            }
        }
    }
    emailLinkComplete()
    return (
        <div>
            <h4>Please Verify your Account</h4>
            <form className={classes.root} onSubmit={verificationSubmit(values)}>
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input
                        id="my-input"
                        type="email"
                        aria-describedby="my-helper-text"
                        required
                        onChange={handleChange('email')}
                    />
                </FormControl>
                <br />
                <Button type="Submit" variant="contained" color="primary">Login</Button>
            </form>
        </div>
    )
}