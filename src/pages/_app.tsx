import BlogProvider from "../context/BlogProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BlogProvider>
      <Component {...pageProps} />
    </BlogProvider>
  );
}
