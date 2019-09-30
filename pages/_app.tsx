import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"
import firebase from "firebase/app"
import { Provider } from "mobx-react"
import { getSnapshot } from "mobx-state-tree"
import { NextComponentType, NextPageContext } from "next"
import App, { AppInitialProps } from "next/app"
import Head from "next/head"
import { Router } from "next/router"
import React from "react"
import { FIREBASE_CONFIG } from "../config/google"
import { initializeStore, IStore } from "../stores"
import theme from "../theme/theme"
interface IOwnProps {
  isServer: boolean
  initialState: IStore
}

export default class MyApp extends App<IOwnProps> {
  public static async getInitialProps({
    Component,
    ctx
  }: {
    Component: NextComponentType
    ctx: NextPageContext
  }) {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store
    //
    const isServer = typeof window === "undefined"
    const store = initializeStore(isServer)

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps
    }
  }

  private store: IStore

  constructor(props: any) {
    super(props)
    this.store = initializeStore(props.isServer, props.initialState) as IStore
  }

  public componentDidMount() {
    firebase.initializeApp(FIREBASE_CONFIG)
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")

    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles)
    }
  }

  public render() {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider store={this.store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}
