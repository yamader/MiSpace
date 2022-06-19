import type { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
    }}>
    <section>{children}</section>
    <footer
      style={{
        marginTop: "auto",
        padding: ".5em 0",
        textAlign: "center",
        fontWeight: "bold",
      }}>
      <span>© {new Date().getFullYear()} </span>
      <a href='https://github.com/yamader/misskey-space' target='_blank'>
        Source
      </a> by <a href='https://yamad.me' target='_blank'>
        YamaD
      </a>
    </footer>
  </div>
)
export default Layout
