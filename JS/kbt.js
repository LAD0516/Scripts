// ==UserScript==
// @name         拷贝兔（自用）
// @version      1.0
// @description  拷贝兔回车键自动点击提取内容;
// @author       GnA1J
// @match        https://cp.anyknew.com/
// @grant        GM_addStyle
// ==/UserScript==

    'use strict';
document.onkeydown = keyDown;
var button = document.getElementsByTagName("button");
var a = document.getElementsByTagName("a");
function keyDown(event){
 var e = event || window.event;
      switch(event.keyCode){
case 13: button[0].click();
              break;
case 83: a[2].click();
              break;
case 70: a[0].click();
              break;
case 68: a[1].click();
              break;
}
        return false
    }
