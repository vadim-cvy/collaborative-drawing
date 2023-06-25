import PathCommandsSet from "../../board/commands/path/PathCommandsSet";
import CommandMoveTo from "../../board/commands/path/CommandMoveTo";
import tCoord from "../../board/tCoord";
import Color from "../tool-settings/Color";
import Size from "../tool-settings/Size";
import Tool from "../Tool";
import CommandStrokeStyle from "@/inc/board/commands/path/CommandStrokeStyle";
import CommandLineWidth from "@/inc/board/commands/path/CommandLineWidth";
import iCommand from "@/inc/board/commands/iCommand";

// todo (future): create TransformerTool
export default abstract class DrawingTool extends Tool
{
  public readonly settings = {
    strokeStlye: new Color( 'Color', selectedColor => new CommandStrokeStyle( selectedColor ) ),

    lineWidth: new Size( 'Size', selectedWidth => new CommandLineWidth( selectedWidth ),
      1, 10 ),
  }

  protected createCommandsSet( commands: iCommand[] )
  {
    return new PathCommandsSet( commands )
  }

  protected updateCommandsOnDrawingStart( cursorPosition: tCoord )
  {
    this.commands.push( new CommandMoveTo( cursorPosition ) )
  }
}