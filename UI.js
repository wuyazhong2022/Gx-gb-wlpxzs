"ui";

importClass(java.net.HttpURLConnection);
importClass(java.net.URL);
importClass(java.io.File);
importClass(java.io.FileOutputStream);
importClass(android.graphics.Color);

var color = "#FF4FB3FF";

ui.statusBarColor("#FF4FB3FF")

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" bg="#ff4fb3ff" title="广西干部网络学院培训学习助手"/>
                <tabs id="tabs" bg="#ff4fb3ff"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical>
                        <vertical gravity="center" layout_weight="1">
                            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                <horizontal gravity="center_vertical">
                                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                        <text text="脚本选择" textColor="#222222" textSize="16sp" maxLines="1" />
                                        <text text="切换脚本后需在配置页设置" textColor="#999999" textSize="14sp" maxLines="1" />
                                    </vertical>
                                    <spinner id="script_chosen" marginLeft="4" marginRight="6" entries="网络培训学习助手Pro" />
                                </horizontal>
                            </card>
                            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                <horizontal gravity="center_vertical">
                                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                        <text text="无障碍服务" textColor="#222222" textSize="16sp" maxLines="1" />
                                        <text text="请确保开启" textColor="#999999" textSize="14sp" maxLines="1" />
                                    </vertical>
                                    <checkbox id="autoService" marginLeft="4" marginRight="6" checked="{{auto.service != null}}" />
                                </horizontal>
                            </card>
                            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                <horizontal gravity="center_vertical">
                                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                        <text text="悬浮窗权限" textColor="#222222" textSize="16sp" maxLines="1" />
                                        <text text="请确保开启" textColor="#999999" textSize="14sp" maxLines="1" />
                                    </vertical>
                                    <checkbox id="consoleshow" marginLeft="4" marginRight="6" checked="{{floaty.checkPermission()}}" />
                                </horizontal>
                            </card>
                            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                <horizontal gravity="center_vertical">
                                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                        <text text="音量上键可以停止所有脚本运行" textColor="#222222" textSize="16sp" maxLines="1" />
                                    </vertical>
                                </horizontal>
                            </card>
                        </vertical>
                        <button h="60" layout_gravity="center" id="log" textSize="18sp" text="查看日志" />
                        <button h="60" layout_gravity="center" id="update" textSize="18sp" />
                        <button id="start" text="开 始 学 习" textSize="25sp" color="#ffffff" bg="#FF4FB3FF" foreground="?selectableItemBackground"/>
                    </vertical>
                </frame>
                <ScrollView>
                    <frame>
                        <vertical id="ttxs_pro" gravity="center">
                         
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="无障碍模式2" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="无障碍服务没问题就不勾选" />
                                </vertical>
                                <checkbox id="ttxs_pro_fast_mode" marginLeft="4" marginRight="6" checked="false" />
                            </horizontal>
                            
                           
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="使用帮助" />
                                </vertical>
                                <checkbox id="ttxs_pro_pinglun" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="使用帮助" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="??" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="？？" />
                                    <input id="ttxs_pro_comment" marginLeft="4" marginRight="6" text="!!!!!" textSize="13sp"  inputType="textMultiLine" />
                                </vertical>
                            </horizontal>
                          
                            
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="是否启用音量调节" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="每次运行脚本后调节音量百分比" />
                                </vertical>
                                <checkbox id="ttxs_pro_yl_on" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="音量" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="调节音量百分比(只填数字)" />
                                </vertical> 
                                <input id="ttxs_pro_yinliang" marginLeft="4" marginRight="6" text="0" textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="多账号(选填，不限个数)" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="使用前确保所有账号都已完成短信验证" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="账号1:密码1:token1(换行/回车)账号2:密码2:token2(换行/回车)账号3:密码3:token3" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="结束后会自动登录回账号1" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="新增多账号1对1微信推送，按格式配置即可" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="没有则根据上面配置的pushplus_token为主" />
                                    <input id="ttxs_pro_zhanghao" text="" textSize="13sp" />
                                </vertical> 
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="ttxs_pro_save" text="保存配置" padding="12dp" w="*" />
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="ttxs_pro_reset" text="恢复默认" padding="12dp" w="*" />
                            </horizontal>
                        </vertical>
                    </frame>
                </ScrollView>
            </viewpager>
        </vertical>
    </drawer>
);

