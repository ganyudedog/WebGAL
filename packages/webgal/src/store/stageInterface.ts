import { ISentence } from '@/Core/controller/scene/sceneInterface';

/**
 * 游戏内变量
 * @interface IGameVar
 */
export interface IGameVar {
  [propName: string]: string | boolean | number | Array<string | boolean | number>;
}

export interface ISetGameVar {
  key: string;
  value: string | boolean | number;
}

/**
 * 单个选项
 * @interface IChooseItem
 */
export interface IChooseItem {
  key: string; // 选项名称
  targetScene: string; // 选项target
  isSubScene: boolean; // 是否是子场景调用
}

export interface ITransform {
  alpha: number;
  scale: {
    x: number;
    y: number;
  };
  // pivot: {
  //   x: number;
  //   y: number;
  // };
  position: {
    x: number;
    y: number;
  };
  rotation: number;
  blur: number;
  brightness: number;
  contrast: number;
  saturation: number;
  gamma: number;
  colorRed: number;
  colorGreen: number;
  colorBlue: number;
  bevel: number;
  bevelThickness: number;
  bevelRotation: number;
  bevelSoftness: number;
  bevelRed: number;
  bevelGreen: number;
  bevelBlue: number;
  bloom: number;
  bloomBrightness: number;
  bloomBlur: number;
  bloomThreshold: number;
  shockwaveFilter: number;
  radiusAlphaFilter: number;
}

/**
 * 基本效果接口
 * @interface IEffect
 */
export interface IEffect {
  target: string; // 作用目标
  transform?: ITransform; // 变换
}

/**
 * 基本变换预设
 */
export const baseTransform: ITransform = {
  alpha: 1,
  scale: {
    x: 1,
    y: 1,
  },
  // pivot: {
  //   x: 0.5,
  //   y: 0.5,
  // },
  position: {
    x: 0,
    y: 0,
  },
  rotation: 0,
  blur: 0,
  brightness: 1,
  contrast: 1,
  saturation: 1,
  gamma: 1,
  colorRed: 255,
  colorGreen: 255,
  colorBlue: 255,
  bevel: 0,
  bevelThickness: 0,
  bevelRotation: 0,
  bevelSoftness: 0,
  bevelRed: 255,
  bevelGreen: 255,
  bevelBlue: 255,
  bloom: 0,
  bloomBrightness: 1,
  bloomBlur: 0,
  bloomThreshold: 0,
  shockwaveFilter: 0,
  radiusAlphaFilter: 0,
};

export interface IFreeFigure {
  basePosition: 'left' | 'center' | 'right';
  name: string;
  key: string;
}

export interface IFigureAssociatedAnimation {
  mouthAnimation: IMouthAnimationFile;
  blinkAnimation: IEyesAnimationFile;
  targetId: string;
  animationFlag: string;
}

export interface IMouthAnimationFile {
  open: string;
  close: string;
  halfOpen: string;
}

export interface IEyesAnimationFile {
  open: string;
  close: string;
}

/**
 * 启动演出接口
 * @interface IRunPerform
 */
export interface IRunPerform {
  id: string;
  isHoldOn: boolean; // 演出类型
  script: ISentence; // 演出脚本
}

export interface ILive2DMotion {
  target: string;
  motion: string;
  overrideBounds?: [number, number, number, number];
}

export interface ILive2DExpression {
  target: string;
  expression: string;
}

export interface IFigureMetadata {
  zIndex?: number;
}

type figureMetaData = Record<string, IFigureMetadata>;

/**
 * @interface IStageState 游戏舞台数据接口
 */
export interface IStageState {
  oldBgName: string; // 旧背景的文件路径
  bgName: string; // 背景文件地址（相对或绝对）
  figName: string; // 立绘_中 文件地址（相对或绝对）
  figNameLeft: string; // 立绘_左 文件地址（相对或绝对）
  figNameRight: string; // 立绘_右 文件地址（相对或绝对）
  // 自由立绘
  freeFigure: Array<IFreeFigure>;
  figureAssociatedAnimation: Array<IFigureAssociatedAnimation>;
  showText: string; // 文字
  showTextSize: number; // 文字
  showName: string; // 人物名
  command: string; // 语句指令
  choose: Array<IChooseItem>; // 选项列表
  vocal: string; // 语音 文件地址（相对或绝对）
  playVocal: string; // 真实播放语音
  vocalVolume: number; // 语音 音量调整（0 - 100）
  bgm: {
    // 背景音乐
    src: string; // 背景音乐 文件地址（相对或绝对）
    enter: number; // 背景音乐 淡入或淡出的毫秒数
    volume: number; // 背景音乐 音量调整（0 - 100）
  };
  uiSe: string; // 用户界面音效 文件地址（相对或绝对）
  miniAvatar: string; // 小头像 文件地址（相对或绝对）
  GameVar: IGameVar; // 游戏内变量
  effects: Array<IEffect>; // 应用的变换
  bgTransform: string;
  bgFilter: string;
  PerformList: Array<IRunPerform>; // 要启动的演出列表
  currentDialogKey: string; // 当前对话的key
  live2dMotion: ILive2DMotion[];
  live2dExpression: ILive2DExpression[];
  // 当前演出的延迟，用于做对话插演出！
  // currentPerformDelay:number
  currentConcatDialogPrev: string;
  // 测试：电影叙事
  enableFilm: string;
  isDisableTextbox: boolean;
  replacedUIlable: Record<string, string>;
  figureMetaData: figureMetaData;
  charactersData: Array<ICharacterData>;
  // 插入的html
  customHtml: Array<{ html: string; _feature?: string }>;
}
// 人物特征
export interface ICharacterData {
  id: number;
  name: string;
  imageUrl: string;
  progress: number;
  total: number;
}

/**
 * @interface ISetStagePayload 设置舞台状态的Action的Payload的数据接口
 */
export interface ISetStagePayload {
  key: keyof IStageState;
  value: any;
}

export interface IStageStore {
  stageState: IStageState;
  setStage: <K extends keyof IStageState>(key: K, value: any) => void;
  getStageState: () => IStageState;
  restoreStage: (newState: IStageState) => void;
}

export type StageStore = IStageStore;
