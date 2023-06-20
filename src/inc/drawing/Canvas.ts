import Command from "./commands/Command"
import tCoord from "./tCoord"

export default class Canvas
{
  public constructor(
    public readonly element: HTMLCanvasElement
  )
  {
    element.width = this.resolution.width
    element.height = this.resolution.height
  }

  protected readonly resolution: Readonly<{
    width: number,
    height: number,
  }> = {
    width: 1360,
    height: 768,
  }

  protected _cssSizeScale?: number

  protected get cssSizeScale()
  {
    if ( ! this._cssSizeScale )
    {
      throw new Error( 'Value is not set yet!' )
    }

    return this._cssSizeScale
  }

  protected set cssSizeScale( value )
  {
    this._cssSizeScale = value

    this.element.style.width = this.resolution.width * value + 'px'
    this.element.style.height = this.resolution.height * value + 'px'
  }

  protected get ctx()
  {
    const ctx = this.element.getContext("2d")

    if ( ! ctx )
    {
      throw new Error( 'Cant get rendering context' )
    }

    return ctx
  }

  public clear()
  {
    this.ctx.clearRect( 0, 0, this.resolution.width, this.resolution.height )
  }

  public draw( command: Command )
  {
    command.do( this.ctx )
  }

  public setCssSize( cssMaxWidth: number, cssMaxHeight: number )
  {
    const
      resolutionRatio = this.resolution.width / this.resolution.height,
      cssAvailableSpaceRatio = cssMaxWidth / cssMaxHeight

    const cssSizeScale =
      resolutionRatio <= cssAvailableSpaceRatio ?
      cssMaxHeight / this.resolution.height :
      cssMaxWidth / this.resolution.width

    this.cssSizeScale = Number( cssSizeScale.toFixed( 2 ) )
  }

  public getCursorRelativeCoord( originalMouseCoord: tCoord ) : tCoord
  {
    return {
      x: ( originalMouseCoord.x - this.element.offsetLeft ) * this.cssSizeScale,
      y: ( originalMouseCoord.y - this.element.offsetTop ) * this.cssSizeScale,
    }
  }
}