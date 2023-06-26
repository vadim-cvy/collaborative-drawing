import CommandsSet from "./commands/CommandsSet"
import tCoord from "./tCoord"

export default class Canvas
{
  public constructor(
    public readonly element: HTMLCanvasElement
  )
  {
    element.width = this.resolution.width
    element.height = this.resolution.height

    this.syncCssSize()

    this.listenParentElementResize()
  }

  protected get parentElement()
  {
    const parentElement = this.element.parentElement

    if ( ! parentElement )
    {
      throw new Error( 'Can\'t get parent element' )
    }

    return parentElement
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
      const
        cssMaxWidth = this.parentElement.offsetWidth,
        cssMaxHeight = this.parentElement.offsetHeight

      const
        resolutionRatio = this.resolution.width / this.resolution.height,
        cssAvailableSpaceRatio = cssMaxWidth / cssMaxHeight

      const cssSizeScale =
        resolutionRatio <= cssAvailableSpaceRatio ?
        cssMaxHeight / this.resolution.height :
        cssMaxWidth / this.resolution.width

      this._cssSizeScale = Number( cssSizeScale.toFixed( 10 ) )
    }

    return this._cssSizeScale
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

  public draw( commands: CommandsSet )
  {
    commands.do( this.ctx )
  }

  protected listenParentElementResize()
  {
    const observer = new ResizeObserver( () => this.syncCssSize() )

    observer.observe( this.parentElement )
  }

  protected syncCssSize()
  {
    this.resetCssSizeScale()

    this.element.style.width = this.resolution.width * this.cssSizeScale + 'px'
    this.element.style.height = this.resolution.height * this.cssSizeScale + 'px'
  }

  protected resetCssSizeScale()
  {
    this._cssSizeScale = undefined
  }

  public getCursorRelativeCoord( originalMouseCoord: tCoord ) : tCoord
  {
    const rect = this.element.getBoundingClientRect()

    return {
      x: ( originalMouseCoord.x - rect.left ) / this.cssSizeScale,
      y: ( originalMouseCoord.y - rect.top ) / this.cssSizeScale,
    }
  }
}