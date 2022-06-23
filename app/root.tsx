/** @jsx jsx */
import { jsx } from "@emotion/react"
import type { MetaFunction, ErrorBoundaryComponent } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react"

import Layout from "~/components/layout"

import sanitize from "sanitize.css"
import sanitizeForm from "sanitize.css/forms.css"
import sanitizeTyp from "sanitize.css/typography.css"
import appStyle from "~/styles/app.css"

export const links = () => [
  { rel: "stylesheet", href: sanitize },
  { rel: "stylesheet", href: sanitizeForm },
  { rel: "stylesheet", href: sanitizeTyp },
  { rel: "stylesheet", href: appStyle },
]

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "MiSpace",
  viewport: "width=device-width,initial-scale=1",
})

// Node Error
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
  <html lang='ja'>
    <head>
      <Meta />
      <Links />
    </head>
    <body>
      <Layout user={null}>
        <h1>AAGGHHHH!</h1>
        <pre
          css={{
            whiteSpace: "pre-wrap",
          }}>
          {error.message}
        </pre>
      </Layout>
      <Scripts />
    </body>
  </html>
)

// App Error
export const CatchBoundary: ErrorBoundaryComponent = () => {
  const caught = useCatch()
  return (
    <html lang='ja'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout user={null}>
          <h1>Oops!</h1>
          <p>{caught.status}</p>
        </Layout>
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <html lang='ja'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
