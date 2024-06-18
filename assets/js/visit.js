var scripts = document.getElementsByTagName('script'); 
var visitCurrentScript = scripts[scripts.length - 1].src;
var visit_pageid = "";
function getQueryString(name, url) {
	if(url == undefined){
		url = window.location.search.substr(1);
	}else if(url.indexOf("?") != -1){
		url = url.substr(url.indexOf("?") + 1)
	}else{
		url = "";
	}
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = url.match(reg); 
	if (r != null){
		return unescape(r[2]);
	}
	return ""; 
}
function getInfoId(){
	var path = window.location.pathname;
	var infoId = 0;
	if(path.indexOf("/main/preview.do") != -1){
		var url = window.location.href;
		infoId = getQueryString("infoId", url);
	}else{
		var result = RegExp("/i(\\d*)\\.").exec(path);
		if(result != null){
			infoId = result[1]// 信息ID
		}
	}
	return infoId;
}

function getWin(userAgent){
	var os = "";
	if(userAgent.indexOf("windows nt 5.0") > -1){
    	os = "win2000";
    }else if(userAgent.indexOf("windows nt 5.1") > -1){
    	os =  "winxp";
    }else if(userAgent.indexOf("windows nt 5.2") > -1){
    	os =  "win2003";
    }else if(userAgent.indexOf("windows nt 6.0") > -1){
    	os =  "winvista";
    }else if(userAgent.indexOf("windows nt 6.1") > -1 || userAgent.indexOf("windows 7") > -1){
    	os =  "win7";
    }else if(userAgent.indexOf("windows 8") > -1){
    	os =  "win8";
    }else if(userAgent.indexOf("windows nt 10.0") > -1){
    	os =  "win10";
    }else{
    	os =  "win10";
    }
	return os;
}
(function() {
	var domain = window.location.protocol + "//" + window.location.host; // 脚本对应的被统计站点域名
	var url = domain + window.location.pathname;    // 当前页面url
	var interfaceURL = appUrl + '/openapi/visit/visit.do';//统计接口

	var D = document, L = D.location, R = D.referrer, W = window, E = encodeURIComponent;

	var VISIT = {
		client : {},
		getUrl : function() {// 地址
			this.client.url = url;
		},
		getResolution : function() {// 分辨率
			this.client.resolution = W.screen.width + "x" + W.screen.height;
		},
		getColorDepth : function() {// 色深
			this.client.color = W.screen ? W.screen.colorDepth + "-bit" : "";
		},
		getRef : function() {// 来源页面
			this.client.ref = R ? E(R) : "";
		},
		getCookieEnabled : function() {// 是否支持Cookie
			this.client.cookieEnabled = navigator.cookieEnabled ? "1" : "0";
		},
		getJavaEnabled : function() {// 是否支持Java
			this.client.javaEnabled = navigator.javaEnabled ? "1" : "0";
		},
		getFlash : function() {// Flash版本
			if (navigator.plugins
					&& typeof navigator.plugins["Shockwave Flash"] == "object") {
				var a = navigator.plugins["Shockwave Flash"].description;
				if (a
						&& (!navigator.mimeTypes
								|| !navigator.mimeTypes["application/x-shockwave-flash"] || navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
					this.client.flashVersion = a.replace(/^.*\s+(\S+)\s+\S+$/, "$1");
				}
			} else {
				if (W.ActiveXObject) {
					try {
						if (a = new ActiveXObject(
								"ShockwaveFlash.ShockwaveFlash")) {
							(version = a.GetVariable("$version"))
									&& (this.client.flashVersion = version.replace(
											/^.*\s+(\d+),(\d+).*$/, "$1.$2"));
						}
					} catch (b) {
					}
				}
			}
		},
		getLanguage : function() {// 语言
			var a = navigator;
			this.client.language = (a.systemLanguage ? a.systemLanguage
					: a.browserLanguage ? a.browserLanguage
							: a.language ? a.language
									: a.userLanguage ? a.userLanguage : "-")
					.toLowerCase();
		},
		getId : function() {
			this.client.siteId = getQueryString("s", visitCurrentScript);// 站点ID
			this.client.channelId = getQueryString("c", visitCurrentScript);// 栏目ID
			this.client.infoId = getInfoId();// 信息ID
			
		},
		getTitle : function() {// 文章标题
			var title = D.title;
			if(title.length > 80){
				title = title.substring(0, 80) + "...";
			}
			this.client.title = title;
		},
		getRnd : function() {// 产生随即数
			this.client.rnd = Math.round(Math.random() * 4000000000);
		},
		getUV : function() {// 获得访客ID
			var uv = this.getCookie('VISIT_UV');
			var date = new Date();
			var year = date.getFullYear(),
	        month = date.getMonth()+1,//月份是从0开始的
	        day = date.getDate(),
	        hour = date.getHours(),
	        min = date.getMinutes(),
	        sec = date.getSeconds();
			var currTime = year + (month < 10? '0' + month : month) + (day < 10? '0' + day : day)
				+ (hour < 10? '0' + hour : hour) + (min < 10? '0' + min : min) + (sec < 10? '0' + sec : sec);
			if (uv == '' || uv.length !=24) {
				var rand1 = parseInt(Math.random() * 4000000000);
				uv = currTime + String(rand1);
			}
			var date = new Date();
			date.setDate(date.getDate() + 365);
			date.setHours(0, 0, 0, 0);
			this.setCookie('VISIT_UV', uv, date, domain, '/');
			this.client.uv = uv;
			this.client.pageId = currTime + parseInt(Math.random() * 4000000000);
			visit_pageid = this.client.pageId;
		},
		getOs : function() {
			var platform = navigator.platform.toLowerCase();
			var userAgent = navigator.userAgent.toLowerCase();
			var os = "其他";
			var isMobile = 0;
			if(platform.indexOf("win") > -1){
				os = getWin(userAgent);
	        }else if(userAgent.indexOf("iphone")> -1
	        		|| userAgent.indexOf("ipad")> -1
	        		|| userAgent.indexOf("ipod")> -1
	        		|| userAgent.indexOf("ios")> -1){
	        	os =  "ios";
	        	isMobile = 1;
	        }else if(userAgent.indexOf("android")> -1 || userAgent.indexOf("xiaomi")> -1){
	        	os =  "android";
	        	isMobile = 1;
	        }else if(platform.indexOf("mac") > -1){
	        	os =  "mac";
	        }else if(platform.indexOf("x11") > -1){
	        	os =  "unix";
	        }else if(platform.indexOf("linux") > -1){
	        	os =  "linux";
	        }else if(userAgent.indexOf("windows") > -1){
	        	os = getWin(userAgent);
	        }else if(userAgent.indexOf("baiduspider") > -1){
	        	os =  "linux";
	        }else{
	        	os =  "其他";
	        }
			this.client.os = os;
			this.client.isMobile = isMobile;
			this.client.userAgent = encodeURI(userAgent);
		},
		getBroswer:function() {
			var userAgent = navigator.userAgent.toLowerCase();
			var broswer = "其他";
			if(userAgent.indexOf("micromessenger")> -1){
				broswer =  "微信";
	        }else if(userAgent.indexOf("miuibrowser")> -1){
	        	broswer =  "MIUI浏览器";
	        }else if(userAgent.indexOf("ucbrowser")> -1){
	        	broswer =  "UC浏览器";
	        }else if(userAgent.indexOf("qqbrowser")> -1){
	        	broswer =  "QQ浏览器";
	        }else if(userAgent.indexOf("opera")> -1){
	        	broswer =  "Opera";
	        }else if(userAgent.indexOf("edge")> -1){
	        	broswer = "Edge";
	        }else if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("msie") > -1){
	        	broswer = "IE";
	        }else if(userAgent.indexOf("firefox")> -1){
	        	broswer = "Firefox";
	        }else if(userAgent.indexOf("safari") > -1 && userAgent.indexOf("chrome") == -1){
	        	broswer = "Safari";
	        }else if(userAgent.indexOf("chrome") > -1 && userAgent.indexOf("safari") > -1){
	        	broswer = "Chrome";
	        }else if(userAgent.indexOf("gecko") > -1){
	        	broswer = "IE";
	        }else if(userAgent.indexOf("baiduspider") > -1){
	        	os =  "百度爬虫";
	        }else{
	        	broswer =  "其他";
	        }
			this.client.broswer = broswer;
		},
		setCookie : function(name, value, expires, domain, path) {// 设置Cookie
			D.cookie = name
					+ "="
					+ escape(value)
					+ (expires == null ? "" : "; expires=" + expires.toGMTString());
		},
		getCookie : function(name) {// 获取cookie
			if (name = RegExp("(^| )" + name + "=([^;]*)(;|$)").exec(D.cookie)) {
				return name[2] || "";
			}
			return "";
		},
		postData : function() {// 发送数据
			var param = [];
			for ( var i in this.client) {
				var h = E(this.client[i]);
				if (h)
					param.push(i + '=' + h);
			}
			var a = new Image(1, 1);
			a.src = interfaceURL + '?' + param.join('&');
		},
		init : function() {
				this.getUrl();
				this.getRnd();
				this.getUV();
				this.getId();
				this.getColorDepth();
				this.getCookieEnabled();
				this.getFlash();
				this.getJavaEnabled();
				this.getLanguage();
				this.getRef();
				this.getResolution();
				this.getTitle();
				this.getOs();
				this.getBroswer();
				//发送数据到接口
				this.postData();
		}
	};
	$(function(){
		VISIT.init();
		var visit_second = 0;
		window.setInterval(function () {
			visit_second ++;
		}, 1000);
		window.onbeforeunload = function() {
			var interfaceURL = appUrl + '/openapi/visit/visittime.do?pageId='+visit_pageid+"&usedTime="+visit_second;
			var a = new Image(1, 1);
			a.src = interfaceURL;
		};
	})
})();

function showVisitNum(siteId, channelId, infoId){
	var interfaceURL = appUrl + '/openapi/visit/pv.do';//统计接口
	interfaceURL = interfaceURL + "?siteId="+siteId+"&channelId="+channelId+"&infoId="+infoId+"&showType=1";
	document.write("<script type='text/javascript' src='" + interfaceURL + "'></script>");
}
