import Command from "../Command";

export default class CommandStrokeStyle extends Command
{
  public constructor(
    protected readonly color: string
  )
  {
    super()
  }

  public do( ctx: CanvasRenderingContext2D )
  {
    ctx.strokeStyle = this.color
  }
}