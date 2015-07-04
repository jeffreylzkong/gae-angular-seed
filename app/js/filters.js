angular.module('myApp.filters', [])

.filter('translate', function(){
  // translation table - Make Sure key is all in LOWER CASE
  var translation = {
    home: {
      zhs: '首页',
      zht: '首頁'
    },
    services: {
      zhs: '服务',
      zht: '服務項目'
    },
    contact: {
      zhs: '联系我们',
      zht: '聯繫我們'
    },
    'contact us': {
      zhs: '联系我们',
      zht: '聯繫我們'
    },
    projects: {
      zhs: '项目',
      zht: '工程項目'
    },
    'our services': {
      zhs: '我们的服务',
      zht: '服務項目'
    },
    commercial: {
      zhs: '商业',
      zht: '商業'
    },
    residential: {
      zhs: '民居',
      zht: '民居'
    },
    'project summary': {
      zhs: '精选项目',
      zht: '精選工程'
    },
    sun: {
      zhs: '周日',
      zht: '禮拜日'
    },
    mon: {
      zhs: '周一',
      zht: '禮拜一'
    },
    tue: {
      zhs: '周二',
      zht: '禮拜二'
    },
    wed: {
      zhs: '周三',
      zht: '禮拜三'
    },
    thr: {
      zhs: '周四',
      zht: '禮拜四'
    },
    fri: {
      zhs: '周五',
      zht: '禮拜五'
    },
    sat: {
      zhs: '周六',
      zht: '禮拜六'
    },
    address: {
      zhs: '地址',
      zht: '地址'
    },
    email: {
      zhs: '电子邮件',
      zht: '電子郵件'
    },
    fax: {
      zhs: '传真',
      zht: '傳真'
    },
    'office hours': {
      zhs: '办公时间',
      zht: '辦公時間'
    },
    'emergence service': {
      zhs: '紧急服务',
      zht: '緊急服務'
    },
    'free estimate': {
      zhs: '免费评估',
      zht: '免費評估'
    },
    'more detail': {
      zhs: '更多内容',
      zht: '更多內容'
    },
    'all services': {
      zhs: '所有服务',
      zht: '所有服務'
    },
    'featured services': {
      zhs: '精选服务',
      zht: '精選服務'
    },
    'servicehighlight_detail': {
      en: 'We are roofing contractor who is offer a total roofing, reroofing, waterproofing and repair service on all roof system, we are willing to take up any challenges to get the job done right. We work on commercial, and residential projects, satisfying the needs of owners and managers alike.',
      zhs: '承接各种楼宇房屋及商业屋顶工程，包括屋顶设计施工、翻新、维修、防水等各式工程。我们用最专业的经验和技术，以人为本，为您打造最可靠放心、坚固耐用的各类屋顶。',
      zht: '承接各種樓宇房屋及商業屋頂工程，包括屋頂設計施工、翻新、維修、防水等各式工程。我們用最專業的經驗和技術，以人為本，為您打造最可靠放心、堅固耐用的各類屋頂。'
    },
    'all projects': {
      zhs: '更多工程',
      zht: '更多工程'
    },
    'project type': {
      zhs: '工程类型',
      zht: '工程類型'
    },
    're-roofing': {
      zhs: '屋顶重修',
      zht: '屋頂重修'
    },
    'new roofing': {
      zhs: '新装屋顶',
      zht: '新裝屋頂'
    },
    'repair and maintenance': {
      zhs: '维修维护',
      zht: '維修維護'
    },
    'existing and required system': {
      zhs: '您的屋顶类型',
      zht: '您的屋頂類型'
    },
    'sloped roofing': {
      zhs: '斜面屋顶',
      zht: '斜面屋頂'
    },
    'flat roofing': {
      zhs: '平面屋顶',
      zht: '平面屋頂'
    },
    'name': {
      zhs: '称呼',
      zht: '稱呼'
    },
    'phone number': {
      zhs: '联系电话',
      zht: '聯繫電話'
    },
    'phone': {
      zhs: '联系电话',
      zht: '聯繫電話'
    },
    'company name': {
      zhs: '公司名称',
      zht: '公司名稱'
    },
    'building name': {
      zhs: '楼宇名称',
      zht: '樓宇名稱'
    },
    'city': {
      zhs: '所在城市',
      zht: '所在城市'
    },
    'any further information': {
      zhs: '附加信息',
      zht: '附加信息'
    },
    'contactus_line1': {
      en: "We'd love to answer any questions you may have. Please feel free to call us, send us an email, or meet us for coffee.",
      zhs: '如果您有任何关于屋顶修建的问题，请随时联系我们。',
      zht: '如果您有任何關於屋頂修建的問題，請隨時聯繫我們。'
    },
    'contactus_line2': {
      en: 'We look forward to working with you.',
      zhs: '欢迎来电、电邮或亲临参观',
      zht: '歡迎來電、電郵或親臨參觀'
    }
  };
	return function(input, scope) {

		return input[scope.language] ||
            typeof(input) === 'string' &&
            translation[input.toLowerCase()] && 
            translation[input.toLowerCase()][scope.language] ||
            input.en ||
            input;
	};
});
