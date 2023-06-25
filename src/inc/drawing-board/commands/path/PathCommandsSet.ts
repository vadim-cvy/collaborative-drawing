import CommandsSet from "../CommandsSet";

// todo (future): implement the same but for transformation (select rect then move/resize)
export default class PathCommandsSet extends CommandsSet
{
  public do( ctx: CanvasRenderingContext2D )
  {
    ctx.beginPath()

    super.do( ctx )

    ctx.stroke()
  }
}