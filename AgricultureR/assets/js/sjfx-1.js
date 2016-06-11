(function($){
	
	var circle1Chart, circle2Chart, areaChart,biliquanChart;
	
	
	$.dkfxAnalyst = function(app){
		var id = app.tabDivId;
		$("#"+id).empty();
		$.ajax({
			type:"get",
			url:"assets/sjfxSeg-1.html",
			async:true,
			cache:true,
			success:function(res){
				$("#"+id).html(res);
				initResize(id);
				initChart();
				initTable();
				initMap();
				initDomEvents();
				initDomFilters();
			}
		});
		
	}
	//dom窗口大小
	function initResize(id){
		var containerWidth = $("#hjglseg-4").width();
		var containerHeight = $("#hjglseg-4").height() -90;
		console.log("width, height",id, containerWidth, containerHeight);
		$(".sjfx_r_pane").css({
			"width":containerWidth*0.53,
			"height":containerHeight
		});
		console.log("窗口大小变化");
	}
	$(window).resize = initResize();
	//初始化图表
	function initChart(){
		renderBiliQuan();
		renderCircie1();
		renderCircle2();
		renderPJAreaBar();
		renderBiliQuan();
	}
	//初始化表格
	function initTable(){
		
	}
	//初始化地图专题
	function initMap(){
		
	}
	//初始化dom元素事件绑定
	function initDomEvents(){
		$chartContainer = $("#chartContainer_sjfx1");
		//左侧div隐藏后事件
		$("#tableContainer_sjfx1").on("hide.bs.collapse", function(){
			$chartContainer.css({
				"width":"98%"
				});
			$(".sjfx_r_pane").css({
				"width":"50%",
				"border-bottom":"",
				"border-right":'solid 3.5px #229A56'
				});
			circle1Chart.resize();
		    circle2Chart.resize();
		    areaChart.resize();
		    biliquanChart.resize();
		    $("#collapseBtn").attr('class',"glyphicon glyphicon-circle-arrow-right");
		});
		
		//左侧div显示后后事件
		$("#tableContainer_sjfx1").on("show.bs.collapse", function(){
			$chartContainer.css({
				"width":"58%"
				});
			$(".sjfx_r_pane").css({
				"width":"98%",
				"border-bottom":"solid 3.5px #229A56",
				"border-right":''
				});
			circle1Chart.resize();
		    circle2Chart.resize();
		    areaChart.resize();
		    biliquanChart.resize();
		    $("#collapseBtn").attr('class',"glyphicon glyphicon-circle-arrow-left");
		});
	}
	//初始化dom元素交互关联
	function initDomFilters(){
		
	}
	//比例圈图按承包非承包分
	function renderCircie1(){
		circle1Chart = echarts.init(document.getElementById("circle1_dkfx"),"inforgraphic");
		var option = {
			title:{
				text:"全国关于承包地块与非承包地块统计比例情况",
				x:"center",
				y:"top"
			},
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        y:"center",
		        data:['承包地块数量','非承包地块数量','承包地面积','非承包地面积']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true, 
		                type: ['pie', 'funnel']
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        },
		        x:"right",
		        y:"center",
		        orient:"vertical"
		    },
		    calculable : false,
		    series : [
		        {
		            name:'地块数量',
		            type:'pie',
		            selectedMode: 'single',
		            radius : [0, 150],
		            
		            // for funnel
		            x: '20%',
		            width: '40%',
		            funnelAlign: 'right',
		            max: 1548,
		            
		            itemStyle : {
		                normal : {
		                    label : {
		                        position : 'inner'
		                    },
		                    labelLine : {
		                        show : false
		                    }
		                }
		            },
		            data:[
		                {value:335, name:'承包地块数量'},
		                {value:679, name:'非承包地块数量'}
		                
		            ]
		        },
		        {
		            name:'地块面积',
		            type:'pie',
		            radius : [200, 270],
		            
		            // for funnel
		            x: '60%',
		            width: '35%',
		            funnelAlign: 'left',
		            max: 1048,
		            
		            data:[		               
		                {value:234, name:'承包地面积'},
		                {value:135, name:'非承包地面积'}		                
		            ]
		        }
		    ]
		};
		circle1Chart.setOption(option);
	}
	//比例圈按行政区统计
	function renderCircle2(){
		circle2Chart = echarts.init(document.getElementById("circle2_dkfx"),"inforgraphic");
		var option2 = {
				title:{
					text:"全国各省地块指标对比分析",
					x:"center",
					y:"top"
				},
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        x: 'left',
			        y:"bottom",
			        data:['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江',
	                    '上海','江苏','浙江','安徽','福建','江西','山东','河南',
	                    '湖北','湖南','广东','广西','海南','重庆','四川','贵州',
	                    '云南','西藏','陕西','甘肃','青海','宁夏','新疆']
			    },
			    series: [
			        {
			            name:'承包地块数量',
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
			            name:'非承包地块数量',
			            type:'pie',
			            radius: ['30%', '50%'],			
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
			            name:'承包地面积',
			            type:'pie',
			            radius: ['60%', '80%'],
			
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
		circle2Chart.setOption(option2);

	}
	//行政区平均地块面积
	function renderPJAreaBar(){
		areaChart = echarts.init(document.getElementById("pjmj_dkfx"),"inforgraphic");
		var option = {
			title:{
				text:"全国各省承包地平均面积情况",
				x:"center",
				y:"top"
			},
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
		        },
		        x:"right",
		        y:"center",
		        orient:"vertical"
		    },
		    calculable : true,
		    legend: {
		        data:['承包地平均面积'],
		        x:"right",
		        y:"top"
		    },
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
		            type : 'value',
		            name : '面积',
		            axisLabel : {
		                formatter: '{value} '
		            }
		        }
		    ],
		    series : [
		
		        {
		            name:'承包地平均面积',
		            type:'bar',
		            data:[
		            2111.0, 4666.9, 7444.0, 2354.2, 25789.6, 7678.7, 1367.6, 
		            1256.2, 3276.6, 2054.0, 6543.4, 32675.3, 4441.0, 2354.2, 
		            7677.7, 3276.6, 2054.0, 6543.4, 32675.3, 4441.0, 2354.2,
		            2054.0, 6543.4, 32675.3, 7444.0, 2354.2, 25789.6, 7678.7, 
		            6543.4, 32675.3, 7444.0		            
		            ]
		        }
		    ]
		};
		areaChart.setOption(option);
	}
	
	//
	function renderBiliQuan(){
		biliquanChart = echarts.init(document.getElementById("chart_dkfx"),"inforgraphic");
		var option = {
			title:{
				text:"全国按地块汇总统计情况(2016-1至2016-12)",
				x:'center',
				y:'top'
				
			},
		    tooltip : {
		        trigger: 'axis'
		    },
		    toolbox: {
		        show : true,
		        orient:"vertical",
		        x:'right',
		        y:'center',
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
		        data:['发包方数量','承包地块数量','承包地面积','非承包地块数量','非承包地面积','颁发权证数量','承包地比率','非承包地比率'],
		        x:'center',
				y:'bottom'
				
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
		                formatter: '{value} '
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
		            name:'发包方数量',
		            type:'bar',
		            data:[2111.0, 4666.9, 7444.0, 2354.2, 2578.6, 76778.7, 1367.6, 1256.2, 3276.6, 2054.0, 6543.4, 3267.3]
		        },
		        {
		            name:'承包地块数量',
		            type:'bar',
		            data:[2.6, 54455.9, 9012, 2944.4, 2256.7, 4074.7, 7536.6, 8278.2, 48.7, 1832.8, 6445.0, 2455.3]
		        },
		        {
		            name:'承包地面积',
		            type:'bar',
		            data:[2.0, 434.9, 745.0, 2345.2, 2545.6, 7634.7, 1323.6, 1223.2, 32.6, 2023.0, 654.4, 387.3]
		        },
		        {
		            name:'非承包地块数量',
		            type:'bar',
		            data:[2.6, 53443.9, 905, 295.4, 226.7, 407.7, 758.6, 823.2, 488.7, 187.8, 667.0, 223.3]
		        },
		        {
		            name:'非承包地面积',
		            type:'bar',
		            data:[232.0, 443.9, 754.0, 2345.2, 2545.6, 766.7, 137.6, 1222.2, 32.6, 2015.0, 6432.4, 356.3]
		        },
		        {
		            name:'颁发权证数量',
		            type:'bar',
		            data:[126, 59, 90, 294, 2270, 407, 756, 822, 487, 188, 60, 23]
		        },
		        {
		            name:'承包地比率',
		            type:'line',
		            yAxisIndex: 1,
		            data:[24.0, 32.2, 33.3, 24.5, 16.3, 15.2, 30.3, 43.4, 23.0, 16.5, 12.0, 6.2]
		        },
		        {
		            name:'非承包地比率',
		            type:'line',
		            yAxisIndex: 1,
		            data:[52.0, 3.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 19.5, 32.0, 26.2]
		        }
		    ]
		};
		biliquanChart.setOption(option);
	}
	
})(jQuery);
