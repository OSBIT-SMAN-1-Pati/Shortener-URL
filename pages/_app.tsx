import { AppProps } from "next/app";
import "../styles/globals.css";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {SessionProvider} from "next-auth/react"


const App = ({ Component, pageProps:{session,...pageProps} }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
        <ReactQueryDevtools />
        <Component {...pageProps} />
        </SessionProvider>
        
      </QueryClientProvider>
    </>
  )
};

export default App;