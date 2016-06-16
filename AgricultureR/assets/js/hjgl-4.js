jQuery.ajaxSetup({
	cache:true
});
(function($){
	var appSJFX = {};
	var filter = {};
	filter.bm = "0";
	filter.start = '0';
	filter.end = '0';
	
	var dUrl = "http://192.168.44.231:6080/arcgis/rest/services/ChinaMap/MapServer";
	var map;
	var filter;
	$.managerResult = function(){
		console.log("进入数据分析页面");
		initResize();
		initMap();
		initPage();
		initDomEvents();
		
	}
	
	function initResize(){
		var width = $("#paneLevel1").width()*0.95;
		var height = $("#paneLevel1").height() - 10;
		$("#hjglseg-4").height(height);
		$("#hjglseg-4").width(width);
		$("#queryPane").width(width);
		$("#filterPane").width(width*0.2);
		$("#containerPane").width(width*0.8 - 3.5);
		
		
	}
	
	$(window).resize(initResize);
	
	
		
	function initDomEvents(){
		$("#cbdytLink").on("click", function(){
			
			
		});
		$("#fcbdLink").on("click", function(){
			
			
		});
		$("#jbntLink").on("click", function(){
			
			
		});
		$("#qzxxLink").on("click", function(){
			
			
		});
		$("#cbfLink").on("click", function(){
			
			
		});
		var switchFlag = false;
		//浮动框折叠事件
		$("#switcher").on('click', function(){
			if(!switchFlag){
				$("#switcher").attr("src","img/right_big.png");
				$("#floatContainer_sjfx").attr('class','floatContainerOn');
				$("#switcher").attr('class','switcherOn');
				
				
				switchFlag = true;
			}else{
				$("#switcher").attr("src","img/left_big.png");
				$("#floatContainer_sjfx").attr('class','floatContainerOff');
				$("#switcher").attr('class','switcherOff');
				
				switchFlag = false;
			}
			
		});
	}
	
	
	var $dkhzTree = $("#dkhzTree");
	var $cbdytTree = $("#cbdytTree");
	var $fcbdTree = $("#fcbdTree");
	var $jbntTree = $("#jbntTree");
	var $qzxxTree = $("#qzxxTree");
	var $cbfTree = $("#cbfTree");
	
	function initPage(){
		console.log("数据分析页面初始化中...");
		
		//地块汇总条件树
		$dkhzTree.treeview({
			data:dkhzTree,
			nodeIcon:"glyphicon glyphicon-unchecked",
			selectedIcon: "glyphicon glyphicon-check",			
			multiSelect:true,
			onNodeSelected:function(event, data){
				console.log("条件选择",data);			
				
				if(data.nodeId == 0){										
					//console.log("条件选择",data);
					
					$dkhzTree.treeview('selectNode', 0,{silent:true});
					for(var i = 0; i<data.nodes.length;i++){
						$dkhzTree.treeview('selectNode', data.nodes[i].nodeId,{silent:true});
						
						
					}
				}else if(data.nodeId == 7){
					
					$dkhzTree.treeview('selectNode', 7,{silent:true});
					for(var i = 0; i<data.nodes.length;i++){
						$dkhzTree.treeview('selectNode', data.nodes[i].nodeId,{silent:true});
					}
				}
			},
			onNodeUnselected:function(event,data){
				console.log("包子",data);
												
				if(data.nodeId == 0){
					//console.log("条件选择",data);
					for(var i = 0; i<data.nodes.length;i++){
						$dkhzTree.treeview('unselectNode', data.nodes[i].nodeId,{silent:true});
						
					}
				}else if(data.nodeId == 7){
					for(var i = 0; i<data.nodes.length;i++){
						$dkhzTree.treeview('unselectNode', data.nodes[i].nodeId,{silent:true});
					}
				}
			}
			
		});
		
			
		$cbdytTree.treeview({
			data:cbdytTree,
			nodeIcon:"glyphicon glyphicon-unchecked",
			selectedIcon: "glyphicon glyphicon-check",
			multiSelect:true,
			onNodeSelected:function(event, data){
				console.log("条件选择",data);
			}
		});
		$fcbdTree.treeview({
			data:fcbdTree,
			nodeIcon:"glyphicon glyphicon-unchecked",
			selectedIcon: "glyphicon glyphicon-check",
			multiSelect:true,			
			onNodeSelected:function(event, data){
				console.log("条件选择",data);
			}
		});
		$jbntTree.treeview({
			data:jbntTree,
			nodeIcon:"glyphicon glyphicon-unchecked",
			selectedIcon: "glyphicon glyphicon-check",
			multiSelect:true,			
			onNodeSelected:function(event, data){
				console.log("条件选择",data);
			}
		});
		$qzxxTree.treeview({
			data:qzxxTree,
			nodeIcon:"glyphicon glyphicon-unchecked",
			selectedIcon: "glyphicon glyphicon-check",
			multiSelect:true,			
			onNodeSelected:function(event, data){
				console.log("条件选择",data);
			}
		});
		$cbfTree.treeview({
			data:cbfTree,
			nodeIcon:"glyphicon glyphicon-unchecked",
			selectedIcon: "glyphicon glyphicon-check",
			multiSelect:true,			
			onNodeSelected:function(event, data){
				console.log("条件选择",data);
				//$("#cbfTree").treeview("checkNode",data.nodeId,{silent:true});
			}
			
		});
	}
	//地块汇总
	var dkhzTree = [
	  {
	    text: "统计指标",
	    state: {
	      checked: false,
	      disabled: false,
	      expanded: true
	    },
	    nodes: [	      
	        {
	           text: "发包方数量",	           
	           name:"fbfsl"
	        },
	        {
	           text: "承包地块数量",
	           name:"cbdksl"
	           
	        },
		    {
		       text: "承包地面积",
		       name:"cbdmj"
	           
		    },
		    {
	           text: "非承包地块数量",
	           name:"fcbdksl"
	           
	        },
	        {
	           text: "非承包地面积",
	           name:"fcbdmj"
	           
	        },
		    {
		       text: "颁发权证数量",
		       name:"bfqzsl"
		    }
	    ]
	  },
	  {
	    text: "分析指标",	      		
	    state: {
	      checked: false,
	      disabled: false,
	      expanded: true
	    },
	    nodes:[
	    	
	    	{
	           text: "承包地块平均面积",        
	           name:"cbdkpjmj"
	        },
	        {
	           text: "承包地比率",	           
	           name:"dbdbl"
	        },
		    {
		       text: "非承包地比率",		       
	           name:"fcbdbl"
		    },
		    {
	           text: "承包地农业用地率",
	           name:"cbdnyydl"
	        },
	        {
	           text: "承包地非农业用地率",
	           name:"cbdfnyydl"
	        },
		    {
		       text: "基本农田比率",
	           name:"jbntbl"
		    }
	    ]
	  }
	];
	//承包地用途
	var cbdytTree = [
	  {
	    text: "统计指标",
	    type:"tjzb",
	    nodes: [	      
	        {
	           text: "总面积"
	        },
	        {
	           text: "农业用途面积",
	           nodes:[
	           		{
	           			text:"种植业"
	           		},
	           		{
	           			text:"林业"
	           		},
	           		{
	           			text:"畜牧业"
	           		},
	           		{
	           			text:"渔业"
	           		},
	           		
	            ]
	        },
		    {
		       text: "非农业用途面积"
		    }
	    ]
	  },
	  {
	    text: "分析指标",
	    nodes:[
	    	{
	           text: "户均种植业"
	        },
	        {
	           text: "人均种植业"
	        },
		    {
		       text: "户均林业"
		    },
		    {
	           text: "人均林业"
	        },
	        {
	           text: "户均畜牧业"
	        },
		    {
		       text: "人均畜牧业"
		    },
	        {
	           text: "户均渔业"
	        },
		    {
		       text: "人均渔业"
		    }
	    ]
	  }
	];
	//非承包地条件
	var fcbdTree = [
	  {
	    text: "统计指标",
	    nodes: [	      
	        {
	           text: "总面积"
	        },
	        {
	           text: "自留地"
	           
	        },
		    {
		       text: "机动地"
		    },
	        {
	           text: "开荒地"
	           
	        },
		    {
		       text: "其他集体土地"
		    }
	    ]
	  },
	  {
	    text: "分析指标",
	    nodes:[
	    	{
	           text: "户均自留地面积"
	        },
	        {
	           text: "人均自留地面积"
	        },
		    {
		       text: "户均机动面积"
		    },
		    {
	           text: "人均机动面积"
	        },
	        {
	           text: "户均开荒面积"
	        },
		    {
		       text: "人均开荒面积"
		    },
	        {
	           text: "户均其他集体土地面积"
	        },
		    {
		       text: "人均其他集体土地面积"
		    }
	    ]
	  }
	];
	//是否基本农田条件
	var jbntTree = [
	  {
	    text: "统计指标",
	    nodes: [	      
	        {
	           text: "总面积"
	        },
	        {
	           text: "基本农田面积"
	           
	        },
		    {
		       text: "其他面积"
		    }
	    ]
	  },
	  {
	    text: "分析指标",
	    nodes:[
	    	{
	           text: "户均基本农田面积"
	        },
	        {
	           text: "人均基本农田面积"
	        },
		    {
		       text: "户均非基本农田面积"
		    },
		    {
	           text: "人均非基本农田面积"
	        }
	    ]
	  }
	];
	//按权证信息条件
	var qzxxTree = [
	  {
	    text: "统计指标",
	    nodes: [	      
	        {
	           text: "合计"
	        },
	        {
	           text: "家庭承包"
	           
	        },
		    {
		       text: "其他方式承包"
		    }
	    ]
	  },
	  {
	    text: "分析指标",
	    nodes:[
	    	{
	           text: "颁发权证数量与承包方数量比"
	        }
	    ]
	  }
	];
	//按承包方条件
	var cbfTree = [
	  {
	    text: "统计指标",
	    nodes: [	      
	        {
	           text: "承包方总数"
	        },
	        {
	           text: "家庭承包农户数量"
	           
	        },
		    {
		       text: "家庭承包家庭成员数量"
		    },
		    {
		    	text:"其他方式承包",
		    	nodes:[
		    		{
		    			text:"合计"
		    		},
		    		{
		    			text:"单位承包数量"
		    		},
		    		{
		    			text:"个人承包数量"
		    		}
		    	]
		    }
	    ]
	  },
	  {
	    text: "分析指标",
	    nodes:[
	    	{
	           text: "平均承包地地块数"
	       },
	       {
	           text: "承包方平均承包地面积"
	       },
	       {
	           text: "单位承包的农地面积"
	       },
	       {
	           text: "个人承包的农地面积"
	       },
	       {
	           text: "招标承包的农地面积"
	       },
	       {
	           text: "拍卖承包的农地面积"
	       },
	       {
	           text: "公开协商承包的农地面积"
	       },
	       {
	           text: "转让承包的农地面积"
	       },
	       {
	           text: "互换承包的农地面积"
	       },
	       {
	           text: "其他方式承包的农地面积"
	       }
	    ]
	  }
	];
	
	
	function initMap(){
		require([
			"esri/map",
			"esri/SpatialReference",
			"esri/geometry/Extent",
			"esri/layers/ArcGISTiledMapServiceLayer",
			"esri/layers/ArcGISDynamicMapServiceLayer",	
			"esri/layers/GraphicsLayer",
			"esri/InfoTemplate",
			"esri/layers/FeatureLayer",
			"esri/tasks/ClassBreaksDefinition", 			"esri/tasks/AlgorithmicColorRamp",
    		"esri/tasks/GenerateRendererParameters", 			"esri/tasks/GenerateRendererTask",
   			"esri/symbols/SimpleLineSymbol", 
   			"esri/symbols/SimpleFillSymbol",
   			"esri/renderers/ClassBreaksRenderer",
   			"esri/Color",			
			"esri/tasks/QueryTask",
 			"esri/tasks/query",
 			"esri/graphic",
 			"esri/TimeExtent",
 			
 			"esri/dijit/TimeSlider",
			
			"dojo/dom",
			"dojo/domReady!"
		], function(Map, SpatialReference,
			Extent, AGSTMSLayer,AGSDMSLayer,
			GraphicsLayer, InfoTemplate, FeatureLayer,
			ClassBreaksDefinition,AlgorithmicColorRamp,
			GenerateRendererParameters, GenerateRendererTask,
			SimpleLineSymbol, SimpleFillSymbol, ClassBreaksRenderer,
			Color, QueryTask, Query, Graphic,TimeExtent,
			TimeSlider,
			
			dom
		){
			
			var extent = new Extent({
				xmin:5833507.01815876,
				ymin:2219858.329490702,
				xmax:1.807188853090923E7,
				ymax:7115210.934590889, 
				spatialReference:{wkid:102100}});
			
			map = new Map('map1',{
				//center:[79,42],
				//zoom:4,
				extent:extent,
				slider:true
			});
			//hjdwMap.isScrollWheelZoom =false;
			map.disableScrollWheelZoom();			
						
			var dLayer = new AGSDMSLayer(dUrl);
			
			map.addLayer(dLayer);
			
			var fLayer = new FeatureLayer(dUrl+ "/2",{
				mode:FeatureLayer.MODE_ONDEMAND,
				outFields:["PAC","Code"]
			});
			
			map.addLayer(fLayer);
			
			initializeMapChart();
			
			var timeLineShow = false;
			$("#timeLine").on('click', temporalRenderer);
			
			
			
			function initializeMapChart(){
				var postDKHZDist = $.ajax({
					type:"post",
					url:app.postUrls.getDKHZALL,
					async:true,
					dataType:'json',
					data:{
						"start":filter.start,
						"end":filter.end,
						"xzqh":filter.bm
					}
					
				});
				var postDKHZTime = $.ajax({
					type:"post",
					url:app.postUrls.getDKHZByTime,
					async:true,
					dataType:'json',
					data:{
						"start":filter.start,
						"end":filter.end,
						"xzqh":filter.bm
					}
					
				});
				$.when(postDKHZDist,postDKHZTime).then(function(res1,res2){
					console.log("获取汇总地块信息成功_行政区",JSON.stringify(res1[0]));
					console.log("获取汇总地块信息成功——时间",JSON.stringify(res2[0]));
					appSJFX.dkhzDataDist = res1[0];
					appSJFX.dkhzDataTime = res2[0];
					
					fullfillTableSJFX();
					rendererMap(fLayer,"dist");
					
				});
			}
			function fullfillTableSJFX(){
				
				$("#floatTable_sjfx tbody tr:eq(0) td:eq(1)").html(appSJFX.dkhzDataDist["fbfsl"][0]);
				$("#floatContainer_sjfx tbody tr:eq(1) td:eq(1)").html(appSJFX.dkhzDataDist["cbdkzs"][0]);
				$("#floatContainer_sjfx tbody tr:eq(2) td:eq(1)").html(appSJFX.dkhzDataDist["cbdkzmj"][0]);
				$("#floatContainer_sjfx tbody tr:eq(3) td:eq(1)").html(appSJFX.dkhzDataDist["fcbdkzs"][0]);
				$("#floatContainer_sjfx tbody tr:eq(4) td:eq(1)").html(appSJFX.dkhzDataDist["fcbdkzmj"][0]);
				$("#floatContainer_sjfx tbody tr:eq(5) td:eq(1)").html(appSJFX.dkhzDataDist["bfqzsl"][0]);
				//$("#floatContainer_sjfx tr").eq(0).find("td").eq(1).html("ddd");
				
			}
			
			function rendererMap(layer, type){
				var br;
				if(type == "dist"){
					br = new ClassBreaksRenderer(null, calculateBreaksDist);
				}else if(type == "time"){
					br = new ClassBreaksRenderer(null, calculateBreaksTime);
				}
				var outline = SimpleLineSymbol("solid", new Color("#444"), 1);
			    br.addBreak(0, 5000, new SimpleFillSymbol("solid", outline, new Color([255, 255, 178, 0.55])));
            	br.addBreak(5001, 7500, new SimpleFillSymbol("solid", outline, new Color([254, 204, 92, 0.55])));
            	br.addBreak(7501, 10000, new SimpleFillSymbol("solid", outline, new Color([253, 141, 60, 0.55])));
            	br.addBreak(10001, Infinity, new SimpleFillSymbol("solid", outline, new Color([227, 26, 28, 0.55])));
            	
            	layer.setRenderer(br);
		        
			}
			function calculateBreaksTime(g){
				var value = 0;
				
				return 0;
			}
			function calculateBreaksDist(g){				
				var value = 0;
				var code = g.attributes['PAC'];
				for(var i = 0; i<appSJFX.dkhzDataDist.xzqh.length;i++){
					if(code == appSJFX.dkhzDataDist.xzqh[i]){
						value = appSJFX.dkhzDataDist["fcbdkzs"][i]+appSJFX.dkhzDataDist["cbdkzs"][i];
						break;
					}
				}
				
				return value;
			}
			
			//时态渲染
			var regions = [];
			function temporalRenderer(){
				fLayer.hide();
								
				temporal_featureLayer = new FeatureLayer(dUrl +"/2", {
			 	    id:"tempFl",
		            mode: FeatureLayer.MODE_ONDEMAND,
		            trackIdField:"PAC",		          
		            outFields: ["*"]
		        });
		     	map.addLayer(temporal_featureLayer);
		     	
		     	var data = appSJFX.dkhzDataTime;
		     	console.log("appSJFX.dkhzDataTime", appSJFX.dkhzDataTime);
		     	var len = data["time"].length;
		     	var startTime = new Date(parseInt(data["time"][0].split('-')[0]), (parseInt(data["time"][0].split('-')[1])-1),15);
		     	var endTime = new Date(parseInt(data["time"][len - 1].split('-')[0]), (parseInt(data["time"][len-1].split('-')[1])-1),15);
		     	var timeExtent = new TimeExtent(startTime, endTime);
		     	
		     	var timeSlider = new TimeSlider({
		     		style:"width:100%"
		     	},dom.byId("timeSlider"));
		     	
		     	timeSlider.setThumbCount(1);
	            timeSlider.createTimeStopsByTimeInterval(timeExtent, 1, "esriTimeUnitsMonths");
	            
	            timeSlider.setThumbIndexes([0,1]);
	            timeSlider.setThumbMovingRate(1000);
	            timeSlider.setLoop(true);
	            timeSlider.setLabels(data["time"]);
	            timeSlider.startup();
				console.log(timeExtent);
				timeSlider.on("time-extent-change",renderer);
				rendererMap(temporal_featureLayer,"time");
				
			}
			var endStr = "2016-01";
			function renderer(extent){
				console.log("extent",extent);
				var endTime = extent.endTime;
				var year = endTime.getFullYear();
				var month = endTime.getMonth()-1;
				var endStr = year+"-"+month;
				rendererMap(temporal_featureLayer,"time");
			}
			
			
		});
	}
	
})(jQuery)
