import iCommand from "@/inc/drawing-board/commands/iCommand";

type tSettingCommandGetter<T> = ( selectedOptionValue: T ) => iCommand

export default tSettingCommandGetter