export default abstract class Command
{
  public readonly subCommands: Command[] = []

  public do( ctx: CanvasRenderingContext2D )
  {
    this.subCommands.forEach( subCommand => subCommand.do( ctx ) )
  }
}