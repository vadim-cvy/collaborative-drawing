import tCoord from "@/inc/drawing/tCoord";
import PathSubCommand from "./PathSubCommand";

export default class PathSubCommandLineTo extends PathSubCommand
{
  public constructor(
    protected readonly coord: tCoord
  )
  {
    super()
  }

  public do( ctx: CanvasRenderingContext2D )
  {
    ctx.lineTo( this.coord.x, this.coord.y )
  }
}