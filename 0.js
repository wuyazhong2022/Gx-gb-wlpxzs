//广西干部网络学院学习助手脚本


// 获取某个控件下的所有子控件
function getAllChildViews(view) {
  var childViews = []
  var children = view.children()
  for (var i = 0; i < children.length; i++) {
    childViews.push(children[i])
    var subChildren = getAllChildViews(children[i])
    childViews = childViews.concat(subChildren)
  }
  return childViews
}



// 视频列表观看视频
var videoCount = 0;

function watchVideo() {
  sleep(3000);
  while (true) {
    // 查找所有className为"android.webkit.WebView"的控件 
    var webViews = className("android.view.View").find();
    // fInfo(webViews); 
    // 遍历所有控件 
    for (var i = 0; i < webViews.length; i++) {
      // 检查控件的text属性是否包含"已学"这两个字 
      if (webViews[i].text().indexOf("已学") != -1) {
        // 点击控件 
        webViews[i].parent().click();
        // 输出"在学习"
        
        className("android.widget.Button").waitFor()
        fInfo("页面加载完成学习中");
        // 调用判断播放完成函数
        isVideoFinished()
        // 返回上一页
        sleep(3000);
        fInfo("返回上一页视频列表");

        // 继续下一个视频播放
        videoCount++;
        fInfo("已经看了" + videoCount + "个视频");
        fClear();
        break;

      } else {

        // 如果没有找到包含"%"的控件，就跳出循环
        if (i == webViews.length - 1) {
          log("返回上一页课程列表");
          back();
          return;

      
        }
      }
    }
  }
}


/**
 * 获取控件的所有子控件
 * @param {Object} view 控件对象
 * @param {boolean} recursively 是否递归获取子控件的子控件，默认为 false
 * @returns 控件的所有子控件组成的数组
 */
function getAllChildViews1(view, recursively) {
  var views = [];
  if (view && view.childCount() > 0) {
    var childCount = view.childCount();
    for (var i = 0; i < childCount; i++) {
      var childView = view.child(i);
      views.push(childView);
      if (recursively && childView) {
        views = views.concat(getAllChildViews1(childView, recursively));
      }
    }
  }
  return views;
}



function isVideoFinished() {
  sleep(3000);
  fClear()


  while (true) {
    var layout = className("android.widget.LinearLayout").findOne(1000);
    var views = getAllChildViews1(layout, true);
    var completed = false;
    for (var i = 0; i < views.length; i++) {
      var view = views[i];
      if (view.text() && view.text().indexOf("学习至100%") > -1) {
        completed = true;

        
        break;

      }
    }
    if (completed) {
      fInfo("视频已播放完成下一个");

      back();
      sleep(3000)
      break;
    } else {
      fInfo("没有完成学习不要离开页面");
      sleep(3000);
      fInfo("正在检测，未完成学习，请勿离开页面");
      sleep(3000);
      if (text("确认").exists()) {
        fInfo("检测到弹窗，点击确认");
        click("确认");
        sleep(1000);
        fClear();


      }
      
      sleep(1000);
      fClear();
    }
    
      
  }
 
    
}

// 主函数
function main() {
  sleep(5000)
  var webView = className("android.webkit.WebView").findOne()
  if (!webView) {
    fInfo("未找到WebView控件")
    exit()
  }
  var childViews = getAllChildViews(webView)
  var courses = ["2023年度全区网络培训必修课—理论教育类", "2023年度全区网络培训必修课—党性教育类", "2023年度全区网络培训必修课—专业化能力类"]
  var courseList = []
  for (var i = 0; i < childViews.length; i++) {
    var child = childViews[i]
    var text = child.text()
    if (courses.indexOf(text) >= 0) {
      courseList.push(child)
      //fInfo("课程列表1");
    }
  }
  fClear();
  fInfo("课程数量：" + courseList.length)
  for (var j = 0; j < courseList.length; j++) {
    var course = courseList[j]
    //fInfo("课程列表2");
    course.click()
    sleep(2000)
    fInfo("调用观看视频函数");
    watchVideo()
    
    sleep(2000)
    fInfo("第" + (j + 1) + "个课程完成")
  }
}

// 调用主函数
// 点击进行中控件进入学习页面
function enterLearnPage() {
  var startButton = className("android.view.View").text("进行中").findOne()
  if (!startButton) {
    fInfo("未找到进去按钮")
    exit()
  }
  sleep(2000)
  fInfo("找到进入按钮")
  clickRandomPoint(startButton)
  
}




// 点击控件范围内的随机坐标
function clickRandomPoint(control) {
  // 获取控件的坐标范围
  var bounds = control.bounds()
  // 随机生成一个坐标
  var x = random(bounds.left, bounds.right)
  var y = random(bounds.top, bounds.bottom)
  // 点击随机坐标
  click(x, y);
  log(x, y);
}





