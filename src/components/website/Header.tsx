import Head from "next/head"

interface IProps {
  title?: string
}

const Header: React.FunctionComponent<IProps> = ({ title = "" }) => (
  <Head>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0,width=device-width" />
  </Head>
)

export default Header
