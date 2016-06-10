(function($){
	
	$.qtfxAnalyst = function(app){
		var id = app.tabDivId;
		$("#"+id).empty();
		$.ajax({
			type:"get",
			url:"assets/sjfxSeg-7.html",
			async:true,
			cache:true,
			success:function(res){
				$("#"+id).html(res);
				initChart();
				initTable();
				initMap();
				initDomEvents();
				initDomFilters();
				domResize();
			}
		});
		
	}
	//
	function domResize(){
		
	}
	//初始化图表
	function initChart(){
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
		
	}
	//初始化dom元素交互关联
	function initDomFilters(){
		
	}
	
	//按时间汇总
	function renderBiliQuan(){
		var myChart = echarts.init(document.getElementById("chart_dkfx"),"inforgraphic");
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
