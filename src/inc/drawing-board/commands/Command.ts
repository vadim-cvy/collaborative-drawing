import iCommand from "./iCommand";

export default abstract class implements iCommand
{
  public abstract do( ctx: CanvasRenderingContext2D ) : void
}