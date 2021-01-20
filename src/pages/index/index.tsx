import React, { Component } from 'react'
import Taro,{NodesRef} from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Picker,Canvas } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { fetchTarget, fetchAllTarget, saveTarget } from '../../actions/target'
import {CategoryEnum,quarterValue} from '../../constants/actions'
import EmptyTarget from '../../components/emptyTarget'
import {INITIAL_STATE} from '../../reducers/target'
import {draw} from './draw'

import './index.less'

type PageStateProps = {
  targets: Target.TargetItem[]
}

type PageDispatchProps = {
  fetchTarget: (payload:Target.TargetOperatePrams) => string[]
  fetchAllTarget: () => Target.TargetItem[]
  saveTarget: (payload:Target.TargetOperatePrams) => string[]
}

type PageOwnProps = {}

type PageState = {
  selector:number[],
  selectorChecked:number,
  targets: Target.TargetItem[],
  imagePath: string,
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
  // tableImage = Taro.createRef()
  tableImage = React.createRef()
  // tableImage = (node) => this.tableImage = node

  canvas:any

  state = {
    selector: [2020,2021,2022],
    selectorChecked: 2020,
    targets:[],
    imagePath: ""
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount () {
    this.setYearRange()
    this.getData()
  }

  getData = () => {
    const data = this.props.fetchAllTarget() || INITIAL_STATE
    this.setState({
      targets: data
    })
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.getData()
  }

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

  gotoToAdd = (data:Target.TargetOperatePrams) => () =>{
    const { quarter, category} = data
    Taro.navigateTo({
      url: `/pages/addtarget/index?quarter=${quarter}&category=${category}`
    })
  }

  gotoCanvas = () =>{
    Taro.navigateTo({
      url: `/pages/canvas/index`
    })
  }


  exportImage = () => {
    Taro.canvasToTempFilePath({
      canvasId: '#canvas',
      canvas: this.canvas,
      success(res) {
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(saveRes) {
            console.log(saveRes, 'saveRes')
          }
        })
      },
      fail(fail) {
        console.log(fail)
      }
    })
  }

  renderEmpty = () => {
    return (<EmptyTarget />)
  }

  renderList = (data:string[]) => {
    const domEnd = data.map(item=>{
      return (
      <View>{item}</View>
      )
    })
    return domEnd
  }

  renderTarget = () => {
    const { targets } = this.state

    const endDom = targets.map((target,index) => {
      const { study,career,life} = target
      return (
        <View className="header">
            <View className="quarter">{`第${quarterValue[index]}季度`}</View>
            <View className="categoryContainer">
              <View className="category" onClick={this.gotoToAdd({quarter:index,category:CategoryEnum.study})}>
                {
                  study.length ? (
                   this.renderList(study)
                  ) : this.renderEmpty()
                }
              </View>
              <View className="category" onClick={this.gotoToAdd({quarter:index,category:CategoryEnum.career})}>
                {
                  career.length ? (
                    this.renderList(career)
                  ) : this.renderEmpty()
                }
              </View>
              <View className="category" onClick={this.gotoToAdd({quarter:index,category:CategoryEnum.life})}>
                {
                  life.length ? (
                    this.renderList(life)
                  ) : this.renderEmpty()
                }
              </View>
            </View>
          </View>
      )
    })

    return endDom
  }

  buildImage =()=> {
    const { targets } = this.state
    const query = Taro.createSelectorQuery()
    query.select('#canvas')
      .fields({ node: true, size: true })
      .exec((res: NodesRef)=>{
        console.log(res)
        // Canvas 实例
        const {node,width,height} = res[0]
        this.canvas = node
        const canvasParams = {
          width,height
        }
        draw(node,canvasParams,targets)
        // this.exportImage();
      })
  }

  render () {
    const { selector,selectorChecked} = this.state
    return (
        <View className='index'>
          <View className="fixedTop">
            <View>
              <AtButton type='primary' size='small' onClick={this.gotoCanvas}>测试Canvas</AtButton>
            </View>
            <View className="middle">
              <Picker mode='selector' range={selector} onChange={this.onChange}>
                <View className='picker'>
                  {selectorChecked}
                </View>
              </Picker>
            </View>
            <View>
              <AtButton type='primary' size='small' onClick={this.buildImage}>导出图片</AtButton>
            </View>
          </View>
          <View className="mainSection" ref={this.tableImage}>
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
          <Canvas id='canvas' className='canvas' type='2d' />
        </View>
    )
  }
}

export default Index

