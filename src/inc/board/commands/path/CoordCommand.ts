import tCoord from "@/inc/board/tCoord";
import Command from "../Command";

export default abstract class CoordCommand extends Command
{
  public constructor(
    public readonly coord: tCoord
  )
  {
    super()
  }
}