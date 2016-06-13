(function($){
	
	var sjbztFD="",sjbztMS="";
	var sjbmsFD ="";
	$.chushenProcess = function(app){
		init();		
	}
	function init(){
		
		
		$("#countySpan_chushen").html(app.xianName);		
		$("#updateSJB_chushen").on('click',function(){
			$("#sjbms_chushen").removeAttr("disabled");
			$("input[name=chushenRes]").removeAttr("disabled");
			$("#hjsjbjz").removeAttr("disabled");
			
		});
		
		$("#saveSJB_chushen").on('click', function(){
			
			$("#sjbms_chushen").attr("disabled","disabled");
			$("input[name=chushenRes]").attr("disabled","disabled");
			$("#hjsjbjz").attr("disabled","disabled");
			
			var chushenFlag = $('input[name="sjbsc"]:checked').val();
			if(parseInt(chushenFlag) == 0){
				sjbztFD = "1008002";
				sjbztMS = "";
				
			}else if(parseInt(chushenFlag) == 1){
				sjbztFD = "1008001";
			}
			
			$.ajax({
				type:"post",
				url:app.postUrls.updateHJSBZT,
				async:true,
				dataType:"json",
				data:{
					"sjbbm":app.sjbbm,
					"sjbzt":sjbztFD
				},
				success:function(res){
					console.log("修改数据包状态成功",res);
				},
				error:function(err){
					console.log("修改数据包状态出错",err);
				}
			});
			sjbmsFD = $("#sjbms_chushen").val();
			$.ajax({
				type:"post",
				url:app.postUrls.updateSJBXX,
				async:true,
				dataType:"json",
				data:{
					"sjbbm":app.sjbbm,
					"sjbms":sjbmsFD
				},
				success:function(res){
					console.log("数据包备注修改成功",res);
				},
				error:function(err){
					console.log("数据包备注修改失败",err);
				}
			});
			
		});
		
		//
		$("#sjtjzmBtn").on('click', function(){
			fullfillSJTJZM();
			var HJCSByXzqh = null;
				//获取汇交次数
			$.ajax({
				type:"post",
				url:app.postUrls.getHJCSByXZQHUrl,
				dataType:'json',
				async:false,
				data:{
				"xzqh":app.xianbm
				},
				success:function(res){
					console.log("获取汇交次数记录数量：",res);
					HJCSByXzqh = res.count;
					
				},
				error:function(err){
					console.log("获取汇交次数记录数量：",err);
				}
			});
			console.log("汇交次数：",HJCSByXzqh);
			$("#SJTJZM").modal('show');			
			console.log("输出APP:",app);
			
			$("#dwTJZM").html(app.hjyhData.hjdwmc);
			$("#ryTJZM").html(app.hjyhData.hjrxm);
			$("#QuXian").html(app.xianName);
			
			$("#nTJZM").html(HJCSByXzqh);
			console.log('输出打印自动获取的数据：',app.xianName);
			//获取当前数据的时间
			var str = app.sjbData.tjsj.split('-')[0]+"年"+app.sjbData.tjsj.split('-')[1]+"月"+app.sjbData.tjsj.split('-')[2]+"日";			
		   	$("#dateTJZM").html(str);
			//获取各数据类型的大小和数量
			$("#sjbdxTJZM").html(app.sjbData.sjbdx);
			$("#slsjdxTJZM").html(((app.sjwjData[0].wjdxT)/1024/1024/1024).toFixed(3));
			$("#slsjslTJZM").html(app.sjwjData[0].wjslT);
			$("#sgsjdxTJZM").html(((app.sjwjData[1].wjdxT)/1024/1024/1024).toFixed(3));
			$("#sgsjslTJZM").html(app.sjwjData[1].wjslT);
			$("#hzbgdxTJZM").html(((app.sjwjData[2].wjdxT)/1024/1024/1024).toFixed(3));
			$("#hzbgslTJZM").html(app.sjwjData[2].wjslT);
			$("#tjsjdxTJZM").html(((app.sjwjData[3].wjdxT)/1024/1024/1024).toFixed(3));
			$("#tjsjslTJZM").html(app.sjwjData[3].wjslT);
			$("#qssjdxTJZM").html(((app.sjwjData[4].wjdxT)/1024/1024/1024).toFixed(3));
			$("#qssjslTJZM").html(app.sjwjData[4].wjslT);
			$("#wzbgdxTJZM").html(((app.sjwjData[5].wjdxT)/1024/1024/1024).toFixed(3));
			$("#wzbgslTJZM").html(app.sjwjData[5].wjslT);
			$("#qtzldxTJZM").html(((app.sjwjData[6].wjdxT)/1024/1024/1024).toFixed(3));
			$("#qtzlslTJZM").html(app.sjwjData[6].wjslT);
		});
		$("#printBtnSJTJ").on('click', function(){			
		    //打印		
			$("#printContentPane").jqprint({
				printContainer: false			
		
			});
		});
	
	
		function fullfillSJTJZM(){
			
		}
		
		
		
		
	}
	
	
})(jQuery)
