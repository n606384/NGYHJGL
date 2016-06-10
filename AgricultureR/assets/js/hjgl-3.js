(function($){
	
	var hjdwMap = null;
	var zjcgMap = null;
	var sjlMap = null;
	$.manageResult = function(){
		console.log("进入成果管理模块");
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
			hjdwMap.isScrollWheelZoom =false;
			hjdwMap.disableScrollWheelZoom();
			
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
			hjdwMap.addLayer(blayer_1);
			var dlayer_1 = new AGSDMSLayer(dynamicLayerUrl);
			var dlayer_2 = new AGSDMSLayer(dynamicLayerUrl);
			var dlayer_3 = new AGSDMSLayer(dynamicLayerUrl);
			//dlayer.setVisibleLayers([9]);
			hjdwMap.addLayer(dlayer_1);
			
			zjcgMap.addLayer(blayer_2);
			sjlMap.addLayer(blayer_3);
			zjcgMap.addLayer(dlayer_2);
			sjlMap.addLayer(dlayer_3);
			
			
		});
	
				
	}
	//汇交进展
	$("hjjz_hjdy").on('click', function(){
		
	});
	//空间分布
	$("kjfb_hjdy").on('click', function(){
		$("map_HJCL").css('margin-top','-747px');
	});
	//汇交地块
	$("hjdk_hjdy").on('click', function(){
		
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
	}
		
	//七大类文件汇交情况
	function renderHJCGLProChart(){
		
		var myChart = echarts.init(document.getElementById("hjcgl_cggl"),"shine");
		var option = {
		    
		    tooltip : {
		       trigger: 'axis'
		        
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
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'数据量',
		            type:'bar',
		            data:[1132,514,0.787,1.32, 110,321,12],
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
		
	}
	
	//质检大类错误统计
	function renderHJCGRProChart(){
		
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
		            data:[1112,1032,98,15,104,976],
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
		
	}
	
	//时态状图
	function renderFirstProChart(){
		var myChart = echarts.init(document.getElementById("firstPro_cggl"),"shine");
					
		option = {
    timeline:{
        data:[
            '2002-01-01','2003-01-01','2004-01-01','2005-01-01','2006-01-01',
            '2007-01-01','2008-01-01','2009-01-01','2010-01-01','2011-01-01'
        ],
        label : {
            formatter : function(s) {
                return s.slice(0, 4);
            }
        },
        autoPlay : true,
        playInterval : 1000
    },
    options:[
        {
            title : {
                'text':'农村土地承包经营权确权登记成果数据汇交全国情况',
                'subtext':'（2016-2018）'
            },
            tooltip : {'trigger':'axis'},
            legend : {
                x:'right',
                'data':['汇交县数','矢量数据','栅格数据','汇总表格','权属数据','图件数据','文字报告','其他数据'],
                'selected':{
                    '汇交县数':true,
                    '矢量数据':false,
                    '栅格数据':false,
                    '汇总表格':false,
                    '权属数据':false,
                    '图件数据':false,
                    '文字报告':false,
                    '其他数据':false
                }
            },
            toolbox : {
                'show':true, 
                orient : 'vertical',
                x: 'right', 
                y: 'center',
                'feature':{
                    'mark':{'show':true},
                    'dataView':{'show':true,'readOnly':false},
                    'magicType':{'show':true,'type':['line','bar','stack','tiled']},
                    'restore':{'show':true},
                    'saveAsImage':{'show':true}
                }
            },
            calculable : true,
            grid : {'y':80,'y2':100},
            xAxis : [{
                'type':'category',
                'axisLabel':{'interval':0},
                'data':[
                    '北京','\n天津','河北','\n山西','内蒙古','\n辽宁','吉林','\n黑龙江',
                    '上海','\n江苏','浙江','\n安徽','福建','\n江西','山东','\n河南',
                    '湖北','\n湖南','广东','\n广西','海南','\n重庆','四川','\n贵州',
                    '云南','\n西藏','陕西','\n甘肃','青海','\n宁夏','新疆'
                ]
            }],
            yAxis : [
                {
                    'type':'value',
                    'name':'汇交县（个）',
                    'max':53500
                },
                {
                    'type':'value',
                    'name':'数据量（M）'
                }
            ],
            series : [
                {
                    'name':'GDP',
                    'type':'bar',
                    'markLine':{
                        symbol : ['arrow','none'],
                        symbolSize : [4, 2],
                        itemStyle : {
                            normal: {
                                lineStyle: {color:'orange'},
                                barBorderColor:'orange',
                                label:{
                                    position:'left',
                                    formatter:function(params){
                                        return Math.round(params.value);
                                    },
                                    textStyle:{color:'orange'}
                                }
                            }
                        },
                        'data':[{'type':'average','name':'平均值'}]
                    },
                    'data': dataMap.dataGDP['2002']
                },
                {
                    'name':'金融','yAxisIndex':1,'type':'bar',
                    'data': dataMap.dataFinancial['2002']
                },
                {
                    'name':'房地产','yAxisIndex':1,'type':'bar',
                    'data': dataMap.dataEstate['2002']
                },
                {
                    'name':'第一产业','yAxisIndex':1,'type':'bar',
                    'data': dataMap.dataPI['2002']
                },
                {
                    'name':'第二产业','yAxisIndex':1,'type':'bar',
                    'data': dataMap.dataSI['2002']
                },
                {
                    'name':'第三产业','yAxisIndex':1,'type':'bar',
                    'data': dataMap.dataTI['2002']
                }
            ]
        },
        {
            title : {'text':'2003全国宏观经济指标'},
            series : [
                {'data': dataMap.dataGDP['2003']},
                {'data': dataMap.dataFinancial['2003']},
                {'data': dataMap.dataEstate['2003']},
                {'data': dataMap.dataPI['2003']},
                {'data': dataMap.dataSI['2003']},
                {'data': dataMap.dataTI['2003']}
            ]
        },
        {
            title : {'text':'2004全国宏观经济指标'},
            series : [
                {'data': dataMap.dataGDP['2004']},
                {'data': dataMap.dataFinancial['2004']},
                {'data': dataMap.dataEstate['2004']},
                {'data': dataMap.dataPI['2004']},
                {'data': dataMap.dataSI['2004']},
                {'data': dataMap.dataTI['2004']}
            ]
        },
        {
            title : {'text':'2005全国宏观经济指标'},
            series : [
                {'data': dataMap.dataGDP['2005']},
                {'data': dataMap.dataFinancial['2005']},
                {'data': dataMap.dataEstate['2005']},
                {'data': dataMap.dataPI['2005']},
                {'data': dataMap.dataSI['2005']},
                {'data': dataMap.dataTI['2005']}
            ]
        },
        {
            title : {'text':'2006全国宏观经济指标'},
            series : [
                {'data': dataMap.dataGDP['2006']},
                {'data': dataMap.dataFinancial['2006']},
                {'data': dataMap.dataEstate['2006']},
                {'data': dataMap.dataPI['2006']},
                {'data': dataMap.dataSI['2006']},
                {'data': dataMap.dataTI['2006']}
            ]
        },
        {
            title : {'text':'2007全国宏观经济指标'},
            series : [
                {'data': dataMap.dataGDP['2007']},
                {'data': dataMap.dataFinancial['2007']},
                {'data': dataMap.dataEstate['2007']},
                {'data': dataMap.dataPI['2007']},
                {'data': dataMap.dataSI['2007']},
                {'data': dataMap.dataTI['2007']}
            ]
        },
        {
            title : {'text':'2008全国宏观经济指标'},
            series : [
                {'data': dataMap.dataGDP['2008']},
                {'data': dataMap.dataFinancial['2008']},
                {'data': dataMap.dataEstate['2008']},
                {'data': dataMap.dataPI['2008']},
                {'data': dataMap.dataSI['2008']},
                {'data': dataMap.dataTI['2008']}
            ]
        },
        {
            title : {'text':'2009全国宏观经济指标'},
            series : [
                {'data': dataMap.dataGDP['2009']},
                {'data': dataMap.dataFinancial['2009']},
                {'data': dataMap.dataEstate['2009']},
                {'data': dataMap.dataPI['2009']},
                {'data': dataMap.dataSI['2009']},
                {'data': dataMap.dataTI['2009']}
            ]
        },
        {
            title : {'text':'2010全国宏观经济指标'},
            series : [
                {'data': dataMap.dataGDP['2010']},
                {'data': dataMap.dataFinancial['2010']},
                {'data': dataMap.dataEstate['2010']},
                {'data': dataMap.dataPI['2010']},
                {'data': dataMap.dataSI['2010']},
                {'data': dataMap.dataTI['2010']}
            ]
        },
        {
            title : {'text':'2011全国宏观经济指标'},
            series : [
                {'data': dataMap.dataGDP['2011']},
                {'data': dataMap.dataFinancial['2011']},
                {'data': dataMap.dataEstate['2011']},
                {'data': dataMap.dataPI['2011']},
                {'data': dataMap.dataSI['2011']},
                {'data': dataMap.dataTI['2011']}
            ]
        }
    	]
	};
		
		myChart.setOption(option);
			
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
	}
	
})(jQuery);
