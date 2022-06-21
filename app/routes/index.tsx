import Layout from "~/components/layout"
import { Link, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import { FaceSmall, FaceMedium, FaceLarge } from "~/components/face"
import type { LoaderFunction } from "@remix-run/node"

type LoaderData = {}

export const loader: LoaderFunction = () => {
  return json({})
}

const Index = () => {
  const data = useLoaderData<LoaderData>()

  return (
    <Layout>
      <section
        style={{
          padding: "1rem",
          border: "2px solid",
          borderRadius: ".5rem",
        }}>
        <h2>Explore</h2>
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
