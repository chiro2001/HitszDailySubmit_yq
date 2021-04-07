const fs = require('fs');
const fetch = require('node-fetch');

var info = {
	uid: '',
	pwd: ''
};

var options = {
        flags: 'a',
        encoding: 'utf8',
};

var stdout = fs.createWriteStream('./stdout.log',options);
var stderr = fs.createWriteStream('./stderr.log',options);
var logger = new console.Console(stdout,stderr);

async function login(param){
	var JSESSIONID = undefined;
	return new Promise(resolve=>{fetch("http://xgsm.hitsz.edu.cn/zhxy-xgzs/xg_mobile/xs/yqxx", {
		  "headers": {
		    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
		    "upgrade-insecure-requests": "1"
		  },
		  "referrerPolicy": "strict-origin-when-cross-origin",
		  "body": null,
		  "method": "GET",
		  "mode": "cors"
		}).then(res=>{
			JSESSIONID = res.headers.get('set-cookie').match(/JSESSIONID=.*?;/g)[0];
			JSESSIONID = JSESSIONID.substr(11);
			JSESSIONID = JSESSIONID.substr(0,JSESSIONID.length-1);
			return res.text();
		}).then(text=>{
			var SSO_LT = text.match(/"LT.*?cas"/g)[0];
			SSO_LT = SSO_LT.substr(1);
			SSO_LT = SSO_LT.substr(0,SSO_LT.length-1);
			return SSO_LT;
		}).then(SSO_LT=>{
			fetch("https://sso.hitsz.edu.cn:7002/cas/login;jsessionid="+JSESSIONID+"?service=http%3A%2F%2Fxgsm.hitsz.edu.cn%2Fzhxy-xgzs%2Fcommon%2FcasLogin%3Fparams%3DL3hnX21vYmlsZS94cy95cXh4", {
			  "headers": {
			    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
			    "cache-control": "max-age=0",
			    "content-type": "application/x-www-form-urlencoded",
			    "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
			    "sec-ch-ua-mobile": "?0",
			    "sec-fetch-dest": "document",
			    "sec-fetch-mode": "navigate",
			    "sec-fetch-site": "same-origin",
			    "sec-fetch-user": "?1",
			    "upgrade-insecure-requests": "1",
			    "cookie": "JSESSIONID="+JSESSIONID+"; j_username="+param.uid
			  },
			  "referrer": "https://sso.hitsz.edu.cn:7002/cas/login?service=http%3A%2F%2Fxgsm.hitsz.edu.cn%2Fzhxy-xgzs%2Fcommon%2FcasLogin%3Fparams%3DL3hnX21vYmlsZS94cy95cXh4",
			  "referrerPolicy": "strict-origin-when-cross-origin",
			  "body": "username="+param.uid+"&password="+param.pwd+"&rememberMe=on&lt="+SSO_LT+"&execution=e1s1&_eventId=submit&vc_username=&vc_password=",
			  "method": "POST",
			  "mode": "cors",
			  "redirect": "manual"
			}).then(res=>{
				fetch(res.headers.get("location"), {
				  "headers": {
				    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
				    "upgrade-insecure-requests": "1",
				  },
				  "referrerPolicy": "strict-origin-when-cross-origin",
				  "body": null,
				  "method": "GET",
				  "mode": "cors",
				  "redirect":"manual"
				}).then(res=>{
					JSESSIONID = res.headers.get('set-cookie').match(/JSESSIONID=.*?;/g)[0];
					JSESSIONID = JSESSIONID.substr(11);
					JSESSIONID = JSESSIONID.substr(0,JSESSIONID.length-1);
					fetch("http://xgsm.hitsz.edu.cn/zhxy-xgzs/common/casLogin?params=L3hnX21vYmlsZS94cy95cXh4", {
					  "headers": {
					    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
					    "cache-control": "max-age=0",
					    "upgrade-insecure-requests": "1",
					    "cookie": "JSESSIONID="+JSESSIONID
					  },
					  "referrerPolicy": "strict-origin-when-cross-origin",
					  "body": null,
					  "method": "GET",
					  "mode": "cors",
					  "redirect": "manual"
					}).then(res=>{
						JSESSIONID = res.headers.get('set-cookie').match(/JSESSIONID=.*?;/g)[0];
						JSESSIONID = JSESSIONID.substr(11);
						JSESSIONID = JSESSIONID.substr(0,JSESSIONID.length-1);
						resolve(JSESSIONID);
					});
				});
			});
		});
	});
}

