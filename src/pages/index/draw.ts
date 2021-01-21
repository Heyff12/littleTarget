import Taro from "@tarojs/taro";
import imgUrl from "../../assets/img/1.jpg";
import { CategoryEnum, quarterValue } from "../../constants/actions";
// const imgUrl =
//   "https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-blue-watercolor-dreamy-fashion-minimalistic-background-image_52710.jpg";

const fontTitleSize = 24;
const fontSize = 18;
const fontTargetSize = 13;
const fontColor = "black";
const targetPosition = {
  [CategoryEnum.study]: 0,
  [CategoryEnum.career]: 1,
  [CategoryEnum.life]: 2,
};

export const draw = (canvas, canvasParams, targets: Target.TargetItem[]) => {
  const { width, height } = canvasParams;
  const ratio = width / height;
  // Canvas 的绘图上下文
  const ctx = canvas.getContext("2d");
  // 设备像素比
  // 这里根据像素比来设置 canvas 大小
  const dpr = Taro.getSystemInfoSync().pixelRatio;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  // 获取图片信息
  Taro.getImageInfo({
    src: imgUrl,
    success: (resImg) => {
      console.log(resImg);
      // 创建一个图片对象--设置背景图
      const img = canvas.createImage();
      const { width: imgWidth, height: imgHeight, path } = resImg;
      let imgW, imgH, imgL, imgT;
      if (imgWidth / imgHeight >= ratio) {
        imgW = (height * imgWidth) / imgHeight;
        imgH = height;
        imgT = 0;
        imgL = -(imgW - width) / 2;
      } else {
        imgW = width;
        imgH = (width * imgHeight) / imgWidth;
        imgT = -(imgH - height) / 2;
        imgL = 0;
      }

      img.src = "../../" + path;
      img.onload = () => {
        // 绘制图像到画布
        ctx.drawImage(img, imgL, imgT, imgW, imgH);
        // 解决下载来的图片是黑色背景的问题,设置透明层
        const radialgradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          width / 2,
          width / 2,
          height / 2,
          height / 2
        );
        radialgradient.addColorStop(0, "rgba(255,255,255,0.5)");
        radialgradient.addColorStop(0.4, "rgba(255,255,255,0.4)");
        radialgradient.addColorStop(0.6, "rgba(255,255,255,0.2)");
        radialgradient.addColorStop(1, "rgba(255,255,255,0.1)");
        ctx.fillStyle = radialgradient;
        ctx.fillRect(0, 0, width, height);
        drawTable(ctx, canvasParams, targets);
      };
    },
    fail(fail) {
      console.log(fail);
    },
  });
};

const verticalText = (ctx, words, top, fontHeight) => {
  ctx.font = `${fontSize}px Times New Roman`;
  ctx.fillStyle = fontColor;
  words.split("").forEach((word, index) => {
    ctx.fillText(word, 10, top + fontHeight * index);
  });
};

// todo  优化算法，可以容纳更多行
const targetText = (ctx, targets, left, top, lineWidth) => {
  const fontHeight = fontTargetSize + 8;
  let currentTop = top - fontHeight;
  ctx.font = `${fontTargetSize}px Times New Roman`;
  ctx.fillStyle = fontColor;
  targets.forEach((target, index) => {
    const text = `· ${target}`;
    const titleText = ctx.measureText(text);
    const titleWidth = titleText.width;
    if (titleWidth <= lineWidth) {
      currentTop += fontHeight;
      ctx.fillText(text, left, currentTop);
      return;
    }
    // console.log("titleText---", titleText);
    // console.log("lineWidth---titleWidth", lineWidth, titleWidth);
    const len = text.length;
    let firstlineIndex = Math.floor(len / 2);
    for (let i = firstlineIndex; i < len; i++) {
      const charStr = text.slice(0, i);
      const charStrText = ctx.measureText(charStr);
      const charStrWidth = charStrText.width;
      if (charStrWidth <= lineWidth) {
        firstlineIndex = i;
      } else {
        break;
      }
    }
    currentTop += fontHeight;
    ctx.fillText(text.slice(0, firstlineIndex), left, currentTop);
    currentTop += fontHeight;
    ctx.fillText(text.slice(firstlineIndex), left, currentTop);
  });
};

const drawTable = (ctx, canvasParams, targets: Target.TargetItem[]) => {
  const { width, height } = canvasParams;
  const midWidth = width * 0.5;
  const leftHeadWidth = 60;
  const topHeadWidth = (width - leftHeadWidth) / 3;
  // 绘制标题
  const title = "2021小目标";
  const titleText = ctx.measureText(title);
  const titleWidth = titleText.width;
  ctx.font = `${fontTitleSize}px Times New Roman`;
  ctx.fillStyle = fontColor;
  ctx.textAlian = "center";
  ctx.fillText(title, midWidth - titleWidth, height * 0.05);

  // 绘制top head
  ctx.font = `${fontSize}px Times New Roman`;
  ctx.fillStyle = fontColor;
  ctx.fillText("学习", leftHeadWidth, height * 0.12);
  ctx.fillText("事业", leftHeadWidth + topHeadWidth, height * 0.12);
  ctx.fillText("生活", leftHeadWidth + topHeadWidth * 2, height * 0.12);

  // 绘制left head
  const fontHeight = fontSize + 5;
  quarterValue.forEach((number, index) => {
    const title = `第${number}季度`;
    verticalText(ctx, title, height * 0.2 * (index + 1), fontHeight);
  });

  // 绘制目标内容
  targets.forEach((target, index) => {
    const keys = Object.keys(target);
    keys.forEach((key) => {
      const left = leftHeadWidth + topHeadWidth * targetPosition[key];
      const top = height * 0.2 * (index + 1);
      targetText(ctx, target[key], left, top, topHeadWidth - 7);
    });
  });
};
