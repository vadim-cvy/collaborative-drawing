import tCoord from "@/inc/board/tCoord";
import CoordCommand from "./CoordCommand";

export default class CommandArc extends CoordCommand
{
  public constructor(
    coord: tCoord,
    protected readonly radius?: number,
    protected readonly startAngle: number = 0,
    protected readonly endAngle: number = Math.PI * 2,
  )
  {
    super( coord )
  }

  public do( ctx: CanvasRenderingContext2D )
  {
    const radius = this.radius ? this.radius : ctx.lineWidth

    ctx.arc( this.coord.x, this.coord.y, radius, this.startAngle, this.endAngle )
  }
}