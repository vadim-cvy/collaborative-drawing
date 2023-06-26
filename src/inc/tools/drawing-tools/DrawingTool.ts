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
  protected static readonly sharedSettings = {
    strokeStlye: new Color( 'Color', selectedColor => new CommandStrokeStyle( selectedColor ) ),

    lineWidth: new Size( 'Size', selectedWidth => new CommandLineWidth( selectedWidth ),
      1, 10 ),
  }

  public get settings()
  {
    return DrawingTool.sharedSettings
  }

  protected createCommandsSetInstance()
  {
    return new PathCommandsSet()
  }

  protected updateCommandsOnDrawingStart( cursorPosition: tCoord )
  {
    this.commands.push( new CommandMoveTo( cursorPosition ) )
  }
}