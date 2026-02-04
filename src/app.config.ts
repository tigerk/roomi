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
    selectedColor: '#3478F6',
    backgroundColor: '#f6f7f9',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '工作台',
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/home-active.png'
      },
      {
        pagePath: 'pages/room/index',
        text: '房源',
        iconPath: 'assets/tabbar/room.png',
        selectedIconPath: 'assets/tabbar/room-active.png'
      },
      {
        pagePath: 'pages/contract/index',
        text: '合同',
        iconPath: 'assets/tabbar/contract.png',
        selectedIconPath: 'assets/tabbar/contract-active.png'
      },
      {
        pagePath: 'pages/approval/index',
        text: '审批',
        iconPath: 'assets/tabbar/approval.png',
        selectedIconPath: 'assets/tabbar/approval-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/tabbar/profile.png',
        selectedIconPath: 'assets/tabbar/profile-active.png'
      }
    ]
  }
}
