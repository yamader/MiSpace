import Layout from "~/components/layout"

const About = () => (
  <Layout>
    <h1>MiSpaceについて</h1>

    <h2>名前</h2>
    <p style={{ fontStyle: "italic" }}>Misskey Space</p>
    <p>みすぱけ とか……</p>

    <h2>各種リンク</h2>
    <a href='https://github.com/yamader/misskey-space' target='_blank'>
      GitHub
    </a>
  </Layout>
)
export default About
