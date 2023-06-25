import iCommand from "./iCommand";

export default class CommandsSet implements iCommand
{
  public constructor(
    public readonly commands: iCommand[]
  )
  {}

  public do( ctx: CanvasRenderingContext2D )
  {
    this.commands.forEach( command => command.do )
  }
}