import Command from "../../drawing/commands/Command";
import CommandCreatePath from "../../drawing/commands/path/CommandCreatePath";
import CommandMoveTo from "../../drawing/commands/path/sub-commands/CommandMoveTo";
import tCoord from "../../drawing/tCoord";
import Color from "../tool-settings/Color";
import Size from "../tool-settings/Size";
import Tool from "../Tool";

// todo (future): create TransformerTool
export default abstract class DrawingTool extends Tool
{
  public readonly settings = {
    strokeStlye: new Color( 'Color' ),
    lineWidth: new Size( 'Size' ),
  }

  protected commands: Command[] = []

  protected createWrapperCommandInstance()
  {
    return new CommandCreatePath()
  }

  protected updateCommandsOnDrawingStart( cursorPosition: tCoord )
  {
    this.commands.push( new CommandMoveTo( cursorPosition ) )
  }
}