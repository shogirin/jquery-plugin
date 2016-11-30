(function($) {
  jQuery.heredoc_str = function(heredoc, option){
    heredoc = heredoc.toString().replace(/(\n)/g, '').split('*')[1];
    jQuery.each(option, function(i, val){
      heredoc = heredoc.replace(new RegExp('\{\{' + i + '\}\}', 'g'), val);
    });
    return heredoc;
  };
})(jQuery);
