import Setting from "./Setting"
import tSettingCommandGetter from "./tSettingCommandGetter"

export default class Color extends Setting<string>
{
  public constructor(
    label: string,
    protected readonly commandGetter: tSettingCommandGetter<string>,
    protected readonly hasTrasparent = false
  )
  {
    super( label, commandGetter )
  }

  public get options()
  {
    const colors = [
      '#000',
      'red',
      'yellow',
      '#fff',
    ]

    if ( this.hasTrasparent )
    {
      colors.push( 'transparent' )
    }

    return colors.map( color => ({
      label: color,
      value: color,
    }))
  }
}