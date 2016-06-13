(function($){
	
	var hjdwMap = null;
	var zjcgMap = null;
	var sjlMap = null;
	$.manageResult = function(){
		resize();
		initPage();
		initMap();
	}
	var baseUrl = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer";
	var dynamicUrl = "http://localhost:6080/arcgis/rest/services/ArcGIS10_2%E5%85%A8%E5%9B%BD%E5%9B%BE/MapServer";
	var dynamicUrl1 = "http://192.168.44.231:6080/arcgis/rest/services/ChinaSDE/MapServer";
	var dynamicLayerUrl = "http://ncportal.esrichina.com.cn/arcgis/rest/services/chinaBase/MapServer";
	function initMap(){
		require([
			"esri/map",
			"esri/SpatialReference",
			"esri/geometry/Extent",
			"esri/layers/ArcGISTiledMapServiceLayer",
			"esri/layers/ArcGISDynamicMapServiceLayer",			
			"dojo/domReady!"
		], function(Map, SpatialReference,
			Extent, AGSTMSLayer,
			AGSDMSLayer
		){
			
			var extent = new Extent({
				xmin:46424797.08225821,
				ymin:47907.74683072558,
				xmax:57128427.02708517,
				ymax:7454350.039549194, 
				spatialReference:{wkid:3857}});
			hjdwMap = new Map('map_HJCL',{
				center:[79,42],
				zoom:4,
				//extent:extent,
				slider:false
			});
			//hjdwMap.isScrollWheelZoom =false;
			hjdwMap.disableScrollWheelZoom();
			
			hjcsMap = new Map('map_HJCL_CS',{
				center:[79,42],
				zoom:4,
				//extent:extent,
				slider:false
			});
			//hjcsMap.isScrollWheelZoom =false;
			hjcsMap.disableScrollWheelZoom();
			
			hjdkMap = new Map('map_HJCL_DK',{
				center:[79,42],
				zoom:4,
				//extent:extent,
				slider:false
			});
			//hjdkMap.isScrollWheelZoom =false;
			hjdkMap.disableScrollWheelZoom();
			
			
			zjcgMap = new Map('map_ZJCG',{
				center:[79,42],
				zoom:4,
				//extent:extent,
				slider:false
			});
			zjcgMap.disableScrollWheelZoom();
			sjlMap = new Map('map_SJL',{
				center:[79,42],
				zoom:4,
				//extent:extent,
				slider:false
			});
			sjlMap.disableScrollWheelZoom();
			
			var blayer_1 = new AGSTMSLayer(baseUrl);
			var blayer_2 = new AGSTMSLayer(baseUrl);
			var blayer_3 = new AGSTMSLayer(baseUrl);
			var blayer_4 = new AGSTMSLayer(baseUrl);
			var blayer_5 = new AGSTMSLayer(baseUrl);
			hjdwMap.addLayer(blayer_1);
			hjcsMap.addLayer(blayer_4);
			hjdkMap.addLayer(blayer_5);
			
			
			var dlayer_1 = new AGSDMSLayer(dynamicLayerUrl);
			var dlayer_2 = new AGSDMSLayer(dynamicLayerUrl);
			var dlayer_3 = new AGSDMSLayer(dynamicLayerUrl);
			var dlayer_4 = new AGSDMSLayer(dynamicLayerUrl);
			var dlayer_5 = new AGSDMSLayer(dynamicLayerUrl);
			//dlayer.setVisibleLayers([9]);
			hjdwMap.addLayer(dlayer_1);
			hjcsMap.addLayer(dlayer_4);
			hjdkMap.addLayer(dlayer_5);
			
			
			zjcgMap.addLayer(blayer_2);
			sjlMap.addLayer(blayer_3);
			zjcgMap.addLayer(dlayer_2);
			sjlMap.addLayer(dlayer_3);
			
			
		});
	
				
	}
	//汇交进展
	$("hjjz_hjdy").on('click', function(){
		console.log("汇交进展");
	});
	//空间分布
	$("kjfb_hjdy").on('click', function(){
		$("map_HJCL").css('margin-top','-747px');
	});
	//汇交地块
	$("hjdk_hjdy").on('click', function(){
		
	});
	
	//汇交单元选项卡
	$("#hjdy_change").on('click', function(){
		console.log("汇交单元选项卡");
		
		//时间控件
		$('#startTimeSet').dateRangePicker(
	    {
			startOfWeek: 'monday',
	    	format: 'YYYY-MM-DD',
	    });
		
		var shengArray;
		var shiArray;
		
		var promise = $.ajax({
				type:"get",
				url:"json/district.json",
				async:false,				
				dataType:"json",
				success:function(res){
				
				shengArray = {value:[]};
				console.log("地市级数据",res);
				console.log("object",res[0]);
				for(var i = 0;i < res[0].length;i++){
					shengArray.value.push(res[0][i].pro);
				}
				
				shiArray = {value:[]};
				
				//市级菜单
				var shiSuggest = $("#shiIpt_hjdyxxk").bsSuggest({
							ignorecase:true,
							showHeader:true,
							showBtn:false,
							delayUntilKeyup:false,
							indexId: 3,  //data.value 的第几个数据，作为input输入框的内容
					        indexKey: 1, //data.value 的第几个数据，作为input输入框的内容
					        data: shiArray
						});
				
				
				//省级菜单
				var shengSuggest = $("#shengIpt_hjdyxxk").bsSuggest({
					ignorecase:true,
					showHeader:true,
					showBtn:false,
					delayUntilKeyup:false,
					indexId: 3,  //data.value 的第几个数据，作为input输入框的内容
			        indexKey: 1, //data.value 的第几个数据，作为input输入框的内容
			        data: shengArray
				}).on('onSetSelectValue', function(e,keyword,data){
						
						//将市级级联内容定为无
						$('#shiIpt_hjdyxxk').val("全部");
						
						shiSuggest.bsSuggest('destroy');
						
						shiArray = {value:[]};
						
						for(var i = 0;i<res[1].length;i++){
							if(keyword.id == res[1][i].city.parentID){
								shiArray.value.push(res[1][i].city);
							}
						}
						
						shiSuggest = $("#shiIpt_hjdyxxk").bsSuggest({
							ignorecase:true,
							showHeader:true,
							showBtn:false,
							delayUntilKeyup:false,
							indexId: 3,  //data.value 的第几个数据，作为input输入框的内容
					        indexKey: 1, //data.value 的第几个数据，作为input输入框的内容
					        data: shiArray
						});
						console.log("shiArray",shiArray);
				});
			
			
				},
				error:function(err){
					console.log("联动菜单错误",err);
					
				}
				
			});
		
		
	});
	
	//汇交数量
	$(".hjslbqy").on('click', function(e){
		$(".container_hjdy_right").show();
		$(".container_hjdy_right1").hide();
		$(".container_hjdy_right2").hide();
	});
	
	//汇交次数
	$(".hjcsbqy").on('click', function(e){
		$(".container_hjdy_right").hide();
		$(".container_hjdy_right1").show();
		$(".container_hjdy_right2").hide();
	});
	
	//汇交地块
	$(".hjdkbqy").on('click', function(e){
		$(".container_hjdy_right").hide();
		$(".container_hjdy_right1").hide();
		$(".container_hjdy_right2").show();
	});
	
	//汇交单元开始统计按钮
	$('#StartStatistics').on('click',function(e){
		console.log("开始统计");
		//获取省、市框内条件
//		$('shengIpt_hjdyxxk').val();
		console.log($('#shengIpt_hjdyxxk'));
		//获取时间范围条件
		
		//提交开始统计结果
	});
	
	function resize(){
		var he1 = ($("#paneLevel1").height() - $(".hjgl_TabPane").height()-10)+"px";
		var wid1 = ($("#paneLevel1").width()*0.95)+"px";
		$("#tabContentDiv").height(he1);
		$("#tabContentDiv").width(wid1);
				
	}
	$(window).resize(resize);
	function initPage(){
		
		console.log("开始初始化页面");
		renderFirstProChart();
		renderHJCGLProChart();
		renderHJCGRProChart();
		
		renderBiliQuan();
		
		//汇交次数表格
		renderBiliQuanCS();
		//汇交地块数量
		renderBiliQuanDK();
		
//		$(".hjdy_change").click(function(){
//			console.log("ssssssshhhhhhh");
//		});
	}
		
	//七大类文件汇交情况
	function renderHJCGLProChart(){
		console.log("文件汇交");
		//获取文件数据
		var promise_hjcgl = $.ajax({
			type:"post",
			url:app.postUrls.getHJZTQKUrl,
			dataType:'json',
			async:true,
			success:function(res){
				
				//表格中填充值
				$('.qgyhjxsl').text(res.yhjxsl);
				$('.qgzhjcs').text(res.hjcs);
				$('.hjcgl').text(Math.floor(res.hjcgl)+"%");
				
				var temp = Math.floor(res.sjbdx);
				var testLength = temp.toString().length;
				var value = "";
				if(testLength >= 9 && testLength <= 13){
					//GB
					value = temp/1024/1024/1024;
					$('.zsjldx').text(Math.floor(Math.floor(value)));
				}else if(testLength> 13 && testLength <= 16){
					//TB
					value = temp/1024/1024/1024/1024;
					$('.zsjldx').text(Math.floor(Math.floor(value)));
				}else if(testLength > 16){
					//PB
					value = temp/1024/1024/1024/1024/1024;
					$('.zsjldx').text(Math.floor(Math.floor(value)));
				}
				//$('.zsjldx').text(Math.floor(res.sjbdx));
				
				var myChart = echarts.init(document.getElementById("hjcgl_cggl"),"shine");
				var option = {
				    
				    tooltip : {
				       trigger: 'axis'
				    },
				    grid:{
				    	x :5,
				    	x2:30,
				    	y:34,
				    	y2:34
				    },
				    toolbox: {
				        show : true,
				        orient : 'vertical',
		                x: 'right', 
		                y: 'center',
				        feature : {		          
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            data : ['矢量数据','栅格数据','汇总表格','权属数据','图件数据','文字报告','其他数据']
				        }
				    ],
				    yAxis : [
				        {
				            type: 'value',
				            min: 0,
				            max: 120000,
				            interval: 20000,
				            axisLabel: {
				                formatter: '{value} 个'
				            }
				        }
				    ],
				    series : [
		        {
		            name:'数据量',
		            type:'bar',
		            data:[res.wjlb[3].wjsl,res.wjlb[4].wjsl,res.wjlb[6].wjsl,res.wjlb[5].wjsl,res.wjlb[0].wjsl,res.wjlb[2].wjsl,res.wjlb[1].wjsl],
		            itemStyle: {
			                normal: {
			                    color: function(params) {
			                        // build a color map as your need.
			                        var colorList = [
			                          '#C1232B','#B5C334','#E87C25','#27727B','#C6E579',
			                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
			                           '#D7504B','#F4E001','#F0805A','#26C0C0','#FCCE10'
			                        ];
			                        return colorList[params.dataIndex]
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			                        formatter: '{c}',		                        
			                        color:"#F0805A",
			                        textStyle:{
			                        	fontSize:14
			                        }
			                    }
			                }
			            },
		           
		        }
		    ]
				};
				myChart.setOption(option);
				
			},
			error:function(err){
				console.log("信息报错",err);
				
			}
		});
		
		
		
	}
	
	//质检大类错误统计
	function renderHJCGRProChart(){
		//获取文件数据
		var promise = $.ajax({
		type:"post",
		url:app.postUrls.getZJZTQKUrl,
		dataType:'json',
		async:true,
		success:function(res){
			//表格中填充值
			$('.sjzjcs').text(res.zjcs);
			$('.sjzjtgl').text(Math.floor(res.tgl)+"%");
			$('.zjcwzj').text(res.cwzs);
			
			var temp = Math.floor(res.zjsjzdx);
			var testLength = temp.toString().length;
			var value = "";
			if(testLength >= 9 && testLength <= 13){
				//GB
				value = temp/1024/1024/1024;
				$('.ljzjsjl').text(Math.floor(Math.floor(value)));
			}else if(testLength> 13 && testLength <= 16){
				//TB
				value = temp/1024/1024/1024/1024;
				$('.ljzjsjl').text(Math.floor(Math.floor(value)));
			}else if(testLength > 16){
				//PB
				value = temp/1024/1024/1024/1024/1024;
				$('.ljzjsjl').text(Math.floor(Math.floor(value)));
			}
			//$('.ljzjsjl').text(res.zjsjzdx);	
		
		var myChart = echarts.init(document.getElementById("zjcgl_cggl"),"shine");
		var option = {
		    
		    tooltip : {
		       trigger: 'axis'
		        
		    },
		    grid:{
		    	x :5,
		    	x2:30,
		    	y:34,
		    	y2:34
		    },
		    toolbox: {
		        show : true,
		        orient : 'vertical',
                x: 'right', 
                y: 'center',
		        feature : {		          
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : ['数据完整性','矢量数据','权属数据','栅格数据元数据','数据一致性','汇交材料一致性']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'数据量',
		            type:'bar',
		            data:[res.sjwzx,res.slsjsx,res.qssj,res.sgsj,res.sjyzx,res.hjclyzx],
		            itemStyle: {
			                normal: {
			                    color: function(params) {
			                        // build a color map as your need.
			                        var colorList = [
			                          '#C1232B','#B5C334','#E87C25','#27727B','#C6E579',
			                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
			                           '#D7504B','#F4E001','#F0805A','#26C0C0','#FCCE10'
			                        ];
			                        return colorList[params.dataIndex]
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			                        formatter: '{c}',		                        
			                        color:"#F0805A",
			                        textStyle:{
			                        	fontSize:14
			                        }
			                    }
			                }
			            },
		           
		        }
		    ]
		};
		myChart.setOption(option);
		},
			error:function(err){
				console.log("信息报错",err);
				
			}
		});
		
	}
	
	//时态状图
	function renderFirstProChart(){
		
		var cityArray;
		var hjxslArray;
		var hjsjbslArray;
		var hjcglArray;
		
		//获取文件数据
		var promise_hjcgl = $.ajax({
			type:"post",
			url:app.postUrls.getQGHGSJUrl,
			dataType:'json',
			async:true,
			success:function(res){
			cityArray = new Array();	
			for(var i = 0;i < res.value.length;i++){
				if("新疆维吾尔族自治区" == res.value[i].sheng){
					cityArray.push("新疆");
				}else if("西藏自治区" == res.value[i].sheng){
					cityArray.push("西藏");
				}else{
					cityArray.push(res.value[i].sheng);
				}
			}
			
			//汇交县数量
			hjxslArray = new Array();
			for(var i = 0;i < res.value.length;i++){
				hjxslArray.push(res.value[i].hjxsl);
			}
			
			//汇交数据包数量
			hjsjbslArray = new Array();
			for(var i = 0;i < res.value.length;i++){
				hjsjbslArray.push(res.value[i].hjsjbsl);
			}
			
			//汇交成功率
			hjcglArray = new Array();
			for(var i = 0;i < res.value.length;i++){
				if(undefined == res.value[i].hjcgl){
					hjcglArray.push(0);
				}else{
					hjcglArray.push(Math.ceil(res.value[i].hjcgl));
				}
			}
			
			var myChart = echarts.init(document.getElementById("firstPro_cggl"),"inforgraphic");
			var option = {
					    tooltip : {
					        trigger: 'axis'
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            magicType: {show: true, type: ['line', 'bar']},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    calculable : true,
					    legend: {
					        data:['汇交县数量','汇交数据包数量','汇交成功率']
					    },
					    xAxis : [
					        {
					            type : 'category',
					            data : cityArray
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            name : '汇交县',
					            axisLabel : {
					                formatter: '{value} 个'
					            },
					            max : 100
					        },
					        {
					            type : 'value',
					            name : '成功率',
					            axisLabel : {
					                formatter: '{value} %'
					            }
					        }
					    ],
					    series : [
					
					        {
					            name:'汇交县数量',
					            type:'bar',
					            data:hjxslArray
					        },
					        {
					            name:'汇交数据包数量',
					            type:'bar',
					            data:hjsjbslArray
					        },
					        {
					            name:'汇交成功率',
					            type:'line',
					            yAxisIndex: 1,
//								type:'bar',
					            data:hjcglArray
					        }
					    ]
					};
				myChart.setOption(option);
			},
			error:function(err){
				console.log("信息报错",err);
				
			}
		});
			
	}
	
	//汇交单元渲染
	function renderBiliQuan(){
		var myChart = echarts.init(document.getElementById("chart_HJCL"),"inforgraphic");
		var option = {
		    tooltip : {
		        trigger: 'axis'
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    legend: {
		        data:['汇交单元提交数','汇交单元通过数','通过率','汇交率']
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['2016-1月','2016-2月','2016-3月','2016-4月','2016-5月','2016-6月','2016-7月','2016-8月','2016-9月','2016-10月','2016-11月','2016-12月']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            name : '数量',
		            axisLabel : {
		                formatter: '{value} 个'
		            }
		        },
		        {
		            type : 'value',
		            name : '百分比',
		            axisLabel : {
		                formatter: '{value} %'
		            }
		        }
		    ],
		    series : [
		
		        {
		            name:'汇交单元提交数',
		            type:'bar',
		            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 13.6, 12.2, 32.6, 20.0, 6.4, 3.3]
		        },
		        {
		            name:'汇交单元通过数',
		            type:'bar',
		            data:[2.6, 5.9, 90, 29.4, 22.7, 40.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3]
		        },
		        {
		            name:'通过率',
		            type:'line',
		            yAxisIndex: 1,
		            data:[2.0, 2.2, 33.3, 24.5, 16.3, 15.2, 30.3, 43.4, 23.0, 16.5, 12.0, 6.2]
		        },
		        {
		            name:'汇交率',
		            type:'line',
		            yAxisIndex: 1,
		            data:[2.0, 3.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 19.5, 32.0, 26.2]
		        }
		    ]
		};
		myChart.setOption(option);
		
		//饼状图
		var myChart2 = echarts.init(document.getElementById("chart_HJCL2"),"inforgraphic");
		var option2 = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        x: 'left',
			        data:['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江',
	                    '上海','江苏','浙江','安徽','福建','江西','山东','河南',
	                    '湖北','湖南','广东','广西','海南','重庆','四川','贵州',
	                    '云南','西藏','陕西','甘肃','青海','宁夏','新疆']
			    },
			    series: [
			        {
			            name:'汇交单元数量',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '20%'],
			
			            label: {
			                normal: {
			                    position: 'inner'
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                {value:335, name:'北京',selected:true},
			                {value:310, name:'天津'},
			                {value:234, name:'河北'},
			                {value:135, name:'山西'},
			                {value:1048, name:'内蒙古'},
			                {value:251, name:'辽宁'},
			                {value:147, name:'吉林'},
			                {value:335, name:'黑龙江'},
			                {value:310, name:'上海'},
			                {value:234, name:'江苏'},
			                {value:135, name:'浙江'},
			                {value:1048, name:'安徽'},
			                {value:251, name:'福建'},
			                {value:147, name:'江西'},
			                {value:335, name:'山东'},
			                {value:310, name:'河南'},
			                {value:234, name:'湖北'},
			                {value:135, name:'湖南'},
			                {value:1048, name:'广东'},
			                {value:251, name:'广西'},
			                {value:147, name:'重庆'},
			                {value:335, name:'四川'},
			                {value:310, name:'贵州'},
			                {value:234, name:'云南'},
			                {value:135, name:'西藏'},
			                {value:1048, name:'陕西'},
			                {value:251, name:'甘肃'},
			                {value:147, name:'青海'},
			                {value:335, name:'宁夏'},
			                {value:310, name:'新疆'}
			            ]
			        },
			        {
			            name:'汇交单元提交数量',
			            type:'pie',
			            radius: ['40%', '55%'],			
			            data:[
			                {value:335, name:'北京'},
			                {value:310, name:'天津'},
			                {value:234, name:'河北'},
			                {value:135, name:'山西'},
			                {value:1048, name:'内蒙古'},
			                {value:251, name:'辽宁'},
			                {value:147, name:'吉林'},
			                {value:335, name:'黑龙江'},
			                {value:310, name:'上海'},
			                {value:234, name:'江苏'},
			                {value:135, name:'浙江'},
			                {value:1048, name:'安徽'},
			                {value:251, name:'福建'},
			                {value:147, name:'江西'},
			                {value:335, name:'山东'},
			                {value:310, name:'河南'},
			                {value:234, name:'湖北'},
			                {value:135, name:'湖南'},
			                {value:1048, name:'广东'},
			                {value:251, name:'广西'},
			                {value:147, name:'重庆'},
			                {value:335, name:'四川'},
			                {value:310, name:'贵州'},
			                {value:234, name:'云南'},
			                {value:135, name:'西藏'},
			                {value:1048, name:'陕西'},
			                {value:251, name:'甘肃'},
			                {value:147, name:'青海'},
			                {value:335, name:'宁夏'},
			                {value:310, name:'新疆'}
			            ]
			        },
			        {
			            name:'汇交单元通过数量',
			            type:'pie',
			            radius: ['75%', '90%'],
			
			            data:[
			                {value:335, name:'北京'},
			                {value:310, name:'天津'},
			                {value:234, name:'河北'},
			                {value:135, name:'山西'},
			                {value:1048, name:'内蒙古'},
			                {value:251, name:'辽宁'},
			                {value:147, name:'吉林'},
			                {value:335, name:'黑龙江'},
			                {value:310, name:'上海'},
			                {value:234, name:'江苏'},
			                {value:135, name:'浙江'},
			                {value:1048, name:'安徽'},
			                {value:251, name:'福建'},
			                {value:147, name:'江西'},
			                {value:335, name:'山东'},
			                {value:310, name:'河南'},
			                {value:234, name:'湖北'},
			                {value:135, name:'湖南'},
			                {value:1048, name:'广东'},
			                {value:251, name:'广西'},
			                {value:147, name:'重庆'},
			                {value:335, name:'四川'},
			                {value:310, name:'贵州'},
			                {value:234, name:'云南'},
			                {value:135, name:'西藏'},
			                {value:1048, name:'陕西'},
			                {value:251, name:'甘肃'},
			                {value:147, name:'青海'},
			                {value:335, name:'宁夏'},
			                {value:310, name:'新疆'}
			            ]
			        }
			    ]
			};
		myChart2.setOption(option2);
	}
	
	function renderBiliQuanCS(){
		var myChart = echarts.init(document.getElementById("chart_HJCL_CS"),"inforgraphic");
		option = {
		    title : {
		        text: '汇交次数',
		        subtext: '汇交次数',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data: ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江',
	                    '上海','江苏','浙江','安徽','福建','江西','山东','河南',
	                    '湖北','湖南','广东','广西','海南','重庆','四川','贵州',
	                    '云南','西藏','陕西','甘肃','青海','宁夏','新疆']
		    },
		    series : [
		        {
		            name: '汇交次数',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		                {value:335, name:'北京'},
			                {value:310, name:'天津'},
			                {value:234, name:'河北'},
			                {value:135, name:'山西'},
			                {value:1048, name:'内蒙古'},
			                {value:251, name:'辽宁'},
			                {value:147, name:'吉林'},
			                {value:335, name:'黑龙江'},
			                {value:310, name:'上海'},
			                {value:234, name:'江苏'},
			                {value:135, name:'浙江'},
			                {value:1048, name:'安徽'},
			                {value:251, name:'福建'},
			                {value:147, name:'江西'},
			                {value:335, name:'山东'},
			                {value:310, name:'河南'},
			                {value:234, name:'湖北'},
			                {value:135, name:'湖南'},
			                {value:1048, name:'广东'},
			                {value:251, name:'广西'},
			                {value:147, name:'重庆'},
			                {value:335, name:'四川'},
			                {value:310, name:'贵州'},
			                {value:234, name:'云南'},
			                {value:135, name:'西藏'},
			                {value:1048, name:'陕西'},
			                {value:251, name:'甘肃'},
			                {value:147, name:'青海'},
			                {value:335, name:'宁夏'},
			                {value:310, name:'新疆'}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		myChart.setOption(option);
	}
	
	function renderBiliQuanDK(){
		var myChart = echarts.init(document.getElementById("chart_HJCL_DK"),"inforgraphic");
		option = {
		    title : {
		        text: '汇交地块数量',
		        subtext: '汇交地块数量',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data: ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江',
	                    '上海','江苏','浙江','安徽','福建','江西','山东','河南',
	                    '湖北','湖南','广东','广西','海南','重庆','四川','贵州',
	                    '云南','西藏','陕西','甘肃','青海','宁夏','新疆']
		    },
		    series : [
		        {
		            name: '汇交地块数量',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		                {value:335, name:'北京'},
			                {value:310, name:'天津'},
			                {value:234, name:'河北'},
			                {value:135, name:'山西'},
			                {value:1048, name:'内蒙古'},
			                {value:251, name:'辽宁'},
			                {value:147, name:'吉林'},
			                {value:335, name:'黑龙江'},
			                {value:310, name:'上海'},
			                {value:234, name:'江苏'},
			                {value:135, name:'浙江'},
			                {value:1048, name:'安徽'},
			                {value:251, name:'福建'},
			                {value:147, name:'江西'},
			                {value:335, name:'山东'},
			                {value:310, name:'河南'},
			                {value:234, name:'湖北'},
			                {value:135, name:'湖南'},
			                {value:1048, name:'广东'},
			                {value:251, name:'广西'},
			                {value:147, name:'重庆'},
			                {value:335, name:'四川'},
			                {value:310, name:'贵州'},
			                {value:234, name:'云南'},
			                {value:135, name:'西藏'},
			                {value:1048, name:'陕西'},
			                {value:251, name:'甘肃'},
			                {value:147, name:'青海'},
			                {value:335, name:'宁夏'},
			                {value:310, name:'新疆'}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		myChart.setOption(option);
	}
	
	
})(jQuery);
