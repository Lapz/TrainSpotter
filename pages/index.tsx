import { NextPage } from "next"
import Button from "@material-ui/core/Button"

import StatusTable from "../ components/linestatus/statusTable"
import Layout from "../ components/website/layout"
// import Header from "../components/website/header/header"
const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <Layout>
    <StatusTable />
  </Layout>
)

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent
  return { userAgent }
}
export default Home
