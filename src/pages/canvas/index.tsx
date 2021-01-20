import React, { Component } from 'react'
import Taro,{NodesRef} from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Canvas } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { fetchTarget, fetchAllTarget, saveTarget } from '../../actions/target'
import './index.less'
import imgUrl from '../../assets/img/book.jpg'


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
    imagePath: ""
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

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

  buildImage =()=> {
    // 创建一个选择器对象
    const query = Taro.createSelectorQuery()
    // 选择当前页面下第一个 #canvas
    // 返回 NodesRef 用于获取 WXML 节点信息的对象
    query.select('#canvas')
      // 获取节点的相关信息。需要获取的字段在fields中指定。返回值是 nodesRef 对应的 selectorQuery
      .fields({ node: true, size: true })
      // 执行所有的请求。请求结果按请求次序构成数组，在callback的第一个参数中返回
      .exec(this.draw.bind(this))
  }

  draw (res: NodesRef) {
    console.log(res)
    // Canvas 实例
    const canvas = res[0].node
    this.canvas = canvas
    // Canvas 的绘图上下文
    const ctx = canvas.getContext('2d')

    // 设备像素比
    // 这里根据像素比来设置 canvas 大小
    const dpr = Taro.getSystemInfoSync().pixelRatio
    canvas.width = res[0].width * dpr
    canvas.height = res[0].height * dpr
    ctx.scale(dpr, dpr)

   // 解决下载来的图片是黑色背景的问题
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0, 0, res[0].width, res[0].height)

    ctx.fillRect(125, 25, 100, 100); // 画实心矩形
    ctx.clearRect(145, 45, 60, 60); // 清除矩形区域
    ctx.strokeRect(150, 50, 50, 50); // 画矩形线框

    ctx.fillStyle = 'green'
    ctx.beginPath();
    ctx.moveTo(5, 20);
    ctx.lineTo(20, 45);
    ctx.lineTo(20, 5);
    ctx.fill();

    ctx.strokeStyle = 'orange'
    ctx.lineWidth = 2
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);   // 口(顺时针)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左眼
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // 右眼
    ctx.closePath()
    ctx.stroke();

    // 画背景
    ctx.fillStyle = '#FD0';
    ctx.fillRect(264,0,75,75);
    ctx.fillStyle = '#6C0';
    ctx.fillRect(339,0,75,75);
    ctx.fillStyle = '#09F';
    ctx.fillRect(264,75,75,75);
    ctx.fillStyle = '#F30';
    ctx.fillRect(339,75,75,75);
    ctx.fillStyle = '#FFF';

    // 设置透明度值
    ctx.globalAlpha = 0.2;

    // 画半透明圆
    for (var i=0;i<7;i++){
        ctx.beginPath();
        ctx.arc(339,75,10+10*i,0,Math.PI*2,true);
        ctx.fill();
    }

    // 获取图片信息
    Taro.getImageInfo({
      src: imgUrl,
      success: resImg => {
        // 创建一个图片对象
        const img = canvas.createImage();

        img.src = '../../' + resImg.path
        img.onload = () => {
          // 绘制图像到画布
          ctx.drawImage(img, 0, 0, 300, 150)
          // 绘制文本
    ctx.font = "16px Times New Roman";
    ctx.fillStyle = 'pink'
    ctx.fillText('英语直播', 20, 16)
        }


      },
      fail(fail) {
        console.log(fail)
      }
    })
    ctx.globalAlpha = 1;
    // 绘制文本
    ctx.font = "16px Times New Roman";
    ctx.fillStyle = 'pink'
    ctx.fillText('英语直播', 20, 16)

    // // 同上面的功能
    const img = canvas.createImage();

    img.src = imgUrl
    img.onload = () => {
      ctx.drawImage(img, 20, 200, 70, 70)
    }

    // 绘制文本
    ctx.font = "14px Times New Roman";
    ctx.fillStyle = 'blue'
    ctx.fillText('@Owen', 20, 40)

    // 绘制文本
    ctx.font = '12px sans-serif'
    ctx.fillStyle = 'black'
    ctx.fillText('给你推荐一堂好课', 20, 60)

    // 绘制文本
    ctx.font = '12px sans-serif'
    ctx.fillStyle = 'black'
    ctx.fillText('长按识别小程序查看课程', 20, 80)

    // 绘制文本
    ctx.font = '10px sans-serif'
    ctx.fillStyle = 'gary'
    ctx.fillText('来自：奋翔升学服务中心', 20, 100)
  }
// todo delete
  onImgOK = (path) => {
    this.setState({imagePath:path})
  }

  saveImage = () => {
    const {imagePath} = this.state
    if (imagePath) {
      Taro.saveImageToPhotosAlbum({
        filePath: imagePath
      });
    }
  }

  render () {
    return (
        <View className='canvasBody'>
          <View>
            <AtButton className='btn' type='primary' size='small' onClick={this.buildImage}>绘制canvas</AtButton>
            <AtButton className='btn'  type='primary' size='small' onClick={this.exportImage}>导出图片</AtButton>
          </View>
          {/* <wxml-to-canvas class="widget"></wxml-to-canvas> */}
          {/* {/* <Painter
            customStyle='margin-left:40rpx'
            palette={template}
            onImgOK={this.onImgOK} /> */}
          <Canvas id='canvas' className='canvas' type='2d' />
        </View>
    )
  }
}

export default Index

