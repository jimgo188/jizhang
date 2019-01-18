$(function(){
    $(".tab-title span").off("click").on("click",function(){
		var index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		var tab = $(this).attr("data-id");
		$("#contentbox .record_form").eq(index).show().siblings().hide();
    });
	var UrlParam = getUrlParam('action');	
	if(UrlParam == "income"){
		$("#income").show();
		$("#pay").hide();
		$(".tab-title span.green").addClass("on");
		$(".tab-title span.red").removeClass("on");
	}
	$("#btn_submit_save_edit").click(function(){
		$(this).addClass("disabled");
		saveEditRecord();
	});
});

function isNull(str){
	if ( str == "" ) return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
}

function chushihua(){
	// 初始化
	$("#classname").val("");
	$("#classid").val("");
	$('#btn_submit').attr('date-info','save');
	$("#classtype").find("option").attr("selected",false);
	$("#error_show").html("");
}

function subtraction(first,second){
	var results = first - second;
	results = results.toFixed(2);
	return results;
}

function GetUrlHash(){
  var query = window.location.hash;  
  return query;
}

//
// 获取url里面的参数(name)
// 使用方法 curPage = getUrlParam('page');
//
function getUrlParam(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
   var r = window.location.search.substr(1).match(reg);  //匹配目标参数
   if (r != null)
	   return unescape(r[2]);
   return null; //返回参数值
}

// 删除记录
function deleterecordAll(form){
	if($("input[type='checkbox']").is(':checked')==false){
		alert("请选择需要删除的记录");
		return false;
	}
	var r=confirm("确定删除这些记录？");
	if (r==true){
		$.ajax({
			type:"POST",
			dataType: "json",
			url:"date.php?action=deleterecordAll",
			data: $("#del_all").serialize(),
			success:function(result){
				var data = '';
				if(result != ''){
					data = eval("("+result+")");
				}
				alert(data.error_msg);
			},
			error:function(){
				console.log(result);
			}
		});
	}
}

// 编辑记录
function editRecord(t,openid){
	$("#error_show").html("");//初始化
	var info = $(t).data('info');	
	var money = info.money;
	var remark = info.remark;
	var classname = info.classname;
	var addtime = info.addtime;
	var id = info.id;
	$("#"+openid).modal({backdrop:'static', keyboard:true});
	$("#edit-money").val(money);
	$("#edit-remark").val(remark);
	$("#edit-time").val(addtime);
	$("#edit-classtype").val(classname);
	$("#edit-id").val(id);
}
// 保存记录
function saveEditRecord(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "date.php?action=saverecord",//url
		data: $('#edit-form').serialize(),
		success: function (result) {
			$("#error_show").show();
			var data = '';
			if(result != ''){
				data = eval("("+result+")");
			}
			$('#error_show').html(data.error_msg);
			if(data.code == "1"){
				window.location.reload();
			}else{
				$("#btn_submit").removeClass("disabled");
			}			
			//if(data.url != ""){location.href=data.url;}				
		},
		error : function() {
			$("#error_show").hide();
			console.log(result);
		}
	});
}

function canBackGo(url){
	if(url.indexOf("?")>0){
		document.location.href = url + "&backUrl=" + encodeURIComponent(document.location.href);
	}else{
		document.location.href = url + "?backUrl=" + encodeURIComponent(document.location.href);
	}
}