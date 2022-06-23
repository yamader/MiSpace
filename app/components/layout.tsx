/** @jsx jsx */
import { useState, useEffect, useRef } from "react"
import { NavLink } from "@remix-run/react"
import { jsx } from "@emotion/react"
import styled from "@emotion/styled"
import type { ReactNode } from "react"

import { FaceSmall } from "~/components/face"

export type UserMeta = {
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
      flexDirection: "column",
    }}>
    <header>
      <nav
        css={{
          display: "flex",
          margin: ".5rem 0",
          padding: "0 .5rem",
          justifyContent: "space-between",
          alignItems: "center",
          userSelect: "none",
        }}>
        <div
          css={{
            fontSize: "2rem",
            fontWeight: "900",
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
    <hr
      css={{
        display: "flex",
        width: "100%",
        marginTop: 0,
      }}
    />
    <section
      css={{
        padding: "0 1em",
      }}>
      {children}
    </section>
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

const NavLinks = ({ user }: { user: UserMeta | null }) => {
  const Ul = styled.ul({
    display: "flex",
    fontSize: "1.2rem",
    fontWeight: "800",
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

const MeIcon = ({ user }: { user: UserMeta | null }) => {
  const [popup, setPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (popupRef.current) popupRef.current.focus()
  }, [popup])

  return !user ? null : (
    <div
      css={{
        position: "relative",
        marginLeft: "1rem",
      }}>
      <button
        onClick={() => setPopup(!popup)} //
        css={{
          border: "none",
        }}>
        <FaceSmall icon={user.icon} />
      </button>
      {popup && (
        <div
          ref={popupRef}
          tabIndex={0}
          onBlur={e => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setPopup(false)
            }
          }}
          css={{
            padding: ".25rem",
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
              borderRadius: ".25rem",
              ":hover": {
                background: "lightgray",
              },
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
          <form action='/logout' method='post'>
            <button
              type='submit'
              css={{
                width: "100%",
                padding: 0,
                border: "none",
                textAlign: "start",
              }}>
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
