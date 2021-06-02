function makesvg(percentage, inner_text=""){

  var abs_percentage = Math.abs(percentage).toString();
  var percentage_str = percentage.toString();
  if(percentage > 0 && percentage <=20)
  {
    percentage_str=1;
  }
  else if(percentage > 20 && percentage <= 40){
    percentage_str=2;
  }
  else if(percentage > 40 && percentage <= 60){
    percentage_str=3;
  }
  else if(percentage > 60 && percentage <= 80){
    percentage_str=4;
  }
  else if(percentage > 80 && percentage <= 100){
    percentage_str=5;
  }
  else{
    percentage_str=0;
  }
  var classes = ""

  if(percentage < 0){
    classes = "danger-stroke circle-chart__circle--negative";
  } else if(percentage > 0 && percentage <= 30){
    classes = "warning-stroke";
  } else{
    classes = "success-stroke";
  }

 var svg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">'
     + '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />'
     + '<circle class="circle-chart__circle  '+classes+'"'
     + 'stroke-dasharray="'+ abs_percentage+',100"    cx="16.9" cy="16.9" r="15.9"  fill="white" />'
     + '<g class="circle-chart__info">'
     + '   <text class="circle-chart__percent" x="17.9" y="15.5" fill="white" >'+percentage_str+'</text>';

  if(inner_text){
    svg += '<text class="circle-chart__subline" x="16.91549431" y="22" fill="white" >'+inner_text+'</text>'
  }
  
  svg += ' </g></svg>';
  
  return svg
}

(function( $ ) {

    $.fn.circlechart = function() {
        this.each(function() {
            var percentage = $(this).data("percentage");
            var inner_text = $(this).text();
            $(this).html(makesvg(percentage, inner_text));
        });
        return this;
    };

}( jQuery ));