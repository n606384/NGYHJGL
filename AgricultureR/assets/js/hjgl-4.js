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
		initPage();
		initDomEvents();
		rendererDKHZ();
	}
	
	function initResize(){
		var width = $("#paneLevel1").width()*0.95;
		var height = $("#paneLevel1").height() - 10;
		$("#hjglseg-4").height(height);
		$("#hjglseg-4").width(width);
	}
	
	$(window).resize = initResize();
	function rendererDKHZ(){
		
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
			console.log("获取汇总地块信息成功_行政区",res1);
			console.log("获取汇总地块信息成功——时间",res2);
			appSJFX.dkhzDataDist = res1[0];
			appSJFX.dkhzDataTime = res1[0];
		})
		
		
	}
	
	//获取按时间排列的地块汇总数据
	function getHZDTDataByTime(){
		
		
	}
	
	//获取按行政区排列的地块汇总数据
	function getHZDTDataByDist(){
		
		$.ajax({
			type:"post",
			url:app.postUrls.getDKHZALL,
			async:true
		});
	}
	
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
	}
	
	
	var $dkhzTree = $("#dkhzTree");
	var $cbdytTree = $("#cbdytTree");
	var $fcbdTree = $("#fcbdTree");
	var $jbntTree = $("#jbntTree");
	var $qzxxTree = $("#qzxxTree");
	var $cbfTree = $("#cbfTree");
	
	function initPage(){
		console.log("数据分析页面初始化中...");
		initMap();
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
			"dojo/domReady!"
		], function(Map, SpatialReference,
			Extent, AGSTMSLayer,
			AGSDMSLayer
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
			
			
			
		});
	}
	
})(jQuery)
