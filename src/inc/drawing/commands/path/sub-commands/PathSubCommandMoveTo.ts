import PathCoordSubCommand from "./PathCoordSubCommand";

export default class PathSubCommandMoveTo extends PathCoordSubCommand
{
  public do( ctx: CanvasRenderingContext2D )
  {
    ctx.moveTo( this.coord.x, this.coord.y )
  }
}