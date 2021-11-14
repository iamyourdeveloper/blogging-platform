// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import Providers from "next-auth/providers";
// import FacebookProvider from 'next-auth/providers/facebook';
// import GoogleProvider from 'next-auth/providers/google';
// import db from '@/utils/database';
// import User from '@/models/User';
// import api from '@/utils/api';
// import verifyPassword from '@/utils/jwtGenerator';
// import { decode, encode } from "next-auth/jwt";
/*
// *** for register or login, credentials consist of email and password via req.body
const options = {
  database: process.env.MONGO_URI,
  providers: [
    // Providers.Facebook({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    // }),
    // Providers.Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   // domain: NODE_ENV === 'production' ? process.env.DOMAIN : process.env.DOMAIN_LOCAL,
    //   // clientId: process.env.GOOGLE_ID,
    //   // clientSecret: process.env.GOOGLE_SECRET,
    //   // authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    // }),
    // custom provider via backend database
    Providers.Credentials({
      name: "Custom",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@doe.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials, req) {
        try {
          await db.connectToDB();
          // const result = await User.findOne({ email: credentials.email });
          const user = await User.findOne({ email: credentials.email });
          // const user = await api.post('/auth/login',
            // {email: credentials.email, password: credentials.password}
          // );
          // await db.disconnect();
          if (!user) {
            await db.disconnect();
            throw new Error('No user found!')
          }
          
          const isValid = verifyPassword(credentials.password, user.password);
          
          if (isvalid) {
            await db.disconnect();
            console.log(user);
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server error...");
        }
      }
    })
  ],
  callbacks: {
    async signIn(user, account, profile, token) {
      console.log(user, account, profile, token)
      if (user) {
        if (user.role === 'banned') {
          return "/unauthorized"
        }; 
        user.provider = account.provider;
      }
      return true
    },
    // async redirect(url, baseUrl) {
    //   console.log(baseUrl)
    //   return baseUrl;
    // },
    async session(session, user, token) {
      console.log(session, user, token)
    //   // session.jwt = token.jwt;
    //   // session.accessToken = token.accessToken;
    //   // session.user = token.user;
    //   // session.accessToken = token.accessToken ? token.accessToken : session.user = token.user ? token.user : session.user;
      session.id = token.id;
      session.username = token.username;
      session.role = token.role;
    //   // session.accessToken = token.accessToken ? token.accessToken : session.user = token.id ? token.id : session.user;
      
      return Promise.resolve(session);
    },
    async jwt(token, account = "", user) {
    //   console.log("assessing user - forming jwt")
    //   console.log(user)
    //   // *** by default jwt stored in cookie
    //   // if (account) {
    //     // token.accessToken = account.access_token;
    //   // }
      if (user) {
    //     // token.jwt = user.data.jwt;
        token.id = user._id;
        token.username = user.username;
        token.role = user.role;
    //     // token.accessToken = user?.token;
    //     // token.accessToken = user.data._id;
    //     // token.id = user._id;
      }
    //   // return token;
      return Promise.resolve(token);
    },
  },
  // 2week jwt valid
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
    maxAge: 14 * 24 * 60 * 60, // 14d * 24h * 60min * 60sec
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    // encryption: true,
  //   encode: async ({secret, token, maxAge}) => {
  //     await jwt.sign(token, secret, maxAge)
  //   },
  //   decode: async ({secret, token, maxAge}) => {
  //     await jwt.verify(token, secret)
  //   }
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    signOut: '/',
    error: '/auth/signin',
    // error: '/auth/error'
  }
};

// export default (req, res) => NextAuth(req, res, options);
export default async function handler(req, res) {
  await NextAuth(req, res, options);
}
*/
// TODO: import { Provider } from 'next-auth/client' into _app.js as a wrapper around the default App component like so:
/*
session: {
    jwt: true
  },
  jwt: {
    secret: 'asdcvbtjhm'
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session(session, token) {
      session.user.id = token.id
      return session
    }
  }
*/



