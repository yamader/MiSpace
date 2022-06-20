type FaceFlame = "none" | "gray" | "green" | "red"

type FaceProps = {
  icon: string
  frame?: FaceFlame
  hexagon?: boolean
}

const frameColor = (s: FaceFlame) => {
  switch (s) {
    case "none":
      return "transparent"
    case "gray":
      return "gray"
    case "green":
      return "lightgreen"
    case "red":
      return "red"
  }
}

const Face = ({
  icon,
  size,
  frame = "none",
  hexagon = false,
}: FaceProps & { size: string }) => (
  <>
    <img
      src={icon}
      style={{
        width: size,
        height: size,
        ...(hexagon
          ? {
              borderRadius: 0,
            }
          : {
              borderRadius: "100%",
              ...(frame !== "none" && {
                border: `.4rem solid ${frameColor(frame)}`,
              }),
            }),
      }}
    />
  </>
)
export default Face

export const FaceSmall = (arg: FaceProps) => (
  <Face {...{ ...arg, size: "2rem" }} />
)
export const FaceMedium = (arg: FaceProps) => (
  <Face {...{ ...arg, size: "4rem" }} />
)
export const FaceLarge = (arg: FaceProps) => (
  <Face {...{ ...arg, size: "8rem" }} />
)
