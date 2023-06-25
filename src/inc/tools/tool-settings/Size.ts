import Setting from "./Setting"
import tSettingCommandGetter from "./tSettingCommandGetter"

export default class Size extends Setting<number>
{
  public constructor(
    label: string,
    protected readonly commandGetter: tSettingCommandGetter<number>,
    protected readonly from = 1,
    protected readonly to = 10
  )
  {
    super( label, commandGetter )
  }

  public get options()
  {
    const options = []

    for (let i = this.from; i <= this.to; i++)
    {
      options.push({
        label: String( i ),
        value: i,
      })
    }

    return options
  }
}