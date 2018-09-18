;

(function( $, windows, document, undefined){
    'use strict';
    let pluginName = 'smartWatcher';
    let defaultParameters = {
        //variables used
            seconds : 59,
            minutes : 59,
            hours : 23, 
            days : 364,
            status : true,
            background: 'rgb(68, 68, 68)',
        //functions initialization
            init : function(){},
            start : function(){},
            stop : function(){},
            getCounterTime : function(){},
            stopTimer : function(){},
            startTimer : function(){},
            formatDigit: function(){},


    }
    
    

    //Initial check if plugin is exists or not
    $.fn[pluginName] = function(argumentList){
    
        let n,args = arguments;
        return this.each(function(){
            let $this = $(this);
            let data  = $.data(this,'plugin_'+pluginName);
        
            
            let argumentLists = typeof argumentList === 'object' && argumentList;
            if(!data){
                $this.data('plugin_'+ pluginName, n = new runPlugin(this, argumentLists));

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
        this.paused = 0;
        this.autoStart = true,
    // Auto start...
        this.start();

    }

    
    //--------------functions ---------
    runPlugin.prototype = {
        
        getCounterTime: function()
         {
            
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
            this.displayTimes();
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
             setInterval( time => {
                 if(this.parameters.status && this.parameters.seconds){
                     this.getCounterTime();
                 }
             },1000);
             
         },
         displayTimes: function()
         {
    
             let disign = '<h2 class="timer-wraper" style="background-color:'+ this.parameters.background +'">' + this.getTimes() +'</h2>'
             $('.smart-watch').html(disign);
         },
         getTimes: function()
         {
            let seconds, minutes,hours, days;
                seconds = this.parameters.seconds < 10 ? "0" + this.parameters.seconds : this.parameters.seconds ;
        
                minutes = this.parameters.minutes < 10 ? "0" + this.parameters.minutes  : this.parameters.minutes;
           
                hours = this.parameters.hours < 10 ? "0" + this.parameters.hours : this.parameters.hours;
    
                days = this.parameters.days < 100? "0" + this.parameters.days : this.parameters.days ;
      
           
            return  days +' : '+ hours + ' : '+ minutes+ ' : '+ seconds;       
         }

    }

})(jQuery, window, document);
