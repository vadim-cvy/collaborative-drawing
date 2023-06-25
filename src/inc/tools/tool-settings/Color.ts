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
    const options = [
      {
        label: 'Black',
        value: '#000',
      },
      {
        label: 'White',
        value: '#000',
      },
    ]

    if ( this.hasTrasparent )
    {
      options.push({
        label: 'Transparent',
        value: 'transparent',
      })
    }

    return options
  }
}