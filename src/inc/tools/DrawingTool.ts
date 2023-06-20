import Command from "../drawing/commands/Command";
import CreatePathCommand from "../drawing/commands/path/CommandCreatePath";
import DrawingBoard from "../drawing/DrawingBoard";
import tCoord from "../drawing/tCoord";
import Color from "./settings/Color";
import Setting from "./settings/Setting";
import Size from "./settings/Size";
import Tool from "./Tool";

// todo (future): create TransformerTool
export default abstract class DrawingTool extends Tool
{
  public constructor( label: string, drawingBoard: DrawingBoard, settings: Setting[] = [] )
  {
    settings = [
      new Color(),
      new Size(),
    ].concat( settings )

    super( label, drawingBoard, settings )
  }

  protected readonly command = new CreatePathCommand()

  protected setInitialSubCommands( cursorPosition: tCoord )
  {
    // todo: pass settings here + move to
  }
}