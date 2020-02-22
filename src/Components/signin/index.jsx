/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext } from 'react';
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
  const [password, setPassword] = useState("viajay@26");
  const [encryptedEmail, setEncryptedEmail] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const { setUser, user } = useContext(UserContext);
  const history = useHistory();
  
  const query = gql`
  query Login($encryptedEmail: String!, $encryptedPassword: String!) {
    login(email:$encryptedEmail, password:$encryptedPassword){
      userId
      token
      code
      success
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
  const handleSignIn = async (client) => {
    // setUser(true);

    const { data } = await client.query({
      query: query,
      variables: { encryptedEmail, encryptedPassword}
    });
    console.log(decryption(encryptedEmail), "decrypted email");

    setUser(data);
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
    encryption(value).then((response) => {
      setEncryptedEmail(response);
    });
    setEmail(value);
  }

  const onPasswordChange = (e) => {
    const value = e.target.value;
    encryption(value).then((response) => {
      setEncryptedPassword(response);
    });
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
              <DemoCard data={{email, password}} />
              : null
            } 
          </Cell>
        </Row>
        <Row>
          <Cell>
          { email || password ?
            <DemoCard data={{encryptedEmail, encryptedPassword}} />
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
