import { Container } from "@material-ui/core"
import Footer from "./Footer"
import Header from "./Header"
import NavBar from "./Nav"

interface IProps {
  title?: string
}

const Layout: React.FunctionComponent<IProps> = ({ children, title }) => (
  <div>
    <Header title={title} />
    <NavBar />
    <Container>{children}</Container>
    <Footer />
  </div>
)

export default Layout