ui.update.visibility = 8;

http.__okhttp__.setTimeout(10000);


var GLOBAL_CONFIG = storages.create("GLOBAL_CONFIG");
var TTXS_PRO_CONFIG = storages.create("TTXS_PRO_CONFIG");
var BAIDUAPI = storages.create("BAIDUAPI");
var execution = "";
var thread = null;
Initialize();




// 创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("日志");
    menu.add("关于");
    menu.add("使用帮助");
    menu.add("适配1.0.7下载");
});

// 监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "日志":
            app.startActivity("console");
            break;
        case "关于":
            alert("关于", "广西干部网络学院培训学习助手 v" + latest_version);
            break;
        case "使用帮助":
            app.openUrl("https://github.com/sec-an/Better-Auto-XXQG");
            break;
        case "适配1.0.7下载":
            app.openUrl("https://android-apps.pp.cn/fs08/2021/12/28/3/110_f37c420b0944cb7b9f60a2ad9b5518d2.apk?yingid=web_space&packageid=500730793&md5=664bb7bdcae57be189fc86100f4371c4&minSDK=21&size=191654161&shortMd5=1fee0bd160d08108a9d9e5f4773ce741&crc32=3879122865&did=ad484a175e19d0928044435e24bf03cb");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

// 设置滑动页面的标题
ui.viewpager.setTitles(["首页", "使用帮助"]);
// 让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

// 脚本选择监听
var script_chosen_Listener = new android.widget.AdapterView.OnItemSelectedListener({
    onItemSelected: function (parent, view, position, id) {
        toastLog('选择脚本：' + ui.script_chosen.getSelectedItem());
        ui.ttxs_pro.visibility = 0;
        // if (ui.script_chosen.getSelectedItemPosition() == 0) {
        //     ui.ttxs.visibility = 8;
        //     ui.study.visibility = 8;
        //     ui.ttxs_pro.visibility = 0;
        // } else if (ui.script_chosen.getSelectedItemPosition() == 1) {
        //     ui.ttxs_pro.visibility = 8;
        //     ui.study.visibility = 8;
        //     ui.ttxs.visibility = 0;
        // } else if (ui.script_chosen.getSelectedItemPosition() == 2) {
        //     ui.ttxs_pro.visibility = 8;
        //     ui.ttxs.visibility = 8;
        //     ui.study.visibility = 0;
        // }
        GLOBAL_CONFIG.put("script_chosen", ui.script_chosen.getSelectedItemPosition());
    }
})
ui.script_chosen.setOnItemSelectedListener(script_chosen_Listener);

