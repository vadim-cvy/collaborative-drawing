import PathCoordSubCommand from "./PathCoordSubCommand";

export default class PathSubCommandLineTo extends PathCoordSubCommand
{
  public do( ctx: CanvasRenderingContext2D )
  {
    ctx.lineTo( this.coord.x, this.coord.y )
  }
}