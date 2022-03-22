import "../styles/globals.css";
import SuggestionProvider from "./store/SuggestionProvider";

function MyApp({ Component, pageProps }) {
  return (
    <SuggestionProvider>
      <Component {...pageProps} />
    </SuggestionProvider>
  );
}

export default MyApp;