auto.waitFor(); //mode = "fast"
var delay_time = 3000;
device.wakeUpIfNeeded();

var is_exit = ("is_exit", false);


function google_ocr_api(img) {
  console.log('GoogleMLKit文字识别中');
  let list = JSON.parse(JSON.stringify(gmlkit.ocr(img, "zh").toArray(3))); // 识别文字，并得到results
  let eps = 30; // 坐标误差
  for (
    var i = 0; i < list.length; i++ // 选择排序对上下排序,复杂度O(N²)但一般list的长度较短只需几十次运算
  ) {
    for (var j = i + 1; j < list.length; j++) {
      if (list[i]['bounds']['bottom'] > list[j]['bounds']['bottom']) {
        var tmp = list[i];
        list[i] = list[j];
        list[j] = tmp;
      }
    }
  }

  for (
    var i = 0; i < list.length; i++ // 在上下排序完成后，进行左右排序
  ) {
    for (var j = i + 1; j < list.length; j++) {
      // 由于上下坐标并不绝对，采用误差eps
      if (
        Math.abs(list[i]['bounds']['bottom'] - list[j]['bounds']['bottom']) <
        eps &&
        list[i]['bounds']['left'] > list[j]['bounds']['left']
      ) {
        var tmp = list[i];
        list[i] = list[j];
        list[j] = tmp;
      }
    }
  }
  let res = '';
  for (var i = 0; i < list.length; i++) {
    res += list[i]['text'];
  }
  list = null;
  return res;
}

function paddle_ocr_api() {
  console.log('PaddleOCR文字识别中');
  let list = JSON.parse(JSON.stringify(paddle.ocr(arguments[0]))); // 识别文字，并得到results
  let eps = 30; // 坐标误差
  if (arguments.length >= 2) eps = arguments[1];
  for (
    var i = 0; i < list.length; i++ // 选择排序对上下排序,复杂度O(N²)但一般list的长度较短只需几十次运算
  ) {
    for (var j = i + 1; j < list.length; j++) {
      if (list[i]['bounds']['bottom'] > list[j]['bounds']['bottom']) {
        var tmp = list[i];
        list[i] = list[j];
        list[j] = tmp;
      }
    }
  }

  for (
    var i = 0; i < list.length; i++ // 在上下排序完成后，进行左右排序
  ) {
    for (var j = i + 1; j < list.length; j++) {
      // 由于上下坐标并不绝对，采用误差eps
      if (
        Math.abs(list[i]['bounds']['bottom'] - list[j]['bounds']['bottom']) <
        eps &&
        list[i]['bounds']['left'] > list[j]['bounds']['left']
      ) {
        var tmp = list[i];
        list[i] = list[j];
        list[j] = tmp;
      }
    }
  }
  let res = '';
  for (var i = 0; i < list.length; i++) {
    res += list[i]['text'];
  }
  list = null;
  return res;
}
/**
if (fast_mode) {
  auto.setMode("fast");
}
events.observeToast();
sleep(delay_time);*/
/*****************更新内容弹窗部分*****************/
var storage = storages.create('songgedodo');
// 脚本版本号
var last_version = "V1.1.1";
var engine_version = "V1.1.2";
var newest_version = "V1.1.3";
if (storage.get(engine_version, true)) {
  storage.remove(last_version);
  let gengxin_rows = "（点击取消不再提示）".split(";");
  let is_show = confirm(engine_version + "版更新内容", gengxin_rows.join("\n"));
  if (!is_show) {
    storage.put(engine_version, false);
  }
}
var w = fInit();
// console.setTitle("广西干部网络学院学习助手");
// console.show();
fInfo("广西干部网络学院学习助手Pro" + newest_version + "脚本初始化");
// 初始化宽高
var [device_w, device_h] = init_wh();
// log("fina:", device_w, device_h);
// OCR初始化，重写内置OCR module

// sleep(2000);
// 自动允许权限进程
threads.start(function () {
  //在新线程执行的代码
  //sleep(500);
  fInfo("开始自动获取截图权限");
  var btn = className("android.widget.Button").textMatches(/允许|立即开始|START NOW/).findOne(5000);
  if (btn) {
    sleep(1000);
    btn.click();
  }
  fInfo("结束获取截图权限");
});
fInfo("请求截图权限");
// 请求截图权限、似乎请求两次会失效
if (!requestScreenCapture(false)) { // false为竖屏方向
  fError('请求截图失败');
  exit();
}
// 防止设备息屏
fInfo("设置屏幕常亮");
device.keepScreenOn(3600 * 1000);
// 下载题库
//fInfo("检测题库更新");
//const update_info = get_tiku_by_http("https://gitcode.net/m0_64980826/songge_tiku/-/raw/master/info.json");
//fInfo("正在加载对战题库......请稍等\n题库版本:" + update_info["tiku_version"]);
//fInfo("如果不动就是正在下载，多等会");


