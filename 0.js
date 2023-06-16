
//广西干部网络培训学习助手

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







// 视频列表观看视频函数

var videoCount = 0;



function watchVideo() {

  sleep(3000);

  fInfo("自行查找未学习的视频播放不要动");

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

        fInfo("返回班级详情列表");



        // 继续下一个视频播放

        videoCount++;

        fInfo("已经看了" + videoCount + "个视频");

        fClear();

        break;



      } else {



        // 如果没有找到包含"%"的控件，就跳出循环

        if (i == webViews.length - 1) {

          fInfo("课程已完成观看");

          fInfo("返回课程列表");

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

    var layout = className
