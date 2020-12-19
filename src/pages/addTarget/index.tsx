import Taro,{ getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'
import { fetchTarget, fetchAllTarget, saveTarget } from '../../actions/target'
import {CategoryEnum,quarterValue,categoryValue} from '../../constants/actions'

import './index.less'



type PageStateProps = {
  operateData: Target.TargetOperatePrams
}

type PageDispatchProps = {
  fetchTarget: () => void
  fetchAllTarget: () => void
  saveTarget: () => any
}

type PageOwnProps = {}

type PageState = {
  selector:number[],
  selectorChecked:number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps & PageState

interface AddTarget {
  props: IProps;
}

@connect(({ targets }) => ({
  targets
}), (dispatch) => ({
  fetchTarget (payload) {
    dispatch(fetchTarget(payload))
  },
  fetchAllTarget () {
    dispatch(fetchAllTarget())
  },
  saveTarget (payload) {
    dispatch(saveTarget(payload))
  }
}))
class AddTarget extends Component {
  state = {
    operateData:{}
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount () {
    const {quarter,category} = getCurrentInstance().router.params
    console.log(quarter,category)
    this.setState({
      operateData:{quarter,category}
    })
    this.props.fetchTarget()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {quarter,category} = this.state.operateData
    return (
      <View className='addTarget'>
        <View className="header">
          <View>第{quarterValue[quarter]}季度·{categoryValue[category]}</View>
        </View>
        <View className="mainSection">
        </View>
      </View>
    )
  }
}

export default AddTarget

