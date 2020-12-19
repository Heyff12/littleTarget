import Taro, { memo } from '@tarojs/taro'
import { View } from '@tarojs/components'


import './index.less'

interface InProps {
  paramData: Target.TargetOperatePrams;
}

function EmptyTarget(props: InProps) {


  const toToAdd = ()=>{
    const { quarter, category} = props.paramData
    console.log(quarter,category)
  }


  return (
    <View className="add" onClick={toToAdd}>
      +
    </View>
  )
}

export default memo(EmptyTarget)
