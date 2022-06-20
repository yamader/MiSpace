import { NavLink } from "@remix-run/react"
import type { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      maxWidth: "840px",
      minHeight: "100vh",
      margin: "0 auto",
      padding: "0 .5em",
      flexDirection: "column",
    }}>
    <Header />
    <section>{children}</section>
    <Footer />
  </div>
)
export default Layout

const Header = () => (
  <header>
    <nav className='headerNav'>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}>
        MiSpace
      </div>
      <ul
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? "active" : undefined)}>
            Top
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/about'
            className={({ isActive }) => (isActive ? "active" : undefined)}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/new'
            className={({ isActive }) => (isActive ? "active" : undefined)}>
            Host!
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
)

const Footer = () => (
  <footer
    style={{
      marginTop: "auto",
      padding: ".5em 0",
      textAlign: "center",
      fontWeight: "bold",
    }}>
    <span>© {new Date().getFullYear()} YamaD</span>
  </footer>
)
