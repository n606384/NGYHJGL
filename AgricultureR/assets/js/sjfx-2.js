(function($){
	
	$.cbdfxAnalyst = function(app){
		var id = app.tabDivId;
		$.ajax({
			type:"get",
			url:"assets/sjfxSeg-2.html",
			async:true,
			cache:true,
			success:function(res){
				$("#"+id).html(res);
				initChart();
				initTable();
				initMap();
				initDomEvents();
				initDomFilters();
			}
		});
	}
	//初始化图表
	function initChart(){
		
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
	
})(jQuery);