// 设置资源保存路径
files.createWithDirs("/sdcard/广西干部网络学院学习助手/");
// 调整音量

if (is_exit) {
  fInfo("运行前重置学习APP");
  exit_app("广西干部网络学院");
  sleep(1500);
}
// 检测地理位置权限代码，出现就点掉
fInfo("开始位置权限弹窗检测");
var nolocate_thread = threads.start(function () {
  //在新线程执行的代码
  id("title_text").textContains("地理位置").waitFor();
  fInfo("检测到位置权限弹窗");
  sleep(1000);
  text("暂不开启").findOne().click();
  fInfo("已关闭定位");
});
fInfo("跳转学习APP");
// launch('cn.xuexi.android');
app.launchApp('广西干部网络学院');

sleep(3000);

var quxiao = className("android.widget.Button").text("取消").findOne(1000);
if (quxiao) {
  quxiao.click();
}
//var myBtn = text("首页").waitFor();
sleep(2000);
var banji = text("我的班级").findOne();
clickRandomPoint(banji);
// className("android.view.View").text("2023年度全区网络培训必修课—理论教育类").findOne().click()
sleep(3000);
enterLearnPage()

main()












// 模拟随机时间0.5-3秒，后期可以用户自定义
function ran_sleep() {
  return sleep(random(1000, delay_time));
}





// 屏幕宽高、方向初始化
function init_wh() {
  fInfo("屏幕方向检测");
  log(device.width + "*" + device.height);
  var device_w = depth(0).findOne().bounds().width();
  var device_h = depth(0).findOne().bounds().height();
  log(device_w + "*" + device_h);
  if (device.width == device_h && device.height == device_w) {
    fError("设备屏幕方向检测为横向，后续运行很可能会报错，建议调整后重新运行脚本");
    sleep(10000);
  } else if (device.width == 0 || device.height == 0) {
    fError("识别不出设备宽高，建议重启强国助手后重新运行脚本");
    sleep(10000);
  }
  return [device_w, device_h]
}

// 尝试成功点击
function real_click(obj) {
  for (let i = 1; i <= 3; i++) {
    if (obj.click()) {
      log("real click: true");
      return true;
    }
    sleep(300);
  }
  console.warn("控件无法正常点击：", obj);
  log("尝试再次点击");
  click(obj.bounds().centerX(), obj.bounds().centerY());
  return false;
}

// 测试ocr功能
function ocr_test() {
  if (Number(ocr_maxtime)) {
    var test_limit = Number(ocr_maxtime);
  } else {
    var test_limit = 5000;
  }
  try {
    fInfo("测试ocr功能，开始截图");
    let img_test = captureScreen();
    img_test = images.clip(img_test, 0, 100, device_w, 250);
    log("开始识别");
    //console.time("OCR识别结束");
    let begin = new Date();

    if (ocr_choice == 0) {
      let test_txt = google_ocr_api(img_test);
    } else if (ocr_choice == 1) {
      let test_txt = paddle_ocr_api(img_test);
    } else {
      let test_txt = ocr.recognizeText(img_test);
    }
    //console.timeEnd("OCR识别结束");
    let end = new Date();
    let test_time = end - begin;
    fInfo("OCR识别结束:" + test_time + "ms");
    if (test_time > test_limit) {
      fError("OCR识别过慢(>" + test_limit + "ms)，已跳过多人对战，可在配置中设置跳过阈值");
      fError("如偶然变慢，可能为无障碍服务抽风，建议重启强国助手后重试");
      sleep(3000);
      return false
    } else {
      fInfo("OCR功能正常");
      img_test.recycle();
      return true;
    }
  } catch (e) {
    fError(e + "：ocr功能异常，退出脚本");
    exit();
    return false;
  }
}




// 强行退出应用名称
function exit_app(name) {
  // fClear();
  fInfo("尝试结束" + name + "APP");
  var packageName = getPackageName(name);
  if (!packageName) {
    if (getAppName(name)) {
      packageName = name;
    } else {
      return false;
    }
  }
  log("打开应用设置界面");
  app.openAppSetting(packageName);
  var appName = app.getAppName(packageName);
  //log(appName);
  log("等待加载界面")
  //textMatches(/应用信息|应用详情/).findOne(5000);
  text(appName).findOne(5000);
  sleep(1500);
  log("查找结束按钮")
  //let stop = textMatches(/(^强行.*|.*停止$|^结束.*)/).packageNameMatches(/.*settings.*|.*securitycenter.*/).findOne();
  let stop = textMatches(/(强.停止$|.*停止$|结束运行|停止运行|[Ff][Oo][Rr][Cc][Ee] [Ss][Tt][Oo][Pp])/).findOne();
  log("stop:", stop.enabled())
  if (stop.enabled()) {
    //log("click:", stop.click());
    real_click(stop);
    sleep(1000);
    log("等待确认弹框")
    //let sure = textMatches(/(确定|^强行.*|.*停止$)/).packageNameMatches(/.*settings.*|.*securitycenter.*/).clickable().findOne();
    let sure = textMatches(/(确定|.*停止.*|[Ff][Oo][Rr][Cc][Ee] [Ss][Tt][Oo][Pp]|O[Kk])/).clickable().findOne(1500);
    if (!sure) {
      fInfo(appName + "应用已关闭");
      back();
      return false;
    }
    log("sure click:", sure.click());
    fInfo(appName + "应用已被关闭");
    sleep(1000);
    back();
  } else {
    fInfo(appName + "应用不能被正常关闭或不在后台运行");
    sleep(1000);
    back();
  }
  return true;
}

