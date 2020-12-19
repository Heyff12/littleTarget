import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Picker } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { fetchTarget, fetchAllTarget, saveTarget } from '../../actions/target'
import EmptyTarget from '../../components/emptyTarget'

import './index.less'

const quarterValue = ['一','二','三','四']

type PageStateProps = {
  targets: Target.TargetItem[]
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

interface Index {
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
class Index extends Component {
  state = {
    selector: [2020,2021,2022],
    selectorChecked: 2020
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount () {
    this.setYearRange()
    this.props.fetchAllTarget()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  setYearRange = () => {
    const currentYear = new Date().getFullYear()
    const yearRange:number[] = []
    for(let i = 0;i<10;i++){
      yearRange.push(currentYear+i)
    }
    this.setState({
      selector:yearRange,
      selectorChecked: currentYear
    })
  }


  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  renderEmpty = (data:Target.TargetOperatePrams) => {
    return (<EmptyTarget paramData={data} />)
  }

  renderTarget = () => {
    const { targets } = this.props

    const endDom = targets.map((target,index) => {
      const { study,career,life} = target
      return (
        <View className="header">
            <View className="quarter">{`第${quarterValue[index]}季度`}</View>
            <View className="categoryContainer">
              <View className="category">
                {
                  study.length ? (
                   study.map(item=>item)
                  ) : this.renderEmpty({quarter:index,category:Target.Category.study})
                }
              </View>
              <View className="category">
                {
                  career.length ? (
                    career.map(item=>item)
                  ) : this.renderEmpty({quarter:index,category:Target.Category.career})
                }
              </View>
              <View className="category">
                {
                  life.length ? (
                    life.map(item=>item)
                  ) : this.renderEmpty({quarter:index,category:Target.Category.life})
                }
              </View>
            </View>
          </View>
      )
    })

    return endDom
  }

  render () {
    const { selector,selectorChecked } = this.state
    return (
      <View className='index'>
        <View className="fixedTop">
          <View></View>
          <View className="middle">
            <Picker mode='selector' range={selector} onChange={this.onChange}>
              <View className='picker'>
                {selectorChecked}
              </View>
            </Picker>
          </View>
          <View>
            <AtButton type='primary' size='small'>导出图片</AtButton>
          </View>
        </View>
        <View className="mainSection">
          <View className="headerSection">
            <View className="header">
              <View className="quarter"></View>
              <View className="categoryContainer">
                <View className="category">学习</View>
                <View className="category">事业</View>
                <View className="category">生活</View>
              </View>
            </View>
          </View>
          <View className="container">
            {this.renderTarget()}
          </View>
        </View>
      </View>
    )
  }
}

export default Index

