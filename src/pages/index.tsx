import { NextPage } from "next"
import StatusTable from "../components/linestatus/StatusTable"
import Layout from "../components/website/Layout"

const Home: NextPage<{}> = () => (
  <Layout>
    <StatusTable />
  </Layout>
)

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent
  return { userAgent }
}
export default Home
