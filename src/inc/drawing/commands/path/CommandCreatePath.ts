import Command from "../Command";

// todo (future): implement the same but for transformation (select rect then move/resize)
export default class CommandCreatePath extends Command
{
  public do( ctx: CanvasRenderingContext2D )
  {
    ctx.beginPath()

    super.do( ctx )

    ctx.stroke()
  }
}