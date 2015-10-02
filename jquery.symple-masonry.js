(function($) {
  $.fn.masonry = function(option){

  	var self = this;
    var defaults = {
        box_margin_width:15,
        box_margin_height:20,
        $boxs:$(self).children()
	};
    var option = $.extend(defaults,option);
    $(self).css('position', 'relative');
    option.$boxs.css('position', 'absolute');

    var getMaxValue = function(arr){
        var max = undefined;
        for (i=0; i<arr.length; i++){
            if(max == undefined || max < arr[i]){
                max = arr[i];
            }
        }
        return max;
    },
    getIndexMinValue = function(arr){
        var min = undefined, rs;
        for (i=0; i<arr.length; i++){
            if(arr[i] == undefined)return i;
            if(min == undefined || min > arr[i]){
                min = arr[i];
                rs = i;
            }
        }
        return rs;
    },
    adjust = function(){
        var parent_width = $(self).width(),
        box_width = $(option.$boxs.get(0)).width();
        lines_num = Math.floor(parent_width / (box_width + option.box_margin_width));
        if(lines_num < 1){
            lines_num = 1;
        }
        var column_tops = new Array(lines_num);
        option.$boxs.each(function(i ,e){
            var $e = $(e), line_index = getIndexMinValue(column_tops);
            if (column_tops[line_index] === undefined)column_tops[line_index] = 0;
            $e.css('top', column_tops[line_index] + "px");
            column_tops[line_index] += $e .height() + option.box_margin_height;
            $e.css('left', (box_width + option.box_margin_width) * line_index + "px");
        });
        $(self).css('height', getMaxValue(column_tops) + "px");
    }
    $(window).resize(adjust).load(function(){adjust();});
    return(self);
  };
})(jQuery);