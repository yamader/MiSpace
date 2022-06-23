/** @jsx jsx */
import { jsx } from "@emotion/react"
import { json, redirect } from "@remix-run/node"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"

import Layout from "~/components/layout"
import { getUserMeta, startMiAuth } from "~/utils/session.server"
import type { UserMeta } from "~/components/layout"

const validUrl = (url: any) => {
  if (typeof url !== "string") return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const host = form.get("url")
  if (!validUrl(host)) return json({ err: "invalid url" }, { status: 400 })
  const res = await fetch(`${host}/api/meta`, { method: "POST" })
  if (!res.ok) return json({ err: "invalid host" }, { status: 400 })
  const miauth = await startMiAuth(host as string)
  return redirect(miauth)
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserMeta(request)
  if (user !== null) throw redirect(`/`)
  return json(null)
}

const Login = () => {
  return (
    <Layout user={null}>
      <section css={{}}>
        <h1
          css={{
            fontWeight: "800",
            "::after": {
              content: '":"',
            },
          }}>
          Login
        </h1>
        <form
          method='post'
          css={{
            margin: "2rem 0",
          }}>
          <legend>インスタンスURL</legend>
          <div
            css={{
              display: "flex",
              height: "3rem",
              margin: "1rem auto",
            }}>
            <input
              name='url'
              type='url'
              placeholder='https://example.net'
              css={{
                flex: 1,
                height: "100%",
                padding: "0 1rem",
                border: "2px solid",
                borderRadius: ".5rem 0 0 .5rem",
                ":invalid": {
                  borderColor: "red",
                  borderWidth: "4px",
                },
              }}
            />
            <button
              type='submit'
              css={{
                height: "100%",
                padding: "0 1rem",
                border: "2px solid",
                borderLeft: "none",
                borderRadius: "0 .5rem .5rem 0",
              }}>
              ログイン
            </button>
          </div>
        </form>
      </section>
    </Layout>
  )
}
export default Login
