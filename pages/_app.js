import { CookiesProvider } from "react-cookie";
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}
export default MyApp;