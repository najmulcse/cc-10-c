;

(function( $, windows, document, undefined){
    'use strict';
    let pluginName = 'smartWatcher';
    let defaultParameters = {
        //variables used
            seconds : 60,
            minutes : 59,
            hours : 23, 
            days : 364,
            status : true,
        //functions initialization
            init : function(){},
            start : function(){},
            stop : function(){},
            getCounterTime : function(){},
            stopTimer : function(){},
            startTimer : function(){},


    }
    

    //Initial check if plugin is exists or not
    $.fn[pluginName] = function(argumentList){
    
        let args = arguments;
        return this.each(function(){
            let $this = $(this);
            let data  = $.data(this,'plugin_'+pluginName);
        
            let argumentLists = typeof argumentList === 'object' && argumentList;
            if(!data){
                $this.data('plugin_'+pluginName,new runPlugin(this, argumentLists));

            }
            if( typeof argumentList === 'string' ){
                data[argumentList].apply(data, Array.prototype.slice.call(args, 1));
            }
        });
    }

    //____________Entry point of plugin ___________
    function runPlugin(selector, parameters){
    
        this.selector = selector;
        this.$selector = $(selector);
        this.parameters = $.extend({},defaultParameters,parameters);
        this.state = 0;
        this.moveInterval = 3000;
        this.paused = 0;
        console.log(this.parameters);
        this.start();
        $('.start').on('click', function(){
            console.log(this.parameters);
            this.parameters.status = true;
        });
        $('.stop').on('click', function(){
            this.parameters.status = false;
        });
            
    }

    
    //--------------functions ---------
    runPlugin.prototype = {
        
          getCounterTime: function()
         {
            this.displayTimes();
            this.parameters.seconds-- ;
            if(this.parameters.seconds == 0 && this.parameters.minutes){
                this.parameters.minutes--;
                this.parameters.seconds = 59;
            }
            if(this.parameters.minutes == 0 && this.parameters.hours){
                this.parameters.hours--;
                this.parameters.minutes = 59;
            }
            if(this.parameters.hours == 0 && this.parameters.days)
            {
                this.parameters.days--;
                this.parameters.hours = 23;
            }
         },
       stopTimer: function()
         {
             this.parameters.status = false;
         },
      startTimer: function ()
         {   this.parameters.status = true;
             this.start();
         },

       start: function()
         {
            this.getCounterTime();
             setInterval( time => {
                 if(this.parameters.status && this.parameters.seconds){
                     this.getCounterTime();
                 }
             },1000);
             
         },
         displayTimes: function()
         {
             let times = this.parameters.days + ' : '+ this.parameters.hours + ' : '+ this.parameters.minutes + ' : '+ this.parameters.seconds;
            $('.smart-watch').html(times);
         }

    }

})(jQuery, window, document);
