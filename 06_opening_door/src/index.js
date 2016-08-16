'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    var angle = 10;
   $('#shake').on('shock', function() {
   console.log('shocking');
   angle +=2;
   if(angle >=120){
       angle =120;
   }
   console.log(angle);
    $('#servo').setAngle(angle);
    
   });
   
   setInterval(function(){
       angle -=2;
       if(angle <= 0)
       {
           angle =0;
       } 
       $('#servo').setAngle(angle);
   },1000)

});





