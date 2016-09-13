jQuery( function( $ ) {
	//  ‎RegExp
	var emRe = /\S/,
		kanaRe = /^[ァ-ヶー]*$/,
		emailRe = /^[A-Za-z0-9]+[\w-]+@[\w\.-]+\.\w{2,}$/,
		telRe = /^[0-9¥-]+$/;
	// tooltip
	var remove_tooltip = function(target_elm){
		$('#tooltip_for_' + $(target_elm).attr('name')).remove();
	},
	disp_tooltip = function(msg, target_elm){
		remove_tooltip(target_elm);
		var p = $(target_elm).position();
		var clone = $("#base_tooltip").clone().attr('id', 'tooltip_for_' + $(target_elm).attr('name')).css({top:(p.top + $(target_elm).height()), left:(p.left)});
		clone.children('.tooltip_inner').text(msg);
		clone.insertAfter(target_elm);
	};
	// validation
	var validate_empty = function(elm){
		var val = $(elm).val();
		if(emRe.test(val)){
			remove_tooltip(elm);
		}else{
			if($(elm).is('select')){
				disp_tooltip('必ず選択してください', elm);
			}else{
				disp_tooltip('必ずご記入ください', elm);
			}
		}
	},
	valifate_empty_and_kana = function(elm){
		var val = $(elm).val();
		if(emRe.test(val)){
			if(!kanaRe.test(val)){
				disp_tooltip('必ずカナ文字でご記入ください', elm);
			}else{
				remove_tooltip(elm);
			}
		}else{
			disp_tooltip('必ずご記入ください', elm);
		}
	},
	valifate_empty_and_email = function(elm){
		var val = $(elm).val();
		if(emRe.test(val)){
			if(!emailRe.test(val)){
				disp_tooltip('必ずメールアドレスの形式でご記入ください', elm);
			}else{
				remove_tooltip(elm);
			}
		}else{
			disp_tooltip('必ずご記入ください', elm);
		}
	},
	validate_tel = function(elm){
		var val = $(elm).val();
		if(emRe.test(val)){
			if(telRe.test(val)){
				remove_tooltip(elm);
			}else{
				disp_tooltip('必ず電話番号形式でご記入ください', elm);
			}
		}else{
			remove_tooltip(elm);
		}
	};
	// event
	var bind_validate = function(elm, validate_func){
		$(elm).focus(function(){
			validate_func(this);
		});
		$(elm).change(function(){
			validate_func(this);
		});
	}
	
	// 使用例
	bind_validate("input[name='family_name']",validate_empty);
	bind_validate("input[name='first_name']",validate_empty);
	bind_validate("input[name='family_kana']",valifate_empty_and_kana);
	bind_validate("input[name='first_kana']",valifate_empty_and_kana);
	bind_validate("input[name='email']",valifate_empty_and_email);
	bind_validate("input[name='tel']",validate_tel);
	bind_validate("select[name='type']",validate_empty);
	bind_validate("textarea[name='detail']",validate_empty);

	$('form').submit(function(){
		$( 'form input[type="submit"]' ).unbind();
		validate_empty("input[name='family_name']");
		validate_empty("input[name='first_name']");
		valifate_empty_and_kana("input[name='family_kana']");
		valifate_empty_and_kana("input[name='first_kana']");
		valifate_empty_and_email("input[name='email']");
		validate_tel("input[name='tel']");
		validate_empty("select[name='type']");
		validate_empty("textarea[name='detail']");
		return ($(this).find('.tooltip').length == 0);
	});		
});