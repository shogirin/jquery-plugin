(function($) {
    //  ‎RegExp
    var emRe = /\S/,
        kanaRe = /^[ァ-ヶー]*$/,
        emailRe = /^[A-Za-z0-9]+[\w-]+@[\w\.-]+\.\w{2,}$/,
        telRe = /^[0-9¥-]+$/,
        zipCodeRe = /^[0-9]{3}-[0-9]{4}$/;
    // tooltip
    var remove_error = function(target_elm){
        $(target_elm).parent().find('[role="alert"]').remove();
    },
    disp_error = function(msg, target_elm){
        remove_error(target_elm);
        $(target_elm).parent().append('<span role="alert" class="validate_error">'+msg+'</span>');
    };
    // validation
    var validate_empty = function(elm){
        var val = $(elm).val();
        if(emRe.test(val)){
            remove_error(elm);
        }else{
            if($(elm).is('select')){
                disp_error('必ず選択してください', elm);
            }else{
                disp_error('必ずご記入ください', elm);
            }
        }
    },
    validate_empty_and_kana = function(elm){
        var val = $(elm).val();
        if(emRe.test(val)){
            if(!kanaRe.test(val)){
                disp_error('必ずカナ文字でご記入ください', elm);
            }else{
                remove_error(elm);
            }
        }else{
            disp_error('必ずご記入ください', elm);
        }
    },
    validate_empty_and_email = function(elm){
        var val = $(elm).val();
        if(emRe.test(val)){
            if(!emailRe.test(val)){
                disp_error('必ずメールアドレスの形式でご記入ください', elm);
            }else{
                remove_error(elm);
            }
        }else{
            disp_error('必ずご記入ください', elm);
        }
    },
    validate_tel = function(elm){
        var val = $(elm).val();
        if(emRe.test(val)){
            if(telRe.test(val)){
                remove_error(elm);
            }else{
                disp_error('必ず電話番号形式でご記入ください', elm);
            }
        }else{
            remove_error(elm);
        }
    },
    validate_empty_and_zipcode = function(elm){
        var val = $(elm).val();
        if(emRe.test(val)){
            if(!zipCodeRe.test(val)){
                disp_error('正しい形式でご記入ください', elm);
            }else{
                remove_error(elm);
            }
        }else{
            disp_error('必ずご記入ください', elm);
        }
    };

    // event
    $.fn.bindValidate = function(type){

        let validate_func = function(){}
        switch(type){
            case 'tel':
              validate_func = validate_tel;
              break;
            case 'empty_and_email':
              validate_func = validate_empty_and_email;
              break;
            case 'empty_and_kana':
              validate_func = validate_empty_and_kana;
              break;
            case 'empty':
              validate_func = validate_empty;
              break;
            case 'empty_and_zipcode':
              validate_func = validate_empty_and_zipcode;
              break;
        }

        this.focus(function(){
            validate_func(this);
        });
        this.change(function(){
            validate_func(this);
        });
        this.validate = function(){
            validate_func(this);
        }
        return this;
    }
}(jQuery));
