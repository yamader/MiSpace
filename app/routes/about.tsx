/** @jsx jsx */
import { jsx } from "@emotion/react"
import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"

import Layout from "~/components/layout"
import { getUserMeta } from "~/utils/session.server"
import type { UserMeta } from "~/components/layout"

type LoaderData = {
  user: UserMeta | null
}

export const loader: LoaderFunction = async ({ request }) => {
  return json({
    user: await getUserMeta(request),
  })
}

const About = () => {
  const data = useLoaderData<LoaderData>()
  return (
    <Layout user={data.user}>
      <h1
        css={{
          fontWeight: "800",
          "::after": {
            content: '":"',
          },
        }}>
        About
      </h1>

      <h2>名前</h2>
      <p style={{ fontStyle: "italic" }}>Misskey Space</p>
      <p>みすぱけ とか……</p>

      <h2>各種リンク</h2>
      <a href='https://github.com/yamader/misskey-space' target='_blank'>
        GitHub
      </a>
    </Layout>
  )
}
export default About
