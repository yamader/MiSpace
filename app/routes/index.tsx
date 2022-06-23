/** @jsx jsx */
import { jsx } from "@emotion/react"
import { Link, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"

import Layout from "~/components/layout"
import { FaceSmall, FaceMedium, FaceLarge } from "~/components/face"
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

const Index = () => {
  const data = useLoaderData<LoaderData>()

  return (
    <Layout user={data.user}>
      <section css={{}}>
        <h1
          css={{
            fontWeight: "800",
            "::after": {
              content: '":"',
            },
          }}>
          Explore
        </h1>
        <Space />
      </section>
    </Layout>
  )
}
export default Index

const Space = ({ a }) => {
  return (
    <article
      style={{
        display: "flex",
        padding: "1rem",
        border: "2px solid",
        borderRadius: ".5rem",
      }}>
      <FaceLarge />
      <div>
        <span
          style={{
            display: "block",
            fontSize: "1.2em",
            fontWeight: "bold",
          }}>
          Title
        </span>
        <p>description</p>
      </div>
    </article>
  )
}
