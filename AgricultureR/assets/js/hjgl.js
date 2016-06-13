jQuery.ajaxSetup({
	cache:true
});
$(function(){
	
	function getParamFromHref(strName){
		var urlHref = window.document.location.href;
		var intPos = urlHref.indexOf("?");
		var params = urlHref.substr(intPos+1);
		var attParams = params.split("&");
		for(var i = 0; i < attParams.length;i++){
			var param = attParams[i].split("=");
			if(param[0].toLowerCase()===strName){
				return param[1];
			}
			else return "";
		}
	}
	var token = getParamFromHref("token");
	
	var app = window.app = {};
	app.token = token||"ddd";
	app.hjglFlag = 1;
	app.hjyyProgress = 1;
	urlTokenParm = "?token="+app.token;
	
	var IP = "192.168.44.232:8080/rest";
	//IP = "192.168.199.146:8080";
	
	app.postUrls =
		{
			//1	用户登录验证接口
			"login":"http://" +IP+ "/login" +urlTokenParm,
			//2	汇交预约数据提交单位查询接口
			"getHJDWRYXX":"http://" +IP+ "/hjyy/getHJDWRYXX"+urlTokenParm,
			//3	汇交预约数据提交用户查询接口
			"getHJRYXX":"http://" +IP+ "/hjyy/getHJRYXX"+urlTokenParm,
			//4	汇交预约数据提交用户增加接口
			"addhjyyyh":"http://" +IP+ "/hjyy/addhjyyyh"+urlTokenParm,
			//5	汇交预约数据包增加接口
			"addSJBXX":"http://" +IP+ "/hjyy/addSJBXX"+urlTokenParm,
			//6	汇交预约数据文件增加接口
			"addSJWJXX":"http://" +IP+ "/hjyy/addSJWJXX"+urlTokenParm,
			//7	汇交预约数据包状态更改接口
			"updateHJSBZT":"http://" +IP+ "/hjyy/updateHJSBZT" +urlTokenParm,
			//8	新增系统用户接口
			"addXTUser":"http://" +IP+ "/user/add" +urlTokenParm,
			//9	修改系统用户接口
			"updateXTUser":"http://" +IP+ "/user/update" +urlTokenParm,
			//10	删除系统用户接口
			"deleteXTUser":"http://" +IP+ "/user/delete" +urlTokenParm,
			//11	获取系统用户信息接口
			"getXTUser":"http://" +IP+ "/user/getUser" +urlTokenParm,
			//12	验证系统用户名是否存在接口
			"checkXTUser":"http://" +IP+ "/user/check" +urlTokenParm,
			//13	获取系统日志记录数量接口
			"getlogCount":"http://" +IP+ "/xtrz/getlogCount" +urlTokenParm,
			//14	获取系统日志记录信息接口
			"getlogInfo":"http://" +IP+ "/xtrz/getlogInfo" +urlTokenParm,
			//15	上传解析权属单位编码信息接口
			"uploadQSDWDMB":"http://" +IP+ "/hzbg/uploadQSDWDMB" +urlTokenParm,
			//16	上传解析地块汇总表接口
			"uploadDKHZB":"http://" +IP+ "/hzbg/uploadDKHZB" +urlTokenParm,
			//17	上传解析承包地是否基本农田接口
			"uploadCBDSFJBNT":"http://" +IP+ "/hzbg/uploadCBDSFJBNT" +urlTokenParm,
			//18	上传解析按权证信息汇总表接口
			"uploadQZXXHZ":"http://" +IP+ "/hzbg/uploadQZXXHZ" +urlTokenParm,
			//19	上传解析承包地土地用途汇总表接口
			"uploadCBTDYT":"http://" +IP+ "/hzbg/uploadCBTDYT" +urlTokenParm,
			//20	上传解析按承包方汇总表接口
			"uploadCBFHZ":"http://" +IP+ "/hzbg/uploadCBFHZ" +urlTokenParm,
			//21	上传解析按非承包地地块类别汇总表接口
			"uploadFCBDDKLB":"http://" +IP+ "/hzbg/uploadFCBDDKLB" +urlTokenParm,
			//22	获取汇交数据包表记录数量接口
			"getSJBCount":"http://" +IP+ "/hjgl/getSJBCount" +urlTokenParm,
			//23	获取汇交数据包简要信息接口
			"getSJBJYXX":"http://" +IP+ "/hjgl/getSJBJYXX" +urlTokenParm,
			//24	获取汇交数据包详细信息接口
			"getSJBXXXX":"http://" +IP+ "/hjgl/getSJBXXXX" +urlTokenParm,
			//25	修改汇交数据包详细信息接口
			//http://" +IP+ "/rest/hjgl/updateSJBXX
			"updateSJBXX":"http://" +IP+ "/hjgl/updateSJBXX"+urlTokenParm,			
			//26	修改汇交数据文件详细信息接口
			//http://" +IP+ "/rest/hjgl/updateHJSJWJ
			"updateHJSJWJ":"http://" +IP+ "/hjgl/updateHJSJWJ"+urlTokenParm,
			//27	查询汇交单位信息接口
			"getHJDWXXByName":"http://" +IP+ "/hjgl/getHJDWXXByName" +urlTokenParm,
			//28	修改汇交单位信息接口
			"updateHJDWXX":"http://" +IP+ "/hjgl/updateHJDWXX" +urlTokenParm,
			//29	查询汇交人员信息接口
			//http://" +IP+ "/rest/hjgl/getHJDWXXByName
			"getHJDWXXByName":"http://" +IP+ "/hjgl/getHJDWXXByName"+urlTokenParm,
			//30	修改汇交人员信息接口
			//http://" +IP+ "/rest/hjgl/updateHJRYXX
			"updateHJRYXX":"http://" +IP+ "/hjgl/updateHJRYXX"+urlTokenParm,
			//31	权属单位编码信息入库接口
			//http://" +IP+ "/rest/hzbg/addQSDWDMB
			"addQSDWDMB":"http://" +IP+ "/hzbg/addQSDWDMB"+urlTokenParm,
			//32	地块汇总表入库接口
			//http://" +IP+ "/rest/hzbg/addDKHZB
			"addDKHZB":"http://" +IP+ "/hzbg/addDKHZB"+urlTokenParm,
			//33	承包地是否基本农田入库接口
			//http://" +IP+ "/rest/hzbg/addCBDSFJBNTB
			"addCBDSFJBNTB":"http://" +IP+ "/hzbg/addCBDSFJBNTB"+urlTokenParm,
			//34	按权证信息汇总表入库接口
			//http://" +IP+ "/rest/hzbg/addQZXXHZB
			"addQZXXHZB":"http://" +IP+ "/hzbg/addQZXXHZB"+urlTokenParm,
			//35	承包地土地用途汇总表入库接口
			//http://" +IP+ "/rest/hzbg/addCBTDYTHZB
			"addCBTDYTHZB":"http://" +IP+ "/hzbg/addCBTDYTHZB"+urlTokenParm,
			//36	承包方汇总表入库接口
			//http://" +IP+ "/rest/hzbg/addCBFHZB
			"addCBFHZB":"http://" +IP+ "/hzbg/addCBFHZB"+urlTokenParm,
			//37	非承包地地块类别汇总表入库接口
			//http://" +IP+ "/rest/hzbg/addFCBDKLBHZB
			"addFCBDKLBHZB":"http://" +IP+ "/hzbg/addFCBDKLBHZB"+urlTokenParm,		
			//38	新增质检审核信息表入库接口
			//http://" +IP+ "/rest/hzbg/addSHZJXX
			"addSHZJXX":"http://" +IP+ "/hzbg/addSHZJXX"+urlTokenParm,
			//39  json数据包上传
			"uploadParJson": "http://" +IP+ "/hzbg/uploadParJson"+urlTokenParm,
			//40	修改质检审核信息表备注接口
			//http://" +IP+ "/rest/hzbg/updateSHZJXX
			"updateSHZJXX":"http://" +IP+ "/hzbg/updateSHZJXX"+urlTokenParm,
			/**************/
			//41获取用户信息接口
			"getUsertUrl":"http://" +IP+ "/user/getUser" +urlTokenParm,
			//42新增用户时，验证用户名重复性接口
			"yzUserUrl":"http://" +IP+ "/user/check" +urlTokenParm,
			//43、新增用户接口
			"AddUsertUrl":"http://" +IP+ "/user/add" +urlTokenParm,
			//44、删除用户接口
			"deleUserUrl":"http://" +IP+ "/user/delete" +urlTokenParm,
			//45、修改用户接口
			"XGUserPostUrl":"http://" +IP+ "/user/update" +urlTokenParm,
			//46、获取日志数量接口
			"xtrzNumUrl":"http://" +IP+ "/xtrz/getlogCount"+urlTokenParm,
			//47、获取日志信息接口
			"xtrzDetailUrl":"http://" +IP+ "/xtrz/getlogInfo" +urlTokenParm,
			//48、查询汇交单位信息接口
			"hjdwDetailUrl":"http://" +IP+ "/hjgl/getHJDWXXByName" +urlTokenParm,
			//49、修改汇交单位信息接口
			"hjdwUpdateUrl":"http://" +IP+ "/hjgl/updateHJDWXX" +urlTokenParm,
			//50、查询汇交人员信息接口
			"hjryDetailUrl":"http://" +IP+ "/hjgl/getHJRYXX" +urlTokenParm,
			//51、修改汇交人员信息接口
			"hjryUpdateUrl":"http://" +IP+ "/hjgl/updateHJRYXX" +urlTokenParm,
			//52、获取全国汇交数据情况信息接口
			"getHJZTQKUrl":"http://" +IP+ "/cggl/getHJZTQK" +urlTokenParm,
			//53、获取全国质检数据情况信息接口
			"getZJZTQKUrl":"http://" +IP+ "/cggl/getZJZTQK" +urlTokenParm,
			//54、获取全国分省宏观情况信息接口
			"getQGHGSJUrl":"http://" +IP+ "/cggl/getQGHGSJ" +urlTokenParm,
			//52、通过行政区划获取汇交次数记录数量接口
			"getHJCSByXZQHUrl":"http://" +IP+ "/hjyy/getHJCSByXZQH" +urlTokenParm
			
		};
	initHJGL();
	var aa = null;
	
	$(".navMenu li").each(function(index){
		
		$(this).on('click', function(evt){
			
			$(".navMenu li a").attr("class","navDeactive");
			$(this).children("a").attr("class","navActive");
			
			$("#paneLevel1").empty();
			
			if(parseInt(index) == 0){
				//汇交预约
				app.hjyyProgress = 1;
				initHJGL();
			}
			else if(parseInt(index) == 1){
				//汇交处理
				$("#paneLevel1").empty();
				$.ajax({
					type:"get",
					url:"assets/hjglSeg-2.html",
					async:true,
					success:function(res){
						//console.log(res);
						$("#paneLevel1").html(res);
						$.getScript("assets/js/hjgl-2.js").then(function(){
							aa = null;
							aa = new $.hjclProcess();
						});
						//$('body').removeClass("modal-open");
						
						
					}
				});
			}else if(parseInt(index) == 2){
				//成果管理
				$("#paneLevel1").empty();
				$.ajax({
					type:"get",
					url:"assets/hjglSeg-3.html",
					async:true,
					success:function(res){
						//console.log(res);
						$("#paneLevel1").html(res);
						$.getScript("assets/js/hjgl-3.js").then(function(){
							aa = null;
							aa = new $.manageResult();
						});
						
						
						
					}
				});
				
			}else if(parseInt(index) == 3){
				//数据分析				
				$("#paneLevel1").empty();
				$.ajax({
					type:"get",
					url:"assets/hjglSeg-4.html",
					async:true,
					success:function(res){
						//console.log(res);
						$("#paneLevel1").html(res);
						$.getScript("assets/js/hjgl-4.js").then(function(){
							aa = null;
							aa = new $.managerResult();
						});
						
						
						
					}
				});
				
			}else if(parseInt(index) == 4){
				$("#paneLevel1").empty();
				
				$.ajax({
					type:"get",
					url:"assets/hjglSeg-5.html",
					async:true,
					success:function(res){
						//console.log(res);
						$("#paneLevel1").html(res);
						$.getScript("assets/js/hjgl-5.js").then(function(){
							aa = null;
							aa = new $.xtglProcess();
						});
						
						
					}
				});
				
			}
			
		});
	})
	
	function resize(){
		var width = (document.body.clientWidth)+"px";
		var height = (document.body.clientHeight - 114)+"px";
		$("#paneLevel1").height(height);
		$("#paneLevel1").width(width);
	}
	$(window).resize = resize();
	function initHJGL(){
		
		$("#paneLevel1").empty();
		$.ajax({
			type:"get",
			url:"assets/hjglSeg-1.html",
			async:true,
			success:function(res){
				//console.log(res);
				$("#paneLevel1").html(res);
				$.getScript("assets/js/hjyy.js");
			}
		});
	}
	
	//继续预约
	$("#hjyyRepeat").on('click', function(){
		
		app.hjyyProgress = 1;
		$("#paneLevel1").empty();
		$.ajax({
			type:"get",
			url:"assets/hjglSeg-1.html",
			async:true,
			success:function(res){
				//console.log(res);
				$("#paneLevel1").html(res);
				$.getScript("assets/js/hjyy.js");
			}
		});
	});
	//汇交处理
	$("#hjclBegin").on('click', function(){
		$(".navMenu li a").attr("class","navDeactive");
		$(".navMenu li:eq(1)").children("a").attr("class","navActive");
		$("#paneLevel1").empty();
		$.ajax({
			type:"get",
			url:"assets/hjglSeg-2.html",
			async:true,
			success:function(res){
				//console.log(res);
				$("#paneLevel1").html(res);
				$.getScript("assets/js/hjgl-2.js").then(function(){
					aa = null;
					aa = new $.hjclProcess();
				});			
				
			}
		});
	});	
	
	
})
