import React, { useState, useEffect } from 'react'
import { useSession, getProviders, signIn, getCsrfToken, ClientSafeProvider, LiteralUnion } from "next-auth/react"
import { useRouter } from "next/router";


const SignIn = () => {
  const {data: session, status} = useSession();
  // const providers = getProviders();
  const router = useRouter();
  
  const [providers, setProviders] = useState();

  // const [session, loading] = useSession({
  //   required: true,
  //   redirectTo: 'http://localhost:3000',
  //   queryConfig: {
  //     staleTime: 60 * 1000 * 60 * 3, // 3 hours
  //     refetchInterval: 60 * 1000 * 5, // 5 minutes
  //   },
  // });

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setProviders(setupProviders);
    };
    setTheProviders();
  }, []);

  if (status === 'loading') {
    return <h1>Loading...</h1>
  }

  if (session) {
    router.push('/')
  }

  console.log("session")
  console.log(session)
  console.log("++++++++++")
  console.log("status")
  console.log(status)
  console.log("++++++++++")
  console.log("providers")
  console.log(providers)
  return (
    <div>
      <h2>Signin</h2>
      
      <div>
        {/* {providers.credentials.name === "Credentials" && ()} */}
      </div>

      <h2>{providers?.credentials.name}</h2>
      {/* <div>{providers?.credentials.signinUrl}</div> */}
      {/* <div>{providers?.credentials}</div> */}
      {/* <button onClick={() => signIn("Credentials", {email: values.email, password: values.password })}></button> */}
      {/* <form action="/api/auth/signin"> */}
        {/* <input type="hidden" name="csrfToken" /> */}
        {/* <div className="signin__group"> */}
          <label className="signin__label">Email: </label>
          <label className="signin__label">Password: </label>
          {/* <div> */}
            {/* {if (providers.name === "Credentials") { */}
              {/* return; */}
            {/* }} */}
          {/* </div> */}
          {/* <div>{providers?.credentials.email}</div> */}
          {/* <button onClick={() => signIn("Credentials", {email: "john@doe.com", password: '1234' })}>Sign In</button> */}
          {/* <button onClick={() => signIn(providers?.credentials.id)}>Sign In</button> */}
        </div>
      // </form>
    // </div>
  )
}
export default SignIn;