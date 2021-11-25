import { CookiesProvider } from "react-cookie"; // may not use
import StoreProvider from '@/utils/Store';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <StoreProvider>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </StoreProvider>
  )
}
export default MyApp;