function Post(JSESSIONID){
	var num = Math.floor(Math.random()*10).toString();
	fetch("http://xgsm.hitsz.edu.cn/zhxy-xgzs/xg_mobile/xs/csh", {
	  "headers": {
	    "accept": "application/json, text/javascript, */*; q=0.01",
	    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
	    "x-requested-with": "XMLHttpRequest",
	    "cookie": "JSESSIONID="+JSESSIONID
	  },
	  "referrer": "http://xgsm.hitsz.edu.cn/zhxy-xgzs/xg_mobile/xs/yqxx",
	  "referrerPolicy": "strict-origin-when-cross-origin",
	  "body": null,
	  "method": "POST",
	  "mode": "cors"
	})
	.then(res=>res.json())
	.then(res=>{
		fetch("http://xgsm.hitsz.edu.cn/zhxy-xgzs/xg_mobile/xs/saveYqxx", {
	      "headers": {
	        "accept": "application/json, text/javascript, */*; q=0.01",
	        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
	        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
	        "proxy-connection": "keep-alive",
	        "x-requested-with": "XMLHttpRequest",
	        "cookie": "JSESSIONID="+JSESSIONID
	      },
	      "referrer": "http://xgsm.hitsz.edu.cn/zhxy-xgzs/xg_mobile/xs/editYqxx?id="+res.module+"&zt=01",
	      "referrerPolicy": "strict-origin-when-cross-origin",
	      "body": "info=%7B%22model%22%3A%7B%22id%22%3A%22"+res.module+"%22%2C%22stzkm%22%3A%2201%22%2C%22dqszd%22%3A%2201%22%2C%22hwgj%22%3A%22%22%2C%22hwcs%22%3A%22%22%2C%22hwxxdz%22%3A%22%22%2C%22dqszdsheng%22%3A%22440000%22%2C%22dqszdshi%22%3A%22440300%22%2C%22dqszdqu%22%3A%22440305%22%2C%22gnxxdz%22%3A%22%E5%93%88%E5%B7%A5%E5%A4%A7%E6%B7%B1%E5%9C%B3%22%2C%22dqztm%22%3A%2201%22%2C%22dqztbz%22%3A%22%22%2C%22brfsgktt%22%3A%220%22%2C%22brzgtw%22%3A%2236."+num+"%22%2C%22brsfjy%22%3A%22%22%2C%22brjyyymc%22%3A%22%22%2C%22brzdjlm%22%3A%22%22%2C%22brzdjlbz%22%3A%22%22%2C%22qtbgsx%22%3A%22%22%2C%22sffwwhhb%22%3A%220%22%2C%22sftjwhjhb%22%3A%220%22%2C%22tcyhbwhrysfjc%22%3A%220%22%2C%22sftzrychbwhhl%22%3A%220%22%2C%22sfjdwhhbry%22%3A%220%22%2C%22tcjtfs%22%3A%22%22%2C%22tchbcc%22%3A%22%22%2C%22tccx%22%3A%22%22%2C%22tczwh%22%3A%22%22%2C%22tcjcms%22%3A%22%22%2C%22gpsxx%22%3A%22%22%2C%22sfjcqthbwhry%22%3A%220%22%2C%22sfjcqthbwhrybz%22%3A%22%22%2C%22tcjtfsbz%22%3A%22%22%7D%7D",
	      "method": "POST",
	      "mode": "cors"
	    })
	    .then(res=>res.json())
	    .then(res=>{
	    	let time = new Date().toLocaleString();
	    	if(res.isSuccess)
	    		logger.log('['+time+']'+":Success and the temperature is 36."+num);
	    	else logger.error('['+time+']'+":Failed!");
	    });
	});
}

function keepPost(){
	login(info).then(JSESSIONID=>{
		Post(JSESSIONID);
	});
	setTimeout(keepPost,1000*3600*6);
}

keepPost();