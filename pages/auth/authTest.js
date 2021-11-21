import React, {useState} from 'react';
import { useCookies } from 'react-cookie';
import { parseCookies } from '@/utils/cookies';
// import {verifAuth, authRole} from '@/utils/verifAuth'
import {verifToken, verifRole} from '@/utils/cookies';

export const AuthTest = ({token, role}) => {
  // console.log(token);
  // console.log(role);
  // const [userRole, setUserRole] = useState(role || "");
  // *** role is derived from the backend, stores in redux state, call servver to verify token is legit
  const [isAuth, setAuth] = useState(token || "");

  return (
    <section>
    {isAuth ? (
      <>
      <h2>Is Logged IN</h2>
      <p>You are logged in as {isAuth}.</p>
      <p>You have the role of: {userRole}.</p>
      </>
    ) : (
      <>
      <h2>Is Logged OUT</h2>
      <p>Please sign in.</p>
      </>
    )}
    {/* {isAuth  ? (
      <section>
        You can make a blog.
      </section>
    ) : (
      <section>
        You cannot make a blog. Only read and like them.
      </section>
    )} */}
    </section>
  )
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}

// AuthTest.getInitialProps = async ({ req }) => {
//   const data = parseCookies(req);

//   // if (res) {
//   //   if (Object.keys(data).length === 0 && data.constructor === Object) {
//   //     res.writeHead(301, { Location: "/" })
//   //     res.end()
//   //   }
//   // }

//   return {
//     data: data && data,
//   }
// };

export default AuthTest;