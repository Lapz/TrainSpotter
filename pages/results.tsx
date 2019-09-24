import { Card } from "@material-ui/core"
import { NextPage } from "next"
import ResultCard from "../ components/results/ResultCard"
import Layout from "../ components/website/Layout"

const Results: NextPage<{}> = () => (
  <Layout>
    <ResultCard inboundTrains={[]} outboundTrains={[]} />

    <Card>
      <h1>What in the world</h1>
    </Card>
  </Layout>
)

export default Results
