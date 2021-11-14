import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';
/*
const MyApp = ({
  Component, pageProps
}) => {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
export default MyApp;
*/

const MyApp = ({
  Component, pageProps: {session, ...pageProps}
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
export default MyApp;

// VERSION 0.3
// import '../styles/globals.css';
// import { Provider } from "next-auth/client";

// const MyApp = ({Component, pageProps}) => {
//   return (
//     <Provider session={pageProps.session}>
//       <Component {...pageProps} />
//     </Provider>
//   )
// }
// export default MyApp;