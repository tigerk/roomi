export default {
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/room/index',
    'pages/contract/index',
    'pages/approval/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'Homi 管理端',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#8a8f99',
    selectedColor: '#1f6feb',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '工作台'
      },
      {
        pagePath: 'pages/room/index',
        text: '房源'
      },
      {
        pagePath: 'pages/contract/index',
        text: '合同'
      },
      {
        pagePath: 'pages/approval/index',
        text: '审批'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的'
      }
    ]
  }
}
