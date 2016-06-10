jQuery.ajaxSetup({
	cache:true
});
(function($){
	var appSJFX = {};
	$.managerResult = function(){
		console.log("进入数据分析页面");
		initPage();		
	}
	
	function initPage(){
		console.log("数据分析页面初始化中...");
		
		//clearTabPane();
		appSJFX.tabDivId = "dkfx_sjfx";
		$.getScript("assets/js/sjfx-1.js").done(function(){
			var dd = $.dkfxAnalyst(appSJFX);
		});
		$(".sjfx_TabPane li:eq(0) a").on('click', function(e){
			e.preventDefault();			
			appSJFX.tabDivId = "dkfx_sjfx";
			$.getScript("assets/js/sjfx-1.js").done(function(){
				var dd = $.dkfxAnalyst(appSJFX);
			});
			
			
		});
		$(".sjfx_TabPane li:eq(1) a").on('click', function(e){
			e.preventDefault();	
			
			appSJFX.tabDivId = "cbgyt_sjfx";
			$.getScript("assets/js/sjfx-2.js").done(function(){
				var dd = $.cbdfxAnalyst(appSJFX);
			});
			
		});
		$(".sjfx_TabPane li:eq(2) a").on('click', function(e){
			e.preventDefault();
			appSJFX.tabDivId = "fcbd_sjfx";
			$.getScript("assets/js/sjfx-3.js").done(function(){
				var dd = $.fcbdAnalyst(appSJFX);
			});
		});
		$(".sjfx_TabPane li:eq(3) a").on('mousedown', function(e){
			e.preventDefault();
			appSJFX.tabDivId = "sfnt_sjfx";
			$.getScript("assets/js/sjfx-4.js").done(function(){
				var dd = $.ntfxAnalyst(appSJFX);
			});
		});
		$(".sjfx_TabPane li:eq(4) a").on('mousedown', function(e){
			e.preventDefault();
			appSJFX.tabDivId = "qzxx_sjfx";
			$.getScript("assets/js/sjfx-5.js").done(function(){
				var dd = $.qzfxAnalyst(appSJFX);
			});
		});
		$(".sjfx_TabPane li:eq(5) a").on('mousedown', function(e){
			e.preventDefault();
			appSJFX.tabDivId = "cbf_sjfx";
			$.getScript("assets/js/sjfx-6.js").done(function(){
				var dd = $.cbfAnalyst(appSJFX);
			});
		});
		$(".sjfx_TabPane li:eq(6) a").on('mousedown', function(e){
			e.preventDefault();
			appSJFX.tabDivId = "qtfx_sjfx";
			$.getScript("assets/js/sjfx-7.js").done(function(){
				var dd = $.qtfxAnalyst(appSJFX);
			});
		});
		
	}
	
	function clearTabPane(){
		$("#dkfx_sjfx").empty();
		$("#cbgyt_sjfx").empty();
		$("#fcbd_sjfx").empty();
		$("#sfnt_sjfx").empty();
		$("#qzxx_sjfx").empty();
		$("#cbf_sjfx").empty();
		$("#qtfx_sjfx").empty();
	}
	
})(jQuery)
