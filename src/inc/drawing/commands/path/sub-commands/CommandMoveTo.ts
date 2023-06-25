import CoordCommand from "./CoordCommand";

export default class CommandMoveTo extends CoordCommand
{
  public do( ctx: CanvasRenderingContext2D )
  {
    ctx.moveTo( this.coord.x, this.coord.y )
  }
}