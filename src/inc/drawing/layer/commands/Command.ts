export default abstract class Command
{
  public constructor(
    protected readonly subCommands: Command[] = []
  ) {}

  public abstract do( ctx: CanvasRenderingContext2D ) : void
}