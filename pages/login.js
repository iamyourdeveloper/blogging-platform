// import React from 'react';
// import { useSession, getProviders, providers, signIn, csrf } from "next-auth/react";
import Head from "next/head";
// const Login = async () => {
const Login = () => {
  // const { data: session } = useSession();
  // const providers = await getProviders();
  // const providers = getProviders();
  // console.log("providers")
  // console.log(providers)
  // console.log(providers[0])
  // res.end()
  return (
    <div>
    {/* <Head>Login Page</Head> */}
    <h2>Login Page</h2>
      {/* {Object.values(providers).map((provider) => (
        <div key={provider.name} >
          <button onClick={() => signIn(provider.id)}> Login by {provider.name} </button>
        </div>
      ))} */}
      {/* {providers[0]} */}
      {/* {providers[0].name} */}
    </div>
  )
}
export default Login;