/*
import { Provider } from 'next-auth/client'

export default function App ({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

// ##################################################
// https://next-auth.js.org/v3/configuration/options#session
JWT Helper#

You can use the built-in getToken() helper method to verify and decrypt the token, like this:

import jwt from "next-auth/jwt"
const secret = process.env.JWT_SECRET
export default async (req, res) => {  const token = await jwt.getToken({ req, secret })  console.log("JSON Web Token", token)  res.end()}

For convenience, this helper function is also able to read and decode tokens passed in an HTTP Bearer header.

Required

The getToken() helper requires the following options:

    req - (object) Request object
    secret - (string) JWT Secret

You must also pass any options configured on the jwt option to the helper.

e.g. Including custom session maxAge and custom signing and/or encryption keys or options

Optional

It also supports the following options:
  secureCookie - (boolean) Use secure prefixed cookie name
  By default, the helper function will attempt to determine if it should use the secure prefixed cookie (e.g. true in production and false in development, unless NEXTAUTH_URL contains an HTTPS URL).
  cookieName - (string) Session token cookie name
  The secureCookie option is ignored if cookieName is explicitly specified.
  raw - (boolean) Get raw token (not decoded)
  If set to true returns the raw token without decrypting or verifying it.

note: The JWT is stored in the Session Token cookie, the same cookie used for tokens with database sessions.
*/

// ##################################################
// ############# NEXT AUTH VERSION 04 ###############
// currently in beta, may switch to it later
// ##################################################

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import db from '@/utils/database';
import User from '@/models/User';
// import api from '@/utils/api';
import verifyPassword from '@/utils/jwtGenerator';
import { decode, encode } from "next-auth/jwt";

// *** for register or login, credentials consist of email and password via req.body
export default NextAuth({
  site: process.env.NEXTAUTH_URL,
  // database: process.env.MONGO_URI,
  // adapter: process.env.MONGO_URI,
  providers: [
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    //   // clientId: process.env.GOOGLE_ID,
    //   // clientSecret: process.env.GOOGLE_SECRET,
    //   // authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    // }),
    // custom provider via backend database
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@doe.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials, req) {
        // try {
          // await db.connectToDB();
          // const result = await User.findOne({ email: credentials.email });
          // const user = await User.findOne({ email: credentials.email });
          const user = {
            _id: '3292098', username: 'fox', role: 'user'
          }
          console.log("user from db");
          console.log(user);
          console.log("888888");
          // const user = await api.post('/auth/login',
            // {email: credentials.email, password: credentials.password}
          // );
          // if (!user) {
          //   await db.disconnect();
          //   throw new Error("No user found!");
          // }

          // const isValid = verifyPassword(credentials.password, user.password);

          // const isValid = true;
          if (credentials.email === "john@doe.com" && credentials.password === "1234") {
            // await db.disconnect();
            // console.log(user);
            // return user;
            return Promise.resolve(user);
          } else {
            return null;
            // return Provider.resolve(null);
          }
        // } catch (err) {
          // console.error(err.message);
          // res.status(500).send("Server error...");
        // }
      }
    })
  ],
  callbacks: {
//     // async signIn({user, account, profile, token}) {
//     //   console.log(user, account, profile, token)
//     //   if (user) {
//     //     user.provider = account.provider;
//     //     if (user.role === 'banned') {
//     //       return "/unauthorized"
//     //     }; 
//     //   }
//     //   return true
//     // },
//     // after login, redirect to "/" essentially
    // async redirect({ url, baseUrl }) {
      // return baseUrl;
    // },
    // redirect({ url, baseUrl }) {
    //   if (url.startsWith(baseUrl)) return url
    //   // Allows relative callback URLs
    //   else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
    //   return baseUrl
    // },
    async redirect({ url, baseUrl }) {
      //  return Promise.resolve(url);
       return url;
    },
    async session({session, token}) {
//       // session.jwt = token.jwt;
//       // session.accessToken = token.accessToken;
//       // session.user = token.user;
//       // session.accessToken = token.accessToken ? token.accessToken : session.user = token.user ? token.user : session.user;
//       // session.accessToken = token.accessToken ? token.accessToken : session.user = token.id ? token.id : session.user;
      if (token) {
        session.id = token.id;
        session.username = token.username;
        session.role = token.role;
      }
      
      return Promise.resolve(session);
      // return session;
    },
    async jwt({token, user}) {
//       console.log("assessing user - forming jwt")
//       console.log(user)
//       // *** by default jwt stored in cookie
//       // if (account) {
//         // token.accessToken = account.access_token;
//       // }
      if (user) {
//         // token.jwt = user.data.jwt;
        token.id = user._id;
        token.username = user.username;
        token.role = user.role;
//         // token.accessToken = user?.data.token;
//         // token.accessToken = user.data._id;
//         // token.id = user._id;
      }
//       // return token;
      // return token;
      return Promise.resolve(token);
//     },
    },
  },
  secret: process.env.JWT_SECRET,
  // 2week jwt valid
  
  session: {
    // jwt: true,
    strategy: "jwt",
//     // maxAge: 14 * 24 * 60 * 60, // 14d * 24h * 60min * 60sec
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
//     // async encode({secret, token, maxAge}) {
//       // await jwt.sign(token, secret, maxAge)
//     // },
//     // async decode({secret, token, maxAge}) {
//       // await jwt.verify(token, secret)
//     // }
  },
  pages: {
    // signIn: '/auth/signin',
    // signIn: 'login',
    signIn: "auth/signin",
//     // signOut: '/auth/signout',
    signOut: '/',
    error: 'auth/signin',
//     // error: '/auth/error'
  }
});

