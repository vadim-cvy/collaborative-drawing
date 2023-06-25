import tCoord from "@/inc/drawing-board/tCoord";
import CoordCommand from "./CoordCommand";

export default class CommandQuadraticCurveTo extends CoordCommand
{
  public constructor(
    protected readonly prevCoord: tCoord,
    coord: tCoord
  )
  {
    super( coord )
  }

  public do( ctx: CanvasRenderingContext2D )
  {
    ctx.quadraticCurveTo( this.prevCoord.x, this.prevCoord.y,
      // "( prev coord + curCoord ) / 2" makes the curve smoother
      (this.prevCoord.x + this.coord.x) / 2,
      (this.prevCoord.y + this.coord.y) / 2
    )
  }
}