import Layer from "../Layer"

export default class Canvas
{
  public constructor(
    protected readonly element: HTMLCanvasElement
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

  protected readonly layers: Layer[] = []

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

  public addLayer( layer: Layer )
  {
    this.layers.push( layer )

    layer.render( this.ctx )
  }

  public getLayer( index: number ) : Layer | undefined
  {
    return this.layers[ index ]
  }

  public removeLayer( index: number )
  {
    if ( ! this.getLayer( index ) )
    {
      throw new Error( `Layer i:${index} is not set!` )
    }

    this.layers.splice( index, 1 )

    this.ctx.clearRect( 0, 0, this.resolution.width, this.resolution.height )
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
}