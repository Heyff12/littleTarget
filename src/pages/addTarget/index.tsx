import Taro, { getCurrentInstance } from '@tarojs/taro'
import React,{Component} from 'react'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtButton,AtIcon } from 'taro-ui'
import { fetchTarget, fetchAllTarget, saveTarget,deleteTarget } from '../../actions/target'
import {quarterValue,categoryValue,CategoryEnum} from '../../constants/actions'

import './index.less'



type PageStateProps = {
  targets:Target.TargetItem[]
}

type PageDispatchProps = {
  fetchTarget: (payload:Target.TargetOperatePrams) => string[]
  fetchAllTarget: () => Target.TargetItem[]
  saveTarget: (payload:Target.TargetOperatePrams) => string[]
  deleteTarget: (payload:Target.TargetOperatePrams) => boolean
}

type PageOwnProps = {}

type PageState = {
  operateData: Target.TargetOperatePrams,
  currentTarget:string,
  listData: string[]
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
  },
  deleteTarget(payload) {
    dispatch(deleteTarget(payload))
  }
}))
class AddTarget extends Component {
  // constructor(props){
  //   super(props)
  // }
  state = {
    operateData:{} as Target.TargetOperatePrams,
    currentTarget:'',
    listData:[] as string[]
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.getCurrentInfo()
  }

  componentDidHide () { }

  getCurrentInfo = () => {
    const {quarter=0,category=CategoryEnum.study} = getCurrentInstance().router ? getCurrentInstance().router.params : {}
    console.log(quarter,category)

    this.props.fetchTarget({quarter:+quarter,category})
    this.setState({
      operateData:{quarter,category}
    })
    this.getList()
  }

  getList = () => {
    const {quarter,category} = this.state.operateData
    const {targets} = this.props
    targets[quarter] = targets[quarter] || {};
    targets[quarter][category] = targets[quarter][category] || [];
    const listData = targets[quarter][category] || []
    this.setState({
      listData
    })
  }

  onSubmit  = () => {
    const {currentTarget,operateData:{quarter,category}} = this.state
    this.props.saveTarget({quarter,category,data:currentTarget})
    this.getList()
    this.setState({
      currentTarget:''
    })
  }

  handleChange(value)  {
    this.setState({
      currentTarget:value
    })
  }

  noInput = () => {
    return this.state.listData.length>=3
  }

  handleDelete = (index) => () => {
    console.log(index)
    const {operateData:{quarter,category}} = this.state
    this.props.deleteTarget({quarter,category,index})
    this.getList()
  }

  renderList = () => {
    const {listData = []} = this.state
    if(!listData.length){
      return null
    }
    const domList = this.state.listData.map((item,index)=>{
      return (
      <View className="list">
        <View className="text">{item}</View>
        <AtIcon className="del" value="trash" size="14" onClick={this.handleDelete(index)}></AtIcon>
      </View>
      )
    })
    return domList
  }

  render () {
    const {quarter,category} = this.state.operateData
    return (
      <View className='addTarget'>
        <View className="header">
          <View>第{quarterValue[quarter]}季度·{categoryValue[category]}</View>
        </View>
        <View className="mainSection">
          <AtForm>
            <AtInput
              name='value'
              title=''
              type='text'
              placeholder='请输入一个小目标'
              value={this.state.currentTarget}
              onChange={this.handleChange.bind(this)}
              disabled={this.noInput()}
            />
            <View className="btn">
              <AtButton type='primary' onClick={this.onSubmit} disabled={this.noInput()}>添加</AtButton>
            </View>
          </AtForm>
          <View className="targetList">
            {this.renderList()}
          </View>
        </View>
      </View>
    )
  }
}

export default AddTarget