// 登录
function login(username, pwd) {
  var begin_obj = idMatches(/.*comm_head_xuexi_mine|.*btn_next/).findOne();
  if (begin_obj.text() == "登录") {
    log("查找ab");
    let a = className("EditText").id("et_phone_input").findOne();
    let b = className("EditText").id("et_pwd_login").findOne();
    a.setText(username);
    sleep(1000);
    b.setText(pwd);
    sleep(1000);
    begin_obj.click();
    sleep(3000);
    let packageName = getPackageName('广西干部网络学院');
    if (currentPackage() != packageName) {
      log("检测到弹窗，尝试返回");
      if (textMatches(/取消/).exists()) {
        textMatches(/取消/).findOne().click();
      } else {
        back();
      }
    }
  }
}





function winReshow() {
  for (i = 0; i < 4; i++) {
    recents();
    sleep(1000);
  }
}



function displayProp(obj) {
  var names = "";
  for (var name in obj) {
    names += name + ": " + obj[name] + ", ";
  }
  log(names);
}

/*******************悬浮窗*******************/
function fInit() {
  // ScrollView下只能有一个子布局
  var w = floaty.rawWindow(
    <card cardCornerRadius='8dp' alpha="0.8">
      <vertical>
        <horizontal bg='#FF000000' padding='10 5'>
          <text id='version' textColor="#FFFFFF" textSize="18dip">广西干部网络学院学习助手+</text>
          <text id='title' h="*" textColor="#FFFFFF" textSize="13dip" layout_weight="1" gravity="top|right"></text>
        </horizontal>
        <ScrollView>
          <vertical bg='#AA000000' id='container' minHeight='20' gravity='center'></vertical>
        </ScrollView>
      </vertical>
      <relative gravity="right|bottom">
        <text id="username" textColor="#FFFFFF" textSize="12dip" padding='5 0'></text>
      </relative>
    </card>
  );
  ui.run(function () {
    //w.title.setFocusable(true);
    w.version.setText("广西干部网络学院学习助手+" + newest_version);
  });
  w.setSize(720, -2);
  w.setPosition(10, 10);
  w.setTouchable(false);
  return w;
}

function fSet(id, txt) {
  ui.run(function () {
    w.findView(id).setText(txt);
  });
}

function fInfo(str) {
  ui.run(function () {
    let textView = ui.inflate(<text id="info" maxLines="2" textColor="#7CFC00" textSize="15dip" padding='5 0'></text>, w.container);
    textView.setText(str.toString());
    w.container.addView(textView);
  });
  console.info(str);
}

function fError(str) {
  ui.run(function () {
    let textView = ui.inflate(<text id="error" maxLines="2" textColor="#FF0000" textSize="15dip" padding='5 0'></text>, w.container);
    textView.setText(str.toString());
    w.container.addView(textView);
  });
  console.error(str);
}

function fTips(str) {
  ui.run(function () {
    let textView = ui.inflate(<text id="tips" maxLines="2" textColor="#FFFF00" textSize="15dip" padding='5 0'></text>, w.container);
    textView.setText(str.toString());
    w.container.addView(textView);
  });
  console.info(str);
}

function fClear() {
  ui.run(function () {
    w.container.removeAllViews();
  });
}

function fRefocus() {
  threads.start(function () {
    ui.run(function () {
      w.requestFocus();
      w.title.requestFocus();
      ui.post(function () {
        w.title.clearFocus();
        w.disableFocus();
      }, 200);
    });
  });
  sleep(500);
}









/*****************结束后配置*****************/
//console.show();
// console.clear();
fInfo("已全部结束");
// 调回原始音量

// 取消屏幕常亮
fInfo("取消屏幕常亮");
device.cancelKeepingAwake();
// exit_app("学习强国");
// if (email) {
//   send_email(email);
// }
// 震动提示
device.vibrate(500);
fInfo("十秒后关闭悬浮窗");
device.cancelVibration();
sleep(10000);
console.hide();
home();
exit();





