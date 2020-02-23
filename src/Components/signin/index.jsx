/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Row, Cell } from '@material/react-layout-grid';
import TextField, { Input } from '@material/react-text-field';
import { Headline4, Body1 } from '@material/react-typography';
import Button from '@material/react-button';
import 'tachyons';
import UserContext from '../../Contexts/UserContext';
import { ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import DemoCard from '../DemoCard/index';
import { encryption } from '../../encryption';
import { decryption } from '../../decryption';

const SignIn = () => {
  const [email, setEmail] = useState("dsc@siesgst.ac.in");
  const [password, setPassword] = useState("vijaya@26");
  const [encryptedEmail, setEncryptedEmail] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const { setUser, user } = useContext(UserContext);
  const dataRef = useRef({});
  const history = useHistory();
  const [serverResponse, setServerResponse] = useState({});
  const [serverDecryptedResponse, setServerDecryptedResponse] = useState({});

  useEffect(() => {
    encryption(email).then((response) => {
      setEncryptedEmail(response);
    });
    encryption(password).then((response) => {
      setEncryptedPassword(response);
    })
    setServerResponse({});
    setServerDecryptedResponse({});
  }, [email, password]);
  
  const query = gql`
  query Login($encryptedEmail: String!, $encryptedPassword: String!) {
    login(email:$encryptedEmail, password:$encryptedPassword){
      userId
      token
      code
      message
    }
  }
`;
  // const { userDetailsFromCache } = client.readQuery({
  //   query: gql`
  //     query ReadTodo($id: Int!) {
  //       todo(id: $id) {
  //         id
  //         text
  //         completed
  //       }
  //     }
  //   `,
  //   variables: {
  //     id: 5,
  //   },
  // });
  console.log(user, "user");
  // const  [getLoginDetails, { loading, data }] = useLazyQuery(query);
  // console.log(data);
  // console.log(user);
  // if(data.login) {
  //   setUser(data);
  // }
  // setUser(data);
  // setUser(data);
  // const updateDetails = (data) => {
  //   setServerDecryptedResponse(() => decryptAndUpdateResponse(data));
  // }
  const decryptAndUpdateResponse = (data) => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    const entries = Object.entries(dataCopy.login);
    // setServerDecryptedResponse(() => {
    // })
    console.log(entries, "decrpytandupdate");
    // console.log(data.login, "data-login");
    // setServerResponse(data.login);
    entries.forEach(async (element) => {
      // console.log();
      // console.log(element);
      if(element[1]!=null) {
        const result = await decryption(element[1]);
        dataCopy.login[element[0]] = result;
      }
      // console.log(result);
    });
    // console.log(data, "decrpytandupdate");
    return {...dataCopy};
  }
  const handleSignIn = async (client) => {
    // setUser(true);

    const { data } = await client.query({
      query: query,
      variables: { encryptedEmail, encryptedPassword}
    });
    // console.log({...data, data});
    // dataRef.current = data;
    // console.log(dataRef.current, "dataref");
    // console.log(data);
    // const recieved = await {...data};
    // console.log(error);
    // console.log(decryption(encryptedEmail), "decrypted email");
    // const updatedDetails1 = decryptAndUpdateResponse(data);
    setServerResponse(data);
    setUser(data);
    const updatedDetails = await decryptAndUpdateResponse(data);
    setServerDecryptedResponse(updatedDetails);

    // setServerDecryptedResponse(await decryptAndUpdateResponse(data));


    // decryption(data).then((result) => {console.log(result, "decrypted")})
    // console.log(data);
    // this.onDogFetched(data.dog);
    // getLoginDetails({ variables: {
    //   email,
    //   password
    // },
    // fetchPolicy: "network-only",
    // onCompleted: (() => {
    //   console.log('Completed');
    // })
  };
    // console.log(test);
    // console.log(data);
  // };
  // console.log(encryptedEmail);
  const onEmailChange = (e) => {
    const value = e.target.value;
    // encryption(value).then((response) => {
    //   setEncryptedEmail(response);
    // });
    setEmail(value);
  }

  const onPasswordChange = (e) => {
    const value = e.target.value;
    // encryption(value).then((response) => {
    //   setEncryptedPassword(response);
    // });
    // setEncryptedPassword(encryption(value));
    setPassword(value);
  }

  return (
    <ApolloConsumer>
      {client => (
        <Grid className="mw8 center">
        <Row className="">
          <Cell desktopColumns={5} tabletColumns={8} phoneColumns={4}>
            <Headline4 className="purple">
              Sign In
            </Headline4>
            <Body1 className="mid-gray">
              Sign in to your account to enter into the awesome world of coding.
            </Body1>
          </Cell>
          <Cell desktopColumns={5} tabletColumns={8} phoneColumns={4}>
            <div className="pa3">
              <TextField
                label="Email address"
                className="pa2 mb4 w-100"
                outlined
              >
                <Input
                  id="1"
                  value={email}
                  onChange={e => onEmailChange(e)}
                />
              </TextField>
              <TextField
                label="Password"
                className="pa2 w-100"
                outlined
              >
                <Input
                  id="2"
                  type="password"
                  value={password}
                  onChange={e => onPasswordChange(e)}
                />
              </TextField>
              {/* When Forgot Password is clicked, we are redirected to forgot route */}
              <Body1 className="mid-gray">
                Don&apos;t have an account?
                <span className="dim pointer" onClick={() => history.push('/auth/signup')}>
                &nbsp;Let&apos;s create one
                </span>
              </Body1>
              <Button raised onClick={() => handleSignIn(client)}>
                Sign in
              </Button>
            </div>
          </Cell>
        </Row>
        <Row>
          <Cell>
            { email || password ?
              <DemoCard data={{email, password}} title="User entered data" />
              : null
            } 
          </Cell>
        </Row>
        <Row>
          <Cell>
          { email || password ?
            <DemoCard data={{encryptedEmail, encryptedPassword}} title="User's encrypted entered data" />
            : null
          } 
          </Cell>
        </Row>
        <Row>
          <Cell>
          { serverResponse ?
            <DemoCard data={serverResponse} title="User's server response" />
            : null
          } 
          </Cell>
        </Row>
        <Row>
          <Cell>
          { serverDecryptedResponse ?
            <DemoCard data={serverDecryptedResponse} title="User's server response decrypted" />
            : null
          } 
          </Cell>
        </Row>
      </Grid>
      )}
    </ApolloConsumer>
  );
};

export default SignIn;
