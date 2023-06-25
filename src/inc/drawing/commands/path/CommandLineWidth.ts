import Command from "../Command";

export default class CommandLineWidth extends Command
{
  public constructor(
    protected readonly width: number
  )
  {
    super()
  }

  public do( ctx: CanvasRenderingContext2D )
  {
    ctx.lineWidth = this.width
  }
}