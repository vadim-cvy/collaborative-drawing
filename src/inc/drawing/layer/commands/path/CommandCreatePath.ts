import Command from "../Command";

export default class CreatePathCommand extends Command
{
  public do( ctx: CanvasRenderingContext2D )
  {
    ctx.beginPath()

    this.subCommands.forEach( subCommand => subCommand.do( ctx ) )

    ctx.stroke()
  }
}