import CoordCommand from "./CoordCommand";

export default class CommandLineTo extends CoordCommand
{
  public do( ctx: CanvasRenderingContext2D )
  {
    ctx.lineTo( this.coord.x, this.coord.y )
  }
}