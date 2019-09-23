import Header from "./header"
import NavBar from "./nav"
import Footer from "./footer"
import { Container } from "@material-ui/core"
interface Props {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({ children, title }) => (
  <div>
    <Header title={title} />
    <NavBar />
    <Container maxWidth="sm">{children}</Container>
    <Footer />
  </div>
)

export default Layout