// TODO: import { Provider } from 'next-auth/client' into _app.js as a wrapper around the default App component like so:
/*
import { Provider } from 'next-auth/client'

export default function App ({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
*/
// ##################################################
// ##################################################
// ##################################################
// ##################################################
// ############# NEXT AUTH VERSION 04 ###############
// currently in beta, may switch to it later
// ##################################################
/*
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import db from '@/utils/database';
import User from '@/models/User';
import api from '@/utils/api';
import { decode, encode } from "next-auth/jwt";

// *** for register or login, credentials consist of email and password via req.body
export default NextAuth({
  database: process.env.MONGO_URI,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
      // clientId: process.env.GOOGLE_ID,
      // clientSecret: process.env.GOOGLE_SECRET,
      // authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    }),
    // custom provider via backend database
    CredentialsProvider({
      name: "Sign in with Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@doe.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials, req) {
        try {
          await db.connectToDB();
          // const result = await User.findOne({ email: credentials.email });
          const user = await api.post('/auth/login',
            {email: credentials.email, password: credentials.password}
          );
          await db.disconnect();
          if (user) {
            console.log(user.data);
            return user.data;
          } else {
            return null;
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server error...");
        }
      }
    })
  ],
  callbacks: {
    // async signIn({user, account, profile, token}) {
    //   console.log(user, account, profile, token)
    //   if (user) {
    //     user.provider = account.provider;
    //     if (user.role === 'banned') {
    //       return "/unauthorized"
    //     }; 
    //   }
    //   return true
    // },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({session, user, token}) {
      // session.jwt = token.jwt;
      // session.accessToken = token.accessToken;
      // session.user = token.user;
      // session.accessToken = token.accessToken ? token.accessToken : session.user = token.user ? token.user : session.user;
      session.accessToken = token.accessToken ? token.accessToken : session.user = token.id ? token.id : session.user;
      
      return Promise.resolve(session);
    },
    async jwt({token, account = "", user}) {
      console.log("assessing user - forming jwt")
      console.log(user)
      // *** by default jwt stored in cookie
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        // token.jwt = user.data.jwt;
        token.id = user.data.data.user._id;
        token.role = user.data.data.user.role;
        // token.accessToken = user?.data.token;
        // token.accessToken = user.data._id;
        // token.id = user._id;
      }
      // return token;
      return Promise.resolve(token);
    },
  },
  // 2week jwt valid
  session: {
    jwt: true,
    maxAge: 14 * 24 * 60 * 60, // 14d * 24h * 60min * 60sec
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
    async encode({secret, token, maxAge}) {
      await jwt.sign(token, secret, maxAge)
    },
    async decode({secret, token, maxAge}) {
      await jwt.verify(token, secret)
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/signin',
    // error: '/auth/error'
  }
});

// TODO: import { Provider } from 'next-auth/client' into _app.js as a wrapper around the default App component like so:
/
import { Provider } from 'next-auth/client'

export default function App ({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
*/
// ##################################################
// ##################################################
// ##################################################