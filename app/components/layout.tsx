/** @jsx jsx */
import { useState } from "react"
import { NavLink } from "@remix-run/react"
import { jsx } from "@emotion/react"
import styled from "@emotion/styled"
import { FaceSmall } from "~/components/face"
import type { ReactNode } from "react"

type UserMeta = {
  nick: string
  name: string
  fqdn: string
  icon: string
}

const Layout = ({
  children,
  user,
}: {
  children: ReactNode
  user: UserMeta | null
}) => (
  <div
    css={{
      display: "flex",
      maxWidth: "840px",
      minHeight: "100vh",
      margin: "0 auto",
      padding: "0 .5em",
      flexDirection: "column",
    }}>
    <header>
      <nav
        css={{
          display: "flex",
          margin: "1rem 0",
          justifyContent: "space-between",
          alignItems: "center",
          userSelect: "none",
        }}>
        <div
          css={{
            fontSize: "2rem",
            fontWeight: "bold",
          }}>
          MiSpace
        </div>
        <div
          css={{
            display: "flex",
            alignItems: "center",
          }}>
          <NavLinks user={user} />
          <MeIcon user={user} />
        </div>
      </nav>
    </header>
    <section>{children}</section>
    <footer
      css={{
        marginTop: "auto",
        padding: ".5em 0",
        textAlign: "center",
        fontWeight: "bold",
      }}>
      <span>© {new Date().getFullYear()} YamaD</span>
    </footer>
  </div>
)
export default Layout

// const Header = ({ user }: { user: UserMeta | null }) => ()

const NavLinks = ({ user }: { user: User | null }) => {
  const Ul = styled.ul({
    display: "flex",
    fontSize: "1.2rem",
    fontWeight: "bold",
    "li + li": {
      marginLeft: "1rem",
    },
    a: {
      color: "black",
      textDecoration: "none",
    },
    "a:hover": {
      textDecoration: "underline",
    },
    "a.active": {
      color: "green",
      textDecoration: "underline",
    },
  })

  const Li = ({ path, text }: { path: string; text: string }) => (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? "active" : undefined)}>
        {text}
      </NavLink>
    </li>
  )

  return (
    <Ul>
      <Li path='/' text='Top' />
      <Li path='/about' text='About' />
      {user ? (
        <Li path='/new' text='Host!' />
      ) : (
        <Li path='/login' text='Login' />
      )}
    </Ul>
  )
}

const MeIcon = ({ user }: { user: User | null }) => {
  const [popup, setPopup] = useState(false)

  return !user ? null : (
    <div
      css={{
        position: "relative",
        marginLeft: "1rem",
      }}>
      <div onClick={() => setPopup(!popup)}>
        <FaceSmall icon={user.icon} />
      </div>
      {popup && (
        <div
          css={{
            padding: ".5rem",
            position: "absolute",
            top: "120%",
            right: ".5rem",
            background: "white",
            border: "2px solid",
            borderRadius: ".5rem",
            a: {
              color: "black",
              textDecoration: "none",
            },
            "> *": {
              display: "flex",
              margin: 0,
              padding: ".25rem .5rem",
              width: "100%",
            },
            "> hr": {
              margin: ".25rem 0",
              padding: 0,
            },
          }}>
          <p
            css={{
              flexWrap: "wrap",
              span: {
                display: "inline-block",
              },
            }}>
            <span>{user.nick}</span>
            <span>
              ({user.name}@{user.fqdn})
            </span>
          </p>
          <hr />
          <NavLink to='/logout'>Logout</NavLink>
        </div>
      )}
    </div>
  )
}
