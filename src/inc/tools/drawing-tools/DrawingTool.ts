import PathCommandsSet from "../../drawing/commands/path/PathCommandsSet";
import CommandMoveTo from "../../drawing/commands/path/CommandMoveTo";
import tCoord from "../../drawing/tCoord";
import Color from "../tool-settings/Color";
import Size from "../tool-settings/Size";
import Tool from "../Tool";
import CommandStrokeStyle from "@/inc/drawing/commands/path/CommandStrokeStyle";
import CommandLineWidth from "@/inc/drawing/commands/path/CommandLineWidth";
import iCommand from "@/inc/drawing/commands/iCommand";

// todo (future): create TransformerTool
export default abstract class DrawingTool extends Tool
{
  public readonly settings = {
    strokeStlye: new Color( 'Color', selectedColor => new CommandStrokeStyle( selectedColor ) ),
    lineWidth: new Size( 'Size', selectedWidth => new CommandLineWidth( selectedWidth ) ),
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