// 用户勾选无障碍服务的选项时，跳转到页面让用户去开启 
// android.permission.SYSTEM_ALERT_WINDOW
ui.autoService.on("check", function (checked) {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 悬浮窗权限
ui.consoleshow.on("check", function (checked) {
    if (checked && !floaty.checkPermission()) {
        app.startActivity({
            packageName: "com.android.settings",
            className: "com.android.settings.Settings$AppDrawOverlaySettingsActivity",
            data: "package:" + context.getPackageName(),
        });
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
    ui.consoleshow.checked = floaty.checkPermission();
});

// 打开日志
ui.log.click(function () {
    app.startActivity("console");
});

// APP更新检测
ui.update.click(function () {
    if (app.versionName != latest_version) {
        GLOBAL_CONFIG.put("NO_UPDATE", 0);
        checkversion();
    } else {
        toast("当前已经是最新版本！");
    }
});

// 下载并运行所选脚本
ui.start.click(function () {
    threads.shutDownAll();
    if (thread != null && thread.isAlive()) {
        alert("注意", "脚本正在运行，请结束之前进程");
        return;
    }
    threads.start(function () {
        execution = engines.execScript("广西干部网络学院培训学习助手", getScript(ui.script_chosen.getSelectedItemPosition()));
    });
});

// 保存网络培训学习助手pro脚本设置
ui.ttxs_pro_save.click(function () {
   // TTXS_PRO_CONFIG.put("watchdog", ui.ttxs_pro_watchdog.getText() + "");
  //  TTXS_PRO_CONFIG.put("slide_verify", ui.ttxs_pro_slide_verify.getText() + "");
  //  TTXS_PRO_CONFIG.put("fast_mode", ui.ttxs_pro_fast_mode.isChecked());
   // TTXS_PRO_CONFIG.put("ddtong", ui.ttxs_pro_ddtong.isChecked());
   // TTXS_PRO_CONFIG.put("is_exit", ui.ttxs_pro_is_exit.isChecked());
    TTXS_PRO_CONFIG.put("pinglun", ui.ttxs_pro_pinglun.isChecked());
//  TTXS_PRO_CONFIG.put("comment", ui.ttxs_pro_comment.getText() + "");
   // TTXS_PRO_CONFIG.put("shipin", ui.ttxs_pro_shipin.isChecked());
  //  TTXS_PRO_CONFIG.put("wenzhang", ui.ttxs_pro_wenzhang.isChecked());
   // TTXS_PRO_CONFIG.put("meiri", ui.ttxs_pro_meiri.isChecked());
  //  TTXS_PRO_CONFIG.put("meizhou", ui.ttxs_pro_meizhou.getSelectedItemPosition());
  //  TTXS_PRO_CONFIG.put("zhuanxiang", ui.ttxs_pro_zhuanxiang.getSelectedItemPosition());
  //  TTXS_PRO_CONFIG.put("quweidati", ui.ttxs_pro_quweidati.isChecked());
 //   TTXS_PRO_CONFIG.put("ocr_choice", ui.ttxs_pro_ocr_choice.getSelectedItemPosition());
  //  TTXS_PRO_CONFIG.put("ocr_maxtime", ui.ttxs_pro_ocr_maxtime.getText() + "");
  //  TTXS_PRO_CONFIG.put("duizhan_mode", ui.ttxs_pro_duizhan_mode.getSelectedItemPosition());
  //  TTXS_PRO_CONFIG.put("jisu", ui.ttxs_pro_jisu.getText() + "");
 //   TTXS_PRO_CONFIG.put("guaji", ui.ttxs_pro_guaji.isChecked());
  //  TTXS_PRO_CONFIG.put("siren", ui.ttxs_pro_siren.isChecked());
  //  TTXS_PRO_CONFIG.put("dacuo_num", ui.ttxs_pro_dacuo_num.getText() + "");
   // TTXS_PRO_CONFIG.put("shuangren", ui.ttxs_pro_shuangren.isChecked());
  //  TTXS_PRO_CONFIG.put("bendi", ui.ttxs_pro_bendi.isChecked());
 //   TTXS_PRO_CONFIG.put("dingyue", ui.ttxs_pro_dingyue.getSelectedItemPosition());
 //   TTXS_PRO_CONFIG.put("pushplus", ui.ttxs_pro_pushplus.getText() + "");
    TTXS_PRO_CONFIG.put("yl_on", ui.ttxs_pro_yl_on.isChecked());
    TTXS_PRO_CONFIG.put("yinliang", ui.ttxs_pro_yinliang.getText() + "");
    TTXS_PRO_CONFIG.put("zhanghao", ui.ttxs_pro_zhanghao.getText() + "");

    toastLog("网络培训学习助手pro配置保存成功！");
});

// 重置网络培训学习助手pro脚本设置
ui.ttxs_pro_reset.click(function () {
    TTXS_PRO_CONFIG.put("watchdog", "1800");
    ui.ttxs_pro_watchdog.setText(TTXS_PRO_CONFIG.get("watchdog"));
    TTXS_PRO_CONFIG.put("slide_verify", "300");
    ui.ttxs_pro_slide_verify.setText(TTXS_PRO_CONFIG.get("slide_verify"));
    TTXS_PRO_CONFIG.put("fast_mode", false);
    ui.ttxs_pro_fast_mode.setChecked(TTXS_PRO_CONFIG.get("fast_mode"));
    TTXS_PRO_CONFIG.put("ddtong", false);
    ui.ttxs_pro_ddtong.setChecked(TTXS_PRO_CONFIG.get("ddtong"));
    TTXS_PRO_CONFIG.put("is_exit", true);
    ui.ttxs_pro_is_exit.setChecked(TTXS_PRO_CONFIG.get("is_exit"));
    TTXS_PRO_CONFIG.put("pinglun", true);
    ui.ttxs_pro_pinglun.setChecked(TTXS_PRO_CONFIG.get("pinglun"));
    TTXS_PRO_CONFIG.put("comment", "全心全意为人民服务|不忘初心，牢记使命|不忘初心，方得始终|永远坚持党的领导|富强、民主、文明、和谐|自由，平等，公正，法治");
    ui.ttxs_pro_comment.setText(TTXS_PRO_CONFIG.get("comment"));
    TTXS_PRO_CONFIG.put("shipin", true);
    ui.ttxs_pro_shipin.setChecked(TTXS_PRO_CONFIG.get("shipin"));
    TTXS_PRO_CONFIG.put("wenzhang", true);
    ui.ttxs_pro_wenzhang.setChecked(TTXS_PRO_CONFIG.get("wenzhang"));
    TTXS_PRO_CONFIG.put("meiri", true);
    ui.ttxs_pro_meiri.setChecked(TTXS_PRO_CONFIG.get("meiri"));
    TTXS_PRO_CONFIG.put("meizhou", 0);
    ui.ttxs_pro_meizhou.setSelection(TTXS_PRO_CONFIG.get("meizhou"));
    TTXS_PRO_CONFIG.put("zhuanxiang", 0);
    ui.ttxs_pro_zhuanxiang.setSelection(TTXS_PRO_CONFIG.get("zhuanxiang"));
    TTXS_PRO_CONFIG.put("quweidati", true);
    ui.ttxs_pro_quweidati.setChecked(TTXS_PRO_CONFIG.get("tiaozhan"));
    TTXS_PRO_CONFIG.put("ocr_choice", 0);
    ui.ttxs_pro_ocr_choice.setSelection(TTXS_PRO_CONFIG.get("ocr_choice"));
    TTXS_PRO_CONFIG.put("ocr_maxtime", "5000");
    ui.ttxs_pro_ocr_maxtime.setText(TTXS_PRO_CONFIG.get("ocr_maxtime"));
    TTXS_PRO_CONFIG.put("duizhan_mode", 0);
    ui.ttxs_pro_duizhan_mode.setSelection(TTXS_PRO_CONFIG.get("duizhan_mode"));
    TTXS_PRO_CONFIG.put("jisu", "0");
    ui.ttxs_pro_jisu.setText(TTXS_PRO_CONFIG.get("jisu"));
    TTXS_PRO_CONFIG.put("guaji", true);
    ui.ttxs_pro_guaji.setChecked(TTXS_PRO_CONFIG.get("guaji"));
    TTXS_PRO_CONFIG.put("siren", true);
    ui.ttxs_pro_siren.setChecked(TTXS_PRO_CONFIG.get("siren"));
    TTXS_PRO_CONFIG.put("dacuo_num", "2");
    ui.ttxs_pro_dacuo_num.setText(TTXS_PRO_CONFIG.get("dacuo_num"));
    TTXS_PRO_CONFIG.put("shuangren", true);
    ui.ttxs_pro_shuangren.setChecked(TTXS_PRO_CONFIG.get("shuangren"));
    TTXS_PRO_CONFIG.put("bendi", true);
    ui.ttxs_pro_bendi.setChecked(TTXS_PRO_CONFIG.get("bendi"));
    TTXS_PRO_CONFIG.put("dingyue", 0);
    ui.ttxs_pro_dingyue.setSelection(TTXS_PRO_CONFIG.get("dingyue"));
    TTXS_PRO_CONFIG.put("pushplus", "");
    ui.ttxs_pro_pushplus.setText(TTXS_PRO_CONFIG.get("pushplus"));
    TTXS_PRO_CONFIG.put("yl_on", true);
    ui.ttxs_pro_yl_on.setChecked(TTXS_PRO_CONFIG.get("yl_on"));
    TTXS_PRO_CONFIG.put("yinliang", "0");
    ui.ttxs_pro_yinliang.setText(TTXS_PRO_CONFIG.get("yinliang"));
    TTXS_PRO_CONFIG.put("zhanghao", "");
    ui.ttxs_pro_zhanghao.setText(TTXS_PRO_CONFIG.get("zhanghao"));

    toastLog("网络培训学习助手pro配置恢复默认！");
});

// 读取脚本设置
function Initialize() {
    ui.script_chosen.setSelection(GLOBAL_CONFIG.get("script_chosen", 0));

   // ui.ttxs_pro_watchdog.setText(TTXS_PRO_CONFIG.get("watchdog", "1800"));
 //   ui.ttxs_pro_slide_verify.setText(TTXS_PRO_CONFIG.get("slide_verify", "300"));
  //  ui.ttxs_pro_fast_mode.setChecked(TTXS_PRO_CONFIG.get("fast_mode", false));
   // ui.ttxs_pro_ddtong.setChecked(TTXS_PRO_CONFIG.get("ddtong", false));
  //  ui.ttxs_pro_is_exit.setChecked(TTXS_PRO_CONFIG.get("is_exit", true));
    ui.ttxs_pro_pinglun.setChecked(TTXS_PRO_CONFIG.get("pinglun", true));
  //  ui.ttxs_pro_comment.setText(TTXS_PRO_CONFIG.get("comment", "全心全意为人民服务|不忘初心，牢记使命|不忘初心，方得始终|永远坚持党的领导|富强、民主、文明、和谐|自由，平等，公正，法治"));
    //ui.ttxs_pro_shipin.setChecked(TTXS_PRO_CONFIG.get("shipin", true));
    //ui.ttxs_pro_wenzhang.setChecked(TTXS_PRO_CONFIG.get("wenzhang", true));
  //  ui.ttxs_pro_meiri.setChecked(TTXS_PRO_CONFIG.get("meiri", true));
    //ui.ttxs_pro_meizhou.setSelection(TTXS_PRO_CONFIG.get("meizhou", 0));
   // ui.ttxs_pro_zhuanxiang.setSelection(TTXS_PRO_CONFIG.get("zhuanxiang", 0));
   // ui.ttxs_pro_quweidati.setChecked(TTXS_PRO_CONFIG.get("quweidati", true));
   // ui.ttxs_pro_ocr_choice.setSelection(TTXS_PRO_CONFIG.get("ocr_choice", 0));
   // ui.ttxs_pro_ocr_maxtime.setText(TTXS_PRO_CONFIG.get("ocr_maxtime", "5000"));
   // ui.ttxs_pro_duizhan_mode.setSelection(TTXS_PRO_CONFIG.get("duizhan_mode", 0));
   // ui.ttxs_pro_jisu.setText(TTXS_PRO_CONFIG.get("jisu", "0"));
    //ui.ttxs_pro_guaji.setChecked(TTXS_PRO_CONFIG.get("guaji", true));
   // ui.ttxs_pro_siren.setChecked(TTXS_PRO_CONFIG.get("siren", true));
   // ui.ttxs_pro_dacuo_num.setText(TTXS_PRO_CONFIG.get("dacuo_num", "2"));
   // ui.ttxs_pro_shuangren.setChecked(TTXS_PRO_CONFIG.get("shuangren", true));
  //  ui.ttxs_pro_bendi.setChecked(TTXS_PRO_CONFIG.get("bendi", true));
   // ui.ttxs_pro_dingyue.setSelection(TTXS_PRO_CONFIG.get("dingyue", 0));
  //  ui.ttxs_pro_pushplus.setText(TTXS_PRO_CONFIG.get("pushplus", ""));
   // ui.ttxs_pro_yl_on.setChecked(TTXS_PRO_CONFIG.get("yl_on", true));
    ui.ttxs_pro_yinliang.setText(TTXS_PRO_CONFIG.get("yinliang", "0"));
    ui.ttxs_pro_zhanghao.setText(TTXS_PRO_CONFIG.get("zhanghao", ""));
}

// 检查百度API
function check_baidu_api() {
    thread = threads.start(function () {
        let AK = String(ui.study_AK.getText());
        let SK = String(ui.study_SK.getText());
        var res = http.post(
            'https://aip.baidubce.com/oauth/2.0/token', {
                grant_type: 'client_credentials',
                client_id: AK,
                client_secret: SK
            }
        ).body.json();
        if ("error" in res) {
            toastLog("API Key或Secret Key存在错误");
            console.log(AK);
            console.log(SK);
            ui.study_AK.setText(BAIDUAPI.get("AK", ""));
            ui.study_SK.setText(BAIDUAPI.get("SK", ""));
            BAIDUAPI.put("AK", "");
            BAIDUAPI.put("SK", "");
        } else {
            toastLog("API Key、Secret Key正确，且已缓存");
            BAIDUAPI.put("AK", AK);
            BAIDUAPI.put("SK", SK);
        }
    });
}

// APP更新提示
function checkversion() {
    var releaseNotes = "版本 v" + latest_version + "\n" +
        "更新日志:\n" +
        "* 1.基于AutoX v6.3.4重新打包\n" +
        "* 2.调整默认OCR为Google ML kIT OCR"
    dialogs.build({
            title: "发现新版本",
            content: releaseNotes,
            positive: "立即下载",
            negative: "取消",
            neutral: "浏览器下载",
            checkBoxPrompt: "不再提示",
            cancelable: false
        })
        .on("positive", () => {
            download(apkurl);
        })
        .on("neutral", () => {
            app.openUrl(apkurl);
        })
        .on("check", (checked) => {
            GLOBAL_CONFIG.put("NO_UPDATE", 1);
        }).show();
}

// 打开下载进度面板
function download(url) {
    downloadDialog = dialogs.build({
        title: "正在下载...",
        progress: {
            max: 100,
            showMinMax: true
        },
        autoDismiss: false,
        cancelable: false
    }).show();
    startDownload(url);
}

// 下载apk的主方法体
function startDownload(url) {
    threads.start(function () {
        var path = files.cwd() + "/new.apk";
        let apkFile = new File(path);
        var conn = new URL(url).openConnection();
        conn.connect();
        let is = conn.getInputStream();
        let length = conn.getContentLength();
        let fos = new FileOutputStream(apkFile);
        let count = 0;
        let buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
        while (true) {
            var p = ((count / length) * 100);
            let numread = is.read(buffer);
            count += numread;
            // 下载完成
            if (numread < 0) {
                toast("下载完成");
                downloadDialog.dismiss();
                downloadDialog = null;
                break;
            }
            // 更新进度条
            downloadDialog.setProgress(p);
            fos.write(buffer, 0, numread);
        }
        fos.close();
        is.close();
        //自动打开进行安装
        app.viewFile(path);
    })
}

function getScript(choice) {
    let url_prefix = [
        'https://gh-proxy.com/https://raw.githubusercontent.com/wuyazhong2022/Gx-gb-wlpxzs/main/',
        "https://ghproxy.com/https://raw.githubusercontent.com/wuyazhong2022/Gx-gb-wlpxzs/main/",
        'https://raw.githubusercontent.com/wuyazhong2022/Gx-gb-wlpxzs/main/',
    ];
    for (var i = 0; i < url_prefix.length; i++) {
        try {
            let res = http.get(url_prefix[i] + choice + ".js");
            console.log(i, ":" + res.statusCode);
            if (res.statusCode == 200) {
                var UI = res.body.string();
                if (UI.indexOf('auto.waitFor();') == 0) break;
            } else {
                toastLog('学习脚本:地址' + i + '下载失败');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return UI;
}