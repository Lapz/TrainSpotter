import React from "react"
import App from "next/app"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "../theme/theme"
import firebase from "firebase/app"
import { FIREBASE_CONFIG } from "../config/google"
import { IStore, initializeStore } from "../stores"

interface IOwnProps {
  isServer: boolean
  initialState: IStore
}

export default class MyApp extends App {
  private store: IStore

  // constructor(props) {
  //   super(props)
  //   this.store = initializeStore(props.isServer, props.initialState) as IStore
  // }

  // public static async getInitialProps({ Component, router, ctx }) {
  //   //
  //   // Use getInitialProps as a step in the lifecycle when
  //   // we can initialize our store
  //   //
  //   const isServer = typeof window === "undefined"
  //   const store = initializeStore(isServer)

  //   let pageProps = {}
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }

  //   return {
  //     initialState: getSnapshot(store),
  //     isServer,
  //     pageProps
  //   }
  // }

  componentDidMount() {
    firebase.initializeApp(FIREBASE_CONFIG)
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")

    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    )
  }
}
