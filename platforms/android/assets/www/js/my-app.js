// Initialize your app
var myApp = new Framework7({
     pushState: true,
     preloadPreviousPage:false,
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    //dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
// myApp.onPageInit('about', function (page) {
//     // run createContentPage func after link was clicked
//     $$('.create-page').on('click', function () {
//         createContentPage();
//     });
// });
// 
// 
// 



var device_platform = "andriod";


var person_search_result = "";
var locations_list = "";
var opportunities_list = "";
var announcements_list = "";
var base_url = 'http://95.130.170.228/EpesData/';
//var all_feeds_data_global = "";


$(document).on("click",".feed_poll_opt",function(){

    //mainView.router.loadPage('login_page.html');
       // alert(window.localStorage.getItem("username"));

    if(window.localStorage.getItem("username")){
        var poll_value = $(this).attr("value");
        var poll_id = $(this).attr("alt");
        var poll_username = window.localStorage.getItem("username");
        var instance_div = $(this);

        $.ajax({
            url: base_url+"PollReply.aspx",
            type: 'POST',
            data:{__VIEWSTATE:"/wEPDwUJMzM2MTU1MjMyZGSPsEnwbP7wUWd72W2KSVlN7GbRgGAC00A8dU5+O9io8Q==",__EVENTVALIDATION:"/wEWBQLCzuvfDQL/+rqdDgLB2tiHDgKY+87FCwLCi9reA3V/G09oFq8z0gzfXDfZwzGNZWA4+BP6u3y4nUL40Ui1",txtPid:poll_id,txtUser:poll_username,txtOpt:poll_value,submit:"Submit"},
            //data:{device_uid:'123456'},
        
            success: function(html){

                //alert(html.polladded);


               // alert(html);

                instance_div.parent().parent().fadeOut();
            }
        });
    }else{

        mainView.router.loadPage('login_page.html');

    }

});



$(document).on("click",".post_likes",function(){
    if(window.localStorage.getItem("username")){
        var feed_id = $(this).attr("alt");
        var user_name = window.localStorage.getItem("username");

        instance_div = $(this);

        $.ajax({
            url: base_url+"Likes.aspx",
            type: 'POST',
            data:{__VIEWSTATE:"/wEPDwUKLTcxMjI4Mjc5NmRkheNW8Uakr4Rpt3oZRbKJUr7F+u3dH1uHVuGOxty20PE=",__EVENTVALIDATION:"/wEWBAKdosu1DgKl1bKzCQKfrtLtCALCi9reAwpFVJ8BFl4CJMfz5eTJNDu8R9suDeCCfDIfMNnoIuE6",txtUserName:user_name,txtFeedId:feed_id,submit:"Submit"},
            //data:{device_uid:'123456'},
        
            success: function(html){
                //alert(html);

                if(html.likesadded == "YES"){
                   var likes =  instance_div.siblings('.likes_count').html();
                   likes = likes/1;
                   likes++;
                   instance_div.siblings('.likes_count').html(likes);
                }


            }
        });

    }else{

        mainView.router.loadPage('login_page.html');

    }
});

$(document).on("click",".news_wrap_announcement",function(){
    var id_ = $(this).attr('alt');
    var type_ ="Announcements";


    
     announcements_list = $(this).html();
    // 
    if($(this).find('.news_circle').hasClass('news_circle_bg')){
        $(this).find(".news_circle_bg").removeClass("news_circle_bg");

        $.ajax({
            url: base_url+"readentry.aspx",
            type: 'POST',
            data:{__VIEWSTATE:"/wEPDwULLTE2MTUxNjk2MzZkZPQyLNRjITxwxhXEY+0CzaPIZp/IaGpH8iZuQxs2/iwh",__EVENTVALIDATION:"/wEWBwLe+ParCwKhsKv2CALarKfLDQL2mKupAQLB2tiHDgKM+5bqDwLCi9reAyFN8PnoOsh8al6K4+s2ZncE1aO6/OnUoJ+/mk1TBuuv",dRT:type_,txtUser:window.localStorage.getItem("username"),txtId:id_,submit:"Submit"},
            success: function(html){
                
                console.log(html);

            }
        });

    }
   


     mainView.router.loadPage('announcement_detail.html');
});

$(document).on("click",".news_wrap_opportunities",function(){
    var id_= $(this).attr('alt');
    var type_="Firsatlar";

    opportunities_list = $(this).html();

    if($(this).find('.news_circle').hasClass('news_circle_bg')){


        $(this).find(".news_circle_bg").removeClass("news_circle_bg");

        $.ajax({
            url: base_url+"readentry.aspx",
            type: 'POST',
            data:{__VIEWSTATE:"/wEPDwULLTE2MTUxNjk2MzZkZPQyLNRjITxwxhXEY+0CzaPIZp/IaGpH8iZuQxs2/iwh",__EVENTVALIDATION:"/wEWBwLe+ParCwKhsKv2CALarKfLDQL2mKupAQLB2tiHDgKM+5bqDwLCi9reAyFN8PnoOsh8al6K4+s2ZncE1aO6/OnUoJ+/mk1TBuuv",dRT:type_,txtUser:window.localStorage.getItem("username"),txtId:id_,submit:"Submit"},
            success: function(html){
                
                console.log(html);

            }
        });

    }

    mainView.router.loadPage('opportunities_detail.html');
});


$(document).on("click",".show_user_profile",function(){
    var user_id_= $(this).attr('alt');

   if(user_id_ == window.localStorage.getItem("username")){
        mainView.router.loadPage('my_profile.html');
   }else{

        mainView.router.loadPage('search_profile_detail.html?user_id='+user_id_);
        
   }
});


$(document).on("click",".feed_delete_btn",function(){
        myApp.showPreloader();

        var feed_id_= $(this).attr('alt');
    
        
        var div_inst = $(this).parent().parent();
        $.ajax({  
            url: base_url+"feededit.aspx?FeedId="+feed_id_+"&IsDelete=1",
            type: 'GET',
            success: function(html)
            {  
                div_inst.hide();
                myApp.hidePreloader();

            }
        });


});





function get_feeds(pull){
    //alert(window.localStorage.getItem("username"));
    var all_feeds = "";
   
    $.ajax({  
            url: base_url+"GetJson.aspx",
            type: 'GET',
            success: function(html)
            {
                //console.log(html);
                if(html.pindata){
                    $.each(html.pindata,function(index,value){
                        var date_time = value.uploaddate;
                        var time_ago = jQuery.timeago(date_time);
                        var pin_posts = '<div class="welcome_top_post"><div class="post_circle"></div><div class="row no-gutter"><div class="col-75"><div class="profile_img" style="background-image: url('+base_url+value.image+');"></div><div class="user_name"><p  class="show_user_profile" alt="'+html.feeddata[i].userid+'">'+value.username+'</p><span>'+time_ago+'</span></div></div><div class="col-25"><div class="likes_wrap"><span class="likes_count">'+value.likes+'</span><div class="post_likes" alt="'+value.uniqid+'"><i class="fa fa-heart"></i></div></div></div></div><div class="row"><div class="col-100"><div class="post_text"><p>'+value.feeddata+'</p></div></div></div></div>';
                        
                       
                       all_feeds += pin_posts;
                    });

                    
                }

                if(html.polldata){
                    $.each(html.polldata,function(index,value){
                        var date_time = value.date;
                        var time_ago = jQuery.timeago(date_time);

                        var poll_html = '<div class="post_survey" id="post_id'+value.pollid+'"><div class="survey_text"><h5>'+value.pollTitle+' <span>'+time_ago+'</span></h5><p>'+value.question+'</p></div><div class="survey_btns">';
                        if(value.opt1 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt1+'" alt="'+value.pollid+'" >'+value.opt1+'</a>';
                        }
                        if(value.opt2 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt2+'" alt="'+value.pollid+'" >'+value.opt2+'</a>';
                        }
                        if(value.opt3 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt3+'" alt="'+value.pollid+'" >'+value.opt3+'</a>';
                        }
                        if(value.opt4 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt4+'" alt="'+value.pollid+'" >'+value.opt4+'</a>';
                        }

                        poll_html += '</div></div>';
                       all_feeds += poll_html;
                       

                    });

                    
                    
                }
                
                
                if(html.feeddata){
                    //all_feeds_data_global = html.feeddata;
                    for(var i=0;i<html.feeddata.length;i++){
                            //alert(value.imagename[0].image);
                    
                        var date_time = html.feeddata[i].uploaddate;
                        var time_ago = jQuery.timeago(date_time);
                        var posts = '<div class="welcome_post"><div class="row no-gutter"><div class="col-75"><div class="profile_img" style="background-image: url('+base_url+html.feeddata[i].image+');"></div><div class="user_name"><p class="show_user_profile" alt="'+html.feeddata[i].userid+'">'+html.feeddata[i].username+'</p><span>'+time_ago+'</span></div></div><div class="col-25"><div class="likes_wrap"><span class="likes_count">'+html.feeddata[i].likes+'</span><div class="post_likes" alt="'+html.feeddata[i].uniqid+'"><i class="fa fa-heart"></i></div></div></div></div><div class="row"><a href="feed_photo.html?uid='+html.feeddata[i].uniqid+'"><div class="col-100 po_rel"><div class="post_text"><p>'+html.feeddata[i].feeddata+'</p></div>';
                            if(html.feeddata[i].imagename[0] && html.feeddata[i].imagename[0].image != ""){
                                //feed_img = html.feeddata[i].imagename[0].image;
                                posts +='<div class="post_img"><img src="'+base_url+'/images/'+html.feeddata[i].imagename[0].image+'" data-elem="pinchzoomer"  alt="">';
                                if(html.feeddata[i].imagename.length >1){
                                    posts += '<div class="button image_count"><img src="images/image_icon.png" class="image_icon" alt="" />'+html.feeddata[i].imagename.length+'</div>';
                                }

                                posts +='</div>';
                            }
                            posts += '</div></div></a>';
                            if(html.feeddata[i].userid == window.localStorage.getItem("username")){
                                posts += '<div class="post_btns"><a href="edit_feed.html?uid='+html.feeddata[i].uniqid+'">DüZENLE</a><button class="feed_delete_btn" alt="'+html.feeddata[i].uniqid+'">SİL</button></div>';

                            }
                            posts += '</div>';
                       all_feeds += posts;
                        
                    }

                    
                }

                
                this_user_answered = [];

             
                  

                var editor = "";
                $.ajax({  
                    url: base_url+"PollReplyJson.aspx",
                    type: 'GET',
                    success: function(res)
                    {
                        if(res.pollresult != ""){
                            var flag_1 = 0;
                            var logged_in_user = window.localStorage.getItem("username");
                            //alert(logged_in_user);
                            $.each(res.pollresult,function(ind,val){

                                if(val.polluser == logged_in_user){
                                    //alert(val.pollid);
                                    if(flag_1 == 1){
                                        var jHtmlObject = jQuery(editor);
                                    }else{
                                        var jHtmlObject = jQuery(all_feeds);
                                    }
                                   
                                    editor = jQuery("<p>").append(jHtmlObject);
                                    editor.find("#post_id"+val.pollid).remove();
                                    flag_1 = 1;
                                }


                            });
                           
                            

                        }

                        if(pull == "yes"){
                           // alert("dwd");
                            setTimeout(function () {
                                myApp.pullToRefreshDone();
                            },1000);

                        }

                        $(".welcome_wrapper").html("");
                        if(editor == "" ){
                            //alert(logged_in_user);
                            //alert(editor);
                             
                            $(".welcome_wrapper").append(all_feeds);

                        }else{
                            //alert(logged_in_user+'dqw');

                            $(".welcome_wrapper").append(editor.html());

                        }
                        myApp.hidePreloader();
                        

                    }
                });

                
             

            }, 
            error: function (error) {
                   myApp.hidePreloader();

            }
        });

        
}
// var l_t = 0;
// function resetTimer() {
//     alert(l_t);
   
//     l_t = setTimeout(function(){

//         alert("You are now logged out.");
//         window.localStorage.removeItem("username");
//         mainView.router.loadPage('login_page.html');


//     }, 1*60*1000);
//     // 1000 milisec = 1 sec
// }

// function logout() {
    
//     //location.href = 'logout.php'
// }

$$(document).on('pageInit', function (e) {

    var page = e.detail.page;

    // if(page.name !== "login_page" ){
    //      clearTimeout(l_t);
    //     resetTimer();

    // }
    // if(!window.localStorage.getItem("username") && page.name !== "login_page"){
    //     setTimeout(function () {
    //         mainView.router.loadPage('login_page.html');

    //     },1000);
    // }
    


    var current_time = new Date();
    //alert(current_time.getTime() - window.localStorage.getItem("last_activity") );
   // alert(current_time.getTime() - window.localStorage.getItem("last_activity") );

    if(window.localStorage.getItem("last_activity") && (current_time.getTime() - window.localStorage.getItem("last_activity")  ) <= 60*60*1000 && page.name !== 'login_page'){

        window.localStorage.setItem("last_activity",current_time.getTime());
        //alert("in");

    }else{
        //alert("out");

        window.localStorage.setItem("username","");
        // setTimeout(function () {
        //     mainView.router.loadPage('login_page.html');

        // },1000);
        //mainView.router.loadPage('login_page.html');

    }
    if(!window.localStorage.getItem("username") && page.name !== "login_page"){
        setTimeout(function () {
            mainView.router.loadPage('login_page.html');

        },1000);
    }

    


    if (page.name === 'login_page') {
        // personal no : 90000245
        // National id : 41818266646
     
        setTimeout(function () {
            if(!window.localStorage.getItem("username") ){
                // $('.preloader_page').fadeOut();
                // $('.app_login_page').fadeIn();
                $("#login_submit").on("click",function(){
                    if($("#per_no").val() != ""){
                        if($("#nation_id").val() != ""){
                            //valid submit form
                            
                            myApp.showPreloader();

                            $.ajax({  
                                url: base_url+"validateuser.aspx",
                                type: 'POST',
                                data:{
                                    __VIEWSTATE:"/wEPDwULLTEzNjkxMzkwNjRkZMcDtn8G80lBWAjmDUqA3qANQog/mi8nLuEhQX4KQRgD",
                                    __EVENTVALIDATION:"/wEWBAL5t4nDDgL/+tbVAgL/+qKhBALCi9reA5A6SYIXqh8Uuv6peyERzZeA+NLW5MTyYTlKCqlGSHST",
                                    txtUid:$("#per_no").val(),
                                    txtNid:$("#nation_id").val(),
                                    btnSubmit:"Submit"

                                },
                                success: function(html)
                                {
                                    myApp.hidePreloader(); 


                                    
                                    if(html.userverified == "YES"){
                                        //myApp.alert('giriş başarılı', 'EFES');
                                        window.localStorage.setItem("username",$("#per_no").val());
                                        window.localStorage.setItem("last_activity",current_time.getTime());

                                        //.myApp.showPreloader();

                                        // $.ajax({
                                        //     url: base_url+"getperdtl.aspx",
                                        //     type: 'POST',
                                        //     data:{__VIEWSTATE:"/wEPDwULLTEzMTc4NjY3NThkZC4hb0xCHGU61Y4+Y9cnP5BJH2DpY7+iWv7JDN3k4og9",__EVENTVALIDATION:"/wEWAwK64+CKCALnp8nWCALCi9reA/e+ezefxx0poHeg0s5mcj4Ir2M2bsevOVPr6M/P29VY",txtUid2:window.localStorage.getItem("username"),btnSubmit:"Submit"},
                                        //     success: function(html){
                                        //         if(html.usersearch){
                                        //             val = html.usersearch[0];
                                        //             window.localStorage.setItem("user_feed_name",val.name);
                                                   
                                        //            // myApp.hidePreloader(); 
                                                  
                                        //         }

                                        //     }
                                        // });









                                        if(window.localStorage.getItem('tnc_val')){
                                            mainView.router.loadPage('wel_page.html');

                                        }else{
                                            mainView.router.loadPage('tnc_page.html');

                                        }




                                    }else{
                                         myApp.alert(html.userverified, 'EFES');
                                    }
                                    // 
                                    
                                   
                                }
                            });



                        }else{
                           myApp.alert('TC Kimlik No gerekli.', 'EFES');
                        }
                    }else{
                           myApp.alert('Personel No gerekli.', 'EFES');

                    }
               });
            }else{
              
                mainView.router.loadPage('wel_page.html');

            }
         
        }, 1000);
            

       // myApp.alert('Here comes our login!');
        // $('.preloader_page').delay(2000).fadeOut();
        // $('.app_login_page').delay(2000).fadeIn();
        // mainView.router.loadPage('wel_page.html');

       // 
       //alert(window.localStorage.getItem("username")); 
      
    }
    if (page.name === 'tnc_page') {

        $(".tnc_accept_btn").on("click",function(){
            window.localStorage.setItem('tnc_val', 'yes');
            mainView.router.loadPage('wel_page.html');

        });


       

       
    }
    if (page.name === 'wel_page') {
     
        if(window.localStorage.getItem("username")){
        
     
            myApp.showPreloader();

            
            get_feeds("no");


            // Pull to refresh content
            var ptrContent = $$('.pull-to-refresh-content');  

            // Add 'refresh' listener on it
            ptrContent.on('refresh', function (e) {
                get_feeds("yes");
           
                
            });

        }else{
            //alert("wel_out");
            //
            setTimeout(function () {
                mainView.router.loadPage('login_page.html');

            },1000);

        }




    }


    if (page.name === 'edit_feed') {
       selected_images_edit = new Array();
       var img_count = 0;
        myApp.showPreloader();

        $.ajax({  
            url: base_url+"getuniqfeed.aspx?UID="+page.query.uid,
            type: 'GET',
            success: function(html)
            {
                //html ={  "feeddata": [ { "uniqid": "34", "userid": "90000245", "username": "ENDER ÖNER", "feeddata": "Nitesh test edit 1 2", "likes": "2", "imagename": [ { "imageid": "161", "image": "extra_23_1461407926530.jpg", "uploaddate": "4/23/2016 3:38:22 AM"},{ "imageid": "160", "image": "extra_23_1461407926530.jpg", "uploaddate": "4/23/2016 3:38:22 AM"},{ "imageid": "159", "image": "extra_23_1461407865360.jpg", "uploaddate": "4/23/2016 3:37:19 AM"},{ "imageid": "158", "image": "extra_23_1461407814372.jpg", "uploaddate": "4/23/2016 3:36:27 AM"},{ "imageid": "157", "image": "main_23_1461407811766.jpg", "uploaddate": "4/23/2016 3:36:27 AM"} ], "uploaddate": "4/23/2016 3:36:27 AM", "approved": "Yes", "pin": "No", "image": "/USER/profile_6_1459942067806.jpg" }] };
                console.log(html);
                $("#customText_edit").val(html.feeddata[0].feeddata);

                var images = html.feeddata[0].imagename;
                for(var i=0;i<images.length;i++){
                    //alert(images[i].image);
                    //$("#images").append('<div class="swiper-slide "><img src="'+base_url+'/images/'+images[i].image+'" class="slider_img press pinch"   alt=""></div>');
                    $('#multi_img').append('<div class="col-50 multiple_img_upload"><img src="'+base_url+'/images/'+images[i].image+'" alt=""><div class="multiple_cross_btn feed_image_delete" alt="'+images[i].imageid+'"><i class="fa fa-close"></i></div></div>');



                    
                }

                $("#customText_edit").MaxLength({
                    MaxLength: 360,
                    CharacterCountControl: $('#counter')
                });

                $(".feed_image_delete").on("click",function(){
                    $(this).parent().remove();
                    image_id_for_delete = $(this).attr("alt");
                    //alert(image_id_for_delete);
                    myApp.showPreloader();

                     $.ajax({  
                        url: base_url+"feededit.aspx?ImageId="+image_id_for_delete+"&IsDelete=1",
                        type: 'GET',
                        success: function(html)
                        {
                            myApp.hidePreloader();

                        }
                    });

                });
                    // 
                    // 
                myApp.hidePreloader();
                
            }
        });


        $("#img_upload_btn_edit").on("click",function(){

            upload_images_feed_edit();    
       
        });


        function upload_images_feed_edit(){

           // alert("dqw");
            // navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            //     destinationType: Camera.DestinationType.FILE_URI,
            //     sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
            window.imagePicker.getPictures(
                function(results) {
                    selected_images_edit = [];
                    for (var i = 0; i < results.length; i++) {
                        selected_images_edit[i] = results[i];
                        
                        $('#multi_img').append('<div class="multiple_img_upload"><img src="'+selected_images_edit[i]+'" alt="" ></div>');
                       
                    }
                    

                    
                }, function (error) {
                    myApp.alert('Error: ' + error,"EFES");

                },{
                    maximumImagesCount: 4,
                    quality: 50
                }
            );
        }


        function upload_extra_img_feed_edit(image_uri,unique_data_id){
            //myApp.showPreloader("Yükleniyor.");

            imageURI = image_uri;

            date = new Date();
            var file_nitesh = imageURI.substr(imageURI.lastIndexOf('/')+1);
            file_extn = file_nitesh.substr(file_nitesh.lastIndexOf('.'));
            var options = new FileUploadOptions();
            options.fileKey="fuImage";
           // options.fileName="extra_"+imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.fileName="extra_"+date.getDate()+"_"+date.getTime()+file_extn;
           
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

            options.headers = {

                Connection: "close"

            };

            var params = {};
            params.__VIEWSTATE = "/wEPDwUKLTU2MTQ1ODc3OQ9kFgICAw8WAh4HZW5jdHlwZQUTbXVsdGlwYXJ0L2Zvcm0tZGF0YWRkPp0NOQAB3hTr3bJFoLCzZzoazqcvFSRKznoa4EGO3tE=";
            params.__EVENTVALIDATION = "/wEWAwLumq8xAomo5ogEAsKL2t4DqqCCl9KWrk2W/fZWpTrQjalKHNuBSZj1xpTF5M1Khuw=";
            params.txtUniqId = unique_data_id;
            params.btnSubmit = "Submit";
            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://95.130.170.228/EpesData/GetImage.aspx"), win_edit, fail_edit, options);
        }


        function win_edit(r) {
            img_count++;
            
            if(selected_images_edit[img_count]){
                upload_extra_img_feed_edit(selected_images_edit[img_count],page.query.uid);
            }else{
                myApp.hidePreloader("Yükleniyor.");
                mainView.router.loadPage('wel_page.html');
            }
        }

        function fail_edit(r){
            myApp.hidePreloader("Yükleniyor.");
            mainView.router.loadPage('wel_page.html');
        }



        $("#post_page_submit_edit").on("click",function(){
            myApp.showPreloader("Yükleniyor.");
            //alert("start");
            // for feed text update onlhy
            var from_data = {
                __VIEWSTATE:"/wEPDwULLTE2MTM0NzY5ODIPZBYCAgMPFgIeB2VuY3R5cGUFE211bHRpcGFydC9mb3JtLWRhdGFkZP5Lfk3UQGSMFKjwBrVH13fDmLsF5j6e8hrxFODUJPux",
                __EVENTVALIDATION:"/wEWBQKPwsLWDAKM+5bqDwL9orimCgLhwuCmBQLCi9reA8idj7I6NOYIxAJ6bvSePp1vWAp7Z9FowXm6QVxM9rr0",
                txtId:page.query.uid,
                txtFeedData:$("#customText_edit").val(),
                btnSubmit:"Submit"
            }
            $.ajax({  
                url: base_url+"feededit.aspx",
                type: 'POST',
                data:from_data,
                success: function(html)
                {
                    //alert(html);
                    // for(var ij =0;ij<selected_images_edit.length;ij++){
                    //     if(selected_images_edit[ij]){
                    //         upload_extra_img_feed_edit(selected_images_edit[ij],page.query.uid);
                        
                    //     }
                    // }

                    // myApp.hidePreloader("Yükleniyor.");
                    // mainView.router.loadPage('wel_page.html');
                    
                    //alert("end");
                    if(selected_images_edit[0]){
                        upload_extra_img_feed_edit(selected_images_edit[0],page.query.uid);

                    }else{
                        myApp.hidePreloader("Yükleniyor.");
                        mainView.router.loadPage('wel_page.html');
                    }

                }
            });











        });


   }




    if (page.name === 'feed_photo') {

       // alert(page.query.uid);
        $(".swiper-button-next").hide();
        $(".swiper-button-prev").hide();
        myApp.showPreloader();

        $.ajax({  
            url: base_url+"getuniqfeed.aspx?UID="+page.query.uid,
            type: 'GET',
            success: function(html)
            {
                console.log(html);

                //alert(html.feeddata[0].username);
                //<div class="swiper-slide"><img src="images/feed_photo.jpg" class="slider_img" alt=""></div>
                var date_time = html.feeddata[0].uploaddate;
                var time_ago = jQuery.timeago(date_time);

                $("#ex_time_ago").html(time_ago);
                $("#username").html(html.feeddata[0].username);
                $("#feeddata").html(html.feeddata[0].feeddata);
                $("#likes").html(html.feeddata[0].likes);

                var images = html.feeddata[0].imagename;

                var gallary_images = [];
                for(var i=0;i<images.length;i++){
                    //alert(images[i].image);
                    $("#images").append('<div class="swiper-slide "><img src="'+base_url+'/images/'+images[i].image+'" class="slider_img press pinch"   alt=""></div>');
                    gallary_images[i] = base_url+'/images/'+images[i].image;
                }

                $("#feed_photo_profile").css("background-image","url("+base_url+html.feeddata[0].image+")");
                // $.each(abc.feeddata[0].imagename,function(index,value){
                //     alert(value.image);
                //     $("#images").append('<div class="swiper-slide"><img src="'+base_url+'/images/'+value.image+'" class="slider_img" alt=""></div>');
                // });

                if(images.length >=1){
                    var mySwiper = myApp.swiper('.swiper-container', {
                      autoHeight:true,

                      pagination: '.swiper-pagination',
                      paginationHide: false,
                      paginationClickable: true,
                      nextButton: '.swiper-button-next',
                      prevButton: '.swiper-button-prev',
                    });
                }
                //Slider
                


                if(images.length >1){
                    $(".swiper-button-next").show();
                    $(".swiper-button-prev").show();
                }

                myApp.hidePreloader();


               var myPhotoBrowser = myApp.photoBrowser({
                    zoom: 400,
                    photos: gallary_images,
                    theme: 'dark',
                    type: 'standalone'
                }); 


                



                $(".slider_img").on("click",function(){
                    myPhotoBrowser.open();

                  //    (function() {
                  //   var ham = new Hammer( $( ".photo-browser-zoom-container" )[ 0 ], {
                  //     domEvents: true
                  //   } );
                  //   var width = 0;
                  //   var height = 0;
                  //   var left = 0;
                  //   var top = 0;
                  //   ham.get('pinch').set({ enable: true });
                  //   $( ".photo-browser-zoom-container" ).on( "pinch", function( e ) {
                  //      //   width = $(this).css('width');
                  //      //   height = $(this).css('height');
                  //      //  //alert( "pinch" );
                  //      //  //
                  //      //  $( this ).css({
                  //      //   width: width * e.originalEvent.gesture.scale,
                  //      //   "margin-left": -left * e.originalEvent.gesture.scale,
                  //      //   height: height * e.originalEvent.gesture.scale,
                  //      //   "margin-top": -top * e.originalEvent.gesture.scale
                  //      // });  
                  //      //$(this).find('img').css('transform','scale('+e.originalEvent.gesture.scale+')');
                  //      $(this).css('transform','translate3d('+e.pageX+','+e.pageY+', 0px)');

                  //      //
                  //      //alert( e.originalEvent.gesture.scale );
                  //   } );
                  //   $( ".photo-browser-zoom-container" ).on( "pinchend", function( e ) {
                  //     width = width * e.originalEvent.gesture.scale;
                  //     height = height * e.originalEvent.gesture.scale;
                  //     left = left * e.originalEvent.gesture.scale;
                  //     top = top * e.originalEvent.gesture.scale;
                  //     //alert( width );
                  //   } );
                  // } )();



                }); 

                  // (function() {
                  //   new Hammer( $( ".press" )[ 0 ], {
                  //     domEvents: true
                  //   } );
                  //   $( ".press" ).on( "press", function( e ) {
                  //      //$( ".demo-overlay" ).toggle()
                  //      //console.log('pressssss');
                  //      $(this).css('transform','scale(2)');
                  //   } );
                  // } )();
                  
     
            }
        });
        $("#feed_photo_like").on("click",function(){
            if(window.localStorage.getItem("username")){
                var feed_id = page.query.uid;
                var user_name = window.localStorage.getItem("username");

                instance_div = $(this);

                $.ajax({
                    url: base_url+"Likes.aspx",
                    type: 'POST',
                    data:{__VIEWSTATE:"/wEPDwUKLTcxMjI4Mjc5NmRkheNW8Uakr4Rpt3oZRbKJUr7F+u3dH1uHVuGOxty20PE=",__EVENTVALIDATION:"/wEWBAKdosu1DgKl1bKzCQKfrtLtCALCi9reAwpFVJ8BFl4CJMfz5eTJNDu8R9suDeCCfDIfMNnoIuE6",txtUserName:user_name,txtFeedId:feed_id,submit:"Submit"},
                    //data:{device_uid:'123456'},
                
                    success: function(html){
                        //alert(html);

                        if(html.likesadded == "YES"){
                           var likes =  instance_div.siblings('#likes').html();
                           likes = likes/1;
                           likes++;
                           instance_div.siblings('#likes').html(likes);
                        }


                      
                    }
                });
            }else{

                mainView.router.loadPage('login_page.html');

            }

        });


       
        
       
    }


    if (page.name == 'opportunities_detail') {
        
        $("#all_opportunities_detail").html(opportunities_list);
        
    }

    if (page.name == 'opportunities') {
       // alert("opp");
        myApp.showPreloader();

        $.ajax({  
            url: base_url+"FirsatlarGet.aspx?tkcn="+window.localStorage.getItem("username"),
            type: 'GET',
            success: function(html)
            {
                console.log(html);

                $("#all_opportunities").html("");

                if(html.polldata){
                    $.each(html.polldata,function(index,value){
                        var date_time = value.date;
                        var time_ago = jQuery.timeago(date_time);

                        var poll_html = '<div class="post_survey" id="post_id'+value.pollid+'"><div class="survey_text"><h5>'+value.pollTitle+' <span>'+time_ago+'</span></h5><p>'+value.question+'</p></div><div class="survey_btns">';
                        if(value.opt1 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt1+'" alt="'+value.pollid+'" >'+value.opt1+'</a>';
                        }
                        if(value.opt2 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt2+'" alt="'+value.pollid+'" >'+value.opt2+'</a>';
                        }
                        if(value.opt3 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt3+'" alt="'+value.pollid+'" >'+value.opt3+'</a>';
                        }
                        if(value.opt4 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt4+'" alt="'+value.pollid+'" >'+value.opt4+'</a>';
                        }

                        poll_html += '</div></div>';
                       
                       $("#all_opportunities").append(poll_html);
                    });

                    
                    
                }




                if(html.firsatlar){
                    $.each(html.firsatlar,function(index,value){
                       // alert(value.dept);
                       
                        var date_ = value.date.split(" ");

                        var read_ = "";
                        if(value.read == "NO"){
                            read_ = "news_circle_bg";
                        }
                        var opportunities = '<div class=" news_wrap_opportunities" alt="'+value.firid+'"><div class="row" style="padding-top: 5px;"><div class="col-100"><div class="row"><div class="col-66"><div class="news_circle '+read_+'"></div><div class="news_heading"><p>'+value.title.substring(0,20)+'</p></div></div><div class="col-33"><div class="news_date"><p>'+date_[0]+'</p></div></div></div></div><div class="col-100"><div class="news_text"><div class="excerpt_text">'+value.excerpt+'</div><div class="rich_text">'+value.text+'</div><span class="news_arrow"><i class="fa fa-chevron-right"></i></span></div></div></div></div>'




                        $("#all_opportunities").append(opportunities);
                    });
                }
                
              

                myApp.hidePreloader();


            }
        });

        
        var ptrContent = $$('.pull-to-refresh-content');  
        ptrContent.on('refresh', function (e) {
            //myApp.showPreloader();

            $.ajax({  
                url: base_url+"FirsatlarGet.aspx?tkcn="+window.localStorage.getItem("username"),
                type: 'GET',
                success: function(html)
                {
                    console.log(html);

                    $("#all_opportunities").html("");


                    if(html.polldata){
                        $.each(html.polldata,function(index,value){
                            var date_time = value.date;
                            var time_ago = jQuery.timeago(date_time);

                            var poll_html = '<div class="post_survey" id="post_id'+value.pollid+'"><div class="survey_text"><h5>'+value.pollTitle+' <span>'+time_ago+'</span></h5><p>'+value.question+'</p></div><div class="survey_btns">';
                            if(value.opt1 != ""){
                                poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt1+'" alt="'+value.pollid+'" >'+value.opt1+'</a>';
                            }
                            if(value.opt2 != ""){
                                poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt2+'" alt="'+value.pollid+'" >'+value.opt2+'</a>';
                            }
                            if(value.opt3 != ""){
                                poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt3+'" alt="'+value.pollid+'" >'+value.opt3+'</a>';
                            }
                            if(value.opt4 != ""){
                                poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt4+'" alt="'+value.pollid+'" >'+value.opt4+'</a>';
                            }

                            poll_html += '</div></div>';
                           
                           $("#all_opportunities").append(poll_html);
                        });

                        
                        
                    }


                    if(html.firsatlar){
                        $.each(html.firsatlar,function(index,value){
                           // alert(value.dept);
                            var date_ = value.date.split(" ");
                            var read_ = "";
                            if(value.read == "NO"){
                                read_ = "news_circle_bg";
                            }
                            var opportunities = '<div class=" news_wrap_opportunities" alt="'+value.firid+'"><div class="row" style="padding-top: 5px;"><div class="col-100"><div class="row"><div class="col-66"><div class="news_circle '+read_+'"></div><div class="news_heading"><p>'+value.title.substring(0,20)+'</p></div></div><div class="col-33"><div class="news_date"><p>'+date_[0]+'</p></div></div></div></div><div class="col-100"><div class="news_text"><div class="excerpt_text">'+value.excerpt+'</div><div class="rich_text">'+value.text+'</div><span class="news_arrow"><i class="fa fa-chevron-right"></i></span></div></div></div></div>'




                            $("#all_opportunities").append(opportunities);
                        });
                    }
                    
                   

                    //myApp.hidePreloader();
                    setTimeout(function () {
                        myApp.pullToRefreshDone();
                    },2000);

                }
            });

        });



    }

    if (page.name == 'announcement_detail') {
        // alert(announcements_list);
        // console.log(announcements_list);`

        $("#all_announcements_detail").html(announcements_list);
        
    }


    if (page.name == 'announcements') {
        var toggle_ind = 0;
        var department_type = "DEPT=ALL";
        $('.all_news_btn').click(function () {

            //$('.all_news_dd').slideToggle(1000);
            //
            if(toggle_ind == 0){
                toggle_ind = 1;
                var hei =  $(".all_news_dd").prop('scrollHeight');
                $(".all_news_dd").animate({height:hei},500);
            }else{
                toggle_ind = 0;
                $(".all_news_dd").animate({height:0},500);
            }

            $('.up_arrow').toggle();
            if($('.down_arrow').hasClass('down_arrow_class')){
                $('.down_arrow').removeClass("down_arrow_class");
            }else{
                $('.down_arrow').addClass("down_arrow_class");
            }
        });
      // alert(department_type);

        myApp.showPreloader();
        //
         // html = {  "announcements": [ { "dept": "Genel Duyurular ", "title": "genel duyuruyorum hejdghwdfh gdfgh", "date": "31/03/2016 21:46", "text": "eveve Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },{ "dept": "Genel Duyurular", "title": "Duyuruyorum", "date": "29/03/2016 22:24", "text": "asdasdasd" },{ "dept": "Satis Ve Pazarlama", "title": "Test2", "date": "18/02/2016 20:50", "text": "Test Ann2" },{ "dept": "Genel Duyurular", "title": "Test1", "date": "17/02/2016 20:50", "text": "Test Ann1" } ] , "polldata": [ ]  }
        $.ajax({  
            url: base_url+"getannouncements.aspx?"+department_type+"&tkcn="+window.localStorage.getItem("username"),
            type: 'GET',
            dataType:'json',
            success: function(html)
            {   
                
                //console.log(html);

                // alert("dewd");
                $("#all_announcements").html("");

                if(html.polldata){
                    $.each(html.polldata,function(index,value){
                        var date_time = value.date;
                        var time_ago = jQuery.timeago(date_time);

                        var poll_html = '<div class="post_survey" id="post_id'+value.pollid+'"><div class="survey_text"><h5>'+value.pollTitle+' <span>'+time_ago+'</span></h5><p>'+value.question+'</p></div><div class="survey_btns">';
                        if(value.opt1 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt1+'" alt="'+value.pollid+'" >'+value.opt1+'</a>';
                        }
                        if(value.opt2 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt2+'" alt="'+value.pollid+'" >'+value.opt2+'</a>';
                        }
                        if(value.opt3 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt3+'" alt="'+value.pollid+'" >'+value.opt3+'</a>';
                        }
                        if(value.opt4 != ""){
                            poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt4+'" alt="'+value.pollid+'" >'+value.opt4+'</a>';
                        }

                        poll_html += '</div></div>';
                        
                        $("#all_announcements").append(poll_html);
                       

                    });

                    
                    
                }



                if(html.announcements){
                    //announcements_list;
                    $.each(html.announcements,function(index,value){
                       // alert(value.dept);
                        var date_ = value.date.split(" ");
                        var read_ = "";
                        if(value.read == "NO"){
                            read_ = "news_circle_bg";
                        }

                        var anouncements = '<div class="news_wrap news_wrap_announcement" alt="'+value.announcementid+'" type="Announcements"><div class=""><div class="col-100"><div class="news_title"><p>'+value.dept+'</p></div></div><div class="col-100"><div class="row"><div class="col-66"><div class="news_circle '+read_+'"></div><div class="news_heading"><p>'+value.title.substring(0,20)+'</p></div></div><div class="col-33"><div class="news_date"><p>'+date_[0]+'</p></div></div></div></div><div class="col-100"><div class="news_text"><div class="opp_excerpt">'+value.excerpt+'</div><div class="rk_text">'+value.text+'</div><span class="news_arrow"><i class="fa fa-chevron-right"></i></span></div></div></div></div>';

                        $("#all_announcements").append(anouncements);
                    });
                }

                
                
                myApp.hidePreloader();


                var ptrContent = $$('.pull-to-refresh-content');  
                ptrContent.on('refresh', function (e) {
                    //myApp.showPreloader();

                    $.ajax({  
                        url: base_url+"getannouncements.aspx?"+department_type+"&tkcn="+window.localStorage.getItem("username"),
                        type: 'GET',
                        success: function(html)
                        {
                            //console.log(html);

                            
                            $("#all_announcements").html("");
                            if(html.polldata){
                                $.each(html.polldata,function(index,value){
                                    var date_time = value.date;
                                    var time_ago = jQuery.timeago(date_time);

                                    var poll_html = '<div class="post_survey" id="post_id'+value.pollid+'"><div class="survey_text"><h5>'+value.pollTitle+' <span>'+time_ago+'</span></h5><p>'+value.question+'</p></div><div class="survey_btns">';
                                    if(value.opt1 != ""){
                                        poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt1+'" alt="'+value.pollid+'" >'+value.opt1+'</a>';
                                    }
                                    if(value.opt2 != ""){
                                        poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt2+'" alt="'+value.pollid+'" >'+value.opt2+'</a>';
                                    }
                                    if(value.opt3 != ""){
                                        poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt3+'" alt="'+value.pollid+'" >'+value.opt3+'</a>';
                                    }
                                    if(value.opt4 != ""){
                                        poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt4+'" alt="'+value.pollid+'" >'+value.opt4+'</a>';
                                    }

                                    poll_html += '</div></div>';
                                    
                                    $("#all_announcements").append(poll_html);
                                   

                                });

                                
                                
                            }

                            if(html.announcements){
                                //announcements_list;
                                $.each(html.announcements,function(index,value){
                                   // alert(value.dept);
                                    var date_ = value.date.split(" ");
                                    var read_ = "";
                                    if(value.read == "NO"){
                                        read_ = "news_circle_bg";
                                    }

                                    var anouncements = '<div class="news_wrap news_wrap_announcement" alt="'+value.announcementid+'" type="Announcements" ><div class=""><div class="col-100"><div class="news_title"><p>'+value.dept+'</p></div></div><div class="col-100"><div class="row"><div class="col-66"><div class="news_circle '+read_+'"></div><div class="news_heading"><p>'+value.title.substring(0,20)+'</p></div></div><div class="col-33"><div class="news_date"><p>'+date_[0]+'</p></div></div></div></div><div class="col-100"><div class="news_text"><div class="opp_excerpt">'+value.excerpt+'</div><div class="rk_text">'+value.text+'</div><span class="news_arrow"><i class="fa fa-chevron-right"></i></span></div></div></div></div>';

                                    $("#all_announcements").append(anouncements);
                                });
                            }

                            // $(".news_wrap").on("click",function(){
                            //     announcements_list = $(this).html();
                            //     mainView.router.loadPage('announcement_detail.html');
                            // });
                            //myApp.hidePreloader();
                            setTimeout(function () {
                                myApp.pullToRefreshDone();
                            },2000);

                        }
                    });

                });

                
            },done: function(res){
               // alert(res);
            }
        });

        $(".announcement_type").on("click",function(){
            $('.all_news_btn').click();

            var type = $(this).attr("alt");

            //console.log($(this).children('a').text());
            //
            $("#type_head").text($(this).children('a').text());
            if(type != "DEPT=ALL"){
               
                $(".all_categories").show();
            }else{
              

                $(".all_categories").hide();

            }


            if(type != department_type && type != ""){
                myApp.showPreloader();
                department_type = type;
                $.ajax({  
                    url: base_url+"getannouncements.aspx?"+department_type+"&tkcn="+window.localStorage.getItem("username"),
                    type: 'GET',
                    success: function(html)
                    {
                        //console.log(html);

                       
                        $("#all_announcements").html("");
                        if(html.polldata){
                            $.each(html.polldata,function(index,value){
                                var date_time = value.date;
                                var time_ago = jQuery.timeago(date_time);

                                var poll_html = '<div class="post_survey" id="post_id'+value.pollid+'"><div class="survey_text"><h5>'+value.pollTitle+' <span>'+time_ago+'</span></h5><p>'+value.question+'</p></div><div class="survey_btns">';
                                if(value.opt1 != ""){
                                    poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt1+'" alt="'+value.pollid+'" >'+value.opt1+'</a>';
                                }
                                if(value.opt2 != ""){
                                    poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt2+'" alt="'+value.pollid+'" >'+value.opt2+'</a>';
                                }
                                if(value.opt3 != ""){
                                    poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt3+'" alt="'+value.pollid+'" >'+value.opt3+'</a>';
                                }
                                if(value.opt4 != ""){
                                    poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt4+'" alt="'+value.pollid+'" >'+value.opt4+'</a>';
                                }

                                poll_html += '</div></div>';
                                
                                $("#all_announcements").append(poll_html);
                               

                            });

                            
                            
                        }

                        if(html.announcements){
                            $.each(html.announcements,function(index,value){
                                //alert(value.dept);
                                var date_ = value.date.split(" ");
                                var read_ = "";
                                if(value.read == "NO"){
                                    read_ = "news_circle_bg";
                                }

                                var anouncements = '<div class="news_wrap news_wrap_announcement" alt="'+value.announcementid+'" type="Announcements" ><div class=""><div class="col-100"><div class="news_title"><p>'+value.dept+'</p></div></div><div class="col-100"><div class="row"><div class="col-66"><div class="news_circle '+read_+'"></div><div class="news_heading"><p>'+value.title.substring(0,20)+'</p></div></div><div class="col-33"><div class="news_date"><p>'+date_[0]+'</p></div></div></div></div><div class="col-100"><div class="news_text"><div class="opp_excerpt">'+value.excerpt+'</div><div class="rk_text">'+value.text+'</div><span class="news_arrow"><i class="fa fa-chevron-right"></i></span></div></div></div></div>';

                                $("#all_announcements").append(anouncements);
                            });
                        }
                        // $(".news_wrap").on("click",function(){
                        //     announcements_list = $(this).html();
                        //     mainView.router.loadPage('announcement_detail.html');
                        // });

                        myApp.hidePreloader();

                        var ptrContent = $$('.pull-to-refresh-content');  
                        ptrContent.on('refresh', function (e) {
                            //myApp.showPreloader();

                            $.ajax({  
                                url: base_url+"getannouncements.aspx?"+department_type+"&tkcn="+window.localStorage.getItem("username"),
                                type: 'GET',
                                success: function(html)
                                {
                                    //console.log(html);

                                    // alert("dewd");
                                    $("#all_announcements").html("");

                                    if(html.polldata){
                                        $.each(html.polldata,function(index,value){
                                            var date_time = value.date;
                                            var time_ago = jQuery.timeago(date_time);

                                            var poll_html = '<div class="post_survey" id="post_id'+value.pollid+'"><div class="survey_text"><h5>'+value.pollTitle+' <span>'+time_ago+'</span></h5><p>'+value.question+'</p></div><div class="survey_btns">';
                                            if(value.opt1 != ""){
                                                poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt1+'" alt="'+value.pollid+'" >'+value.opt1+'</a>';
                                            }
                                            if(value.opt2 != ""){
                                                poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt2+'" alt="'+value.pollid+'" >'+value.opt2+'</a>';
                                            }
                                            if(value.opt3 != ""){
                                                poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt3+'" alt="'+value.pollid+'" >'+value.opt3+'</a>';
                                            }
                                            if(value.opt4 != ""){
                                                poll_html += '<a href="javascript:void(0)" class="button survey_yes_btn feed_poll_opt" value="'+value.opt4+'" alt="'+value.pollid+'" >'+value.opt4+'</a>';
                                            }

                                            poll_html += '</div></div>';
                                            
                                            $("#all_announcements").append(poll_html);
                                           

                                        });

                                        
                                        
                                    }


                                    if(html.announcements){
                                        //announcements_list;
                                            $.each(html.announcements,function(index,value){
                                           // alert(value.dept);
                                            var date_ = value.date.split(" ");
                                            var read_ = "";
                                            if(value.read == "NO"){
                                                read_ = "news_circle_bg";
                                            }
                                            var anouncements = '<div class="news_wrap news_wrap_announcement" alt="'+value.announcementid+'" type="Announcements" ><div class=""><div class="col-100"><div class="news_title"><p>'+value.dept+'</p></div></div><div class="col-100"><div class="row"><div class="col-66"><div class="news_circle '+read_+'"></div><div class="news_heading"><p>'+value.title.substring(0,20)+'</p></div></div><div class="col-33"><div class="news_date"><p>'+date_[0]+'</p></div></div></div></div><div class="col-100"><div class="news_text"><div class="opp_excerpt">'+value.excerpt+'</div><div class="rk_text">'+value.text+'</div><span class="news_arrow"><i class="fa fa-chevron-right"></i></span></div></div></div></div>';

                                            $("#all_announcements").append(anouncements);
                                        });
                                    }

                                    // $(".news_wrap").on("click",function(){
                                    //     announcements_list = $(this).html();
                                    //     mainView.router.loadPage('announcement_detail.html');
                                    // });
                                    //myApp.hidePreloader();
                                    setTimeout(function () {
                                        myApp.pullToRefreshDone();
                                    },2000);

                                }
                            });

                        });
                        
                    }
                });
            }
            
        });


    }

    if(page.name == "post"){

       var image_file_uri = "";
       selected_images = new Array();
       var unique_data_id = "";
       var image_count = 1;
        $("#customText").MaxLength(
        {
            MaxLength: 360,
            CharacterCountControl: $('#counter')
        });

       
        $("#img_upload_btn").on("click",function(){
             nitesh();    
            // //alert("click 1");
            // if($("#customText").val() != ""){
            //     nitesh();    
            // }else{
            //     //myApp.alert('');
            //     myApp.alert('Text field is required !', 'EFES');
            // }

        });

        function nitesh(){

           // alert("dqw");
            // navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            //     destinationType: Camera.DestinationType.FILE_URI,
            //     sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
            window.imagePicker.getPictures(
                function(results) {
                    selected_images = [];
                    for (var i = 0; i < results.length; i++) {
                        selected_images[i] = results[i];
                        //alert(results[i]);
                        // var img = new Image();
                        // img.src = results[i];

                       // alert(img);
                        $('#multi_img').append('<div class="multiple_img_upload"><img src="'+selected_images[i]+'" alt="" id="nitesh_img"></div>');
                       // uploadPhoto(results[i]);
                    }
                    // $(".multiple_cross_btn").on("click",function(){
                    //     $(this).parent().remove();
                    //     image_file_uri = "";
                    // });

                    
                }, function (error) {
                    myApp.alert('Error: ' + error,"EFES");

                },{
                    maximumImagesCount: 4,
                    quality: 70
                }
            );
        }


        function onSuccess(imageURI) {
            image_file_uri = imageURI;
            $('#multi_img').append('<div class="col-50 multiple_img_upload"><img src="'+imageURI+'" alt="" id="nitesh_img"><div class="multiple_cross_btn"><i class="fa fa-close"></i></div></div>');

            $(".multiple_cross_btn").on("click",function(){
                $(this).parent().remove();
                image_file_uri = "";
            });

              
           
        }
 
        function win(r) {
            myApp.hidePreloader();
           // alert(r.response);

            data = JSON.parse(r.response);

            if(data.error == "NONE" && data.uniqueid != ""){
                unique_data_id = data.uniqueid;
                 if(selected_images[image_count]){
                    upload_extra_img(selected_images[image_count]);
                }else{
                    selected_images = "";
                    myApp.hidePreloader();
                    mainView.router.loadPage('wel_page.html');

                }
            }

            if(data.error && data.error != "NONE"){
                myApp.alert(data.error, 'Error');

            }

            if(data.result == "SAVED"){
                image_count++;
                if(selected_images[image_count]){
                    upload_extra_img(selected_images[image_count]);
                }else{

                    myApp.hidePreloader();
                    mainView.router.loadPage('wel_page.html');

                }
                
            }

            $("#customText").val("");
            $('#multi_img').html("");
            
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }
        function upload_extra_img(image_uri){
            myApp.showPreloader("Yükleniyor.");

            imageURI = image_uri;

            date = new Date();
            var file_nitesh = imageURI.substr(imageURI.lastIndexOf('/')+1);
            file_extn = file_nitesh.substr(file_nitesh.lastIndexOf('.'));
            var options = new FileUploadOptions();
            options.fileKey="fuImage";
           // options.fileName="extra_"+imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.fileName="extra_"+date.getDate()+"_"+date.getTime()+file_extn;
           
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

            options.headers = {

                Connection: "close"

            };

            var params = {};
            params.__VIEWSTATE = "/wEPDwUKLTU2MTQ1ODc3OQ9kFgICAw8WAh4HZW5jdHlwZQUTbXVsdGlwYXJ0L2Zvcm0tZGF0YWRkPp0NOQAB3hTr3bJFoLCzZzoazqcvFSRKznoa4EGO3tE=";
            params.__EVENTVALIDATION = "/wEWAwLumq8xAomo5ogEAsKL2t4DqqCCl9KWrk2W/fZWpTrQjalKHNuBSZj1xpTF5M1Khuw=";
            params.txtUniqId = unique_data_id;
            params.btnSubmit = "Submit";
            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://95.130.170.228/EpesData/GetImage.aspx"), win, fail, options);
        }

        function fail(error) {
            $("#customText").val("");
            $('#multi_img').html("");
            myApp.hidePreloader();
            myApp.alert("An error has occurred: Code = " + error.code,"EFES");
            //$("#loader").hide();
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        function onFail(message) {
          myApp.alert('Failed because: ' + message,"EFES");
        }

        $("#post_page_submit").on("click",function(){
            if(window.localStorage.getItem("username")){

                //if($("#customText").val() != ""){
                    if(selected_images[0]){
                        myApp.showPreloader("Yükleniyor.");

                        imageURI = selected_images[0];

                        date = new Date();
                        var file_nitesh = imageURI.substr(imageURI.lastIndexOf('/')+1);
                        file_extn = file_nitesh.substr(file_nitesh.lastIndexOf('.'));


                        var options = new FileUploadOptions();
                        options.fileKey="fuImage";
                        //options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
                        options.fileName="main_"+date.getDate()+"_"+date.getTime()+file_extn;
                        options.mimeType="image/jpeg";
                        options.chunkedMode = false;

                        options.headers = {

                            Connection: "close"

                        };

                        var params = {};
                        params.__VIEWSTATE = "/wEPDwUJLTg2MTA1NTA1D2QWAgIDDxYCHgdlbmN0eXBlBRNtdWx0aXBhcnQvZm9ybS1kYXRhZGSThzPq+sIy3XZX27TSz9oWjYA39FQrXGbJOV7gFT0W1Q==";
                        params.__EVENTVALIDATION = "/wEWBQKe6q+uBAKl1bKzCQL9orimCgK8hOCtCALCi9reAwbkTFlr3vADfRAbAJpgnErbmV7RBgtmSSqDlvVuFcxV";
                        params.txtUserName = window.localStorage.getItem("username");
                        params.txtFeedData = $("#customText").val();
                        params.txtLikes = "0";
                        params.btnSubmit = "Submit";
                        options.params = params;

                        var ft = new FileTransfer();
                        ft.upload(imageURI, encodeURI("http://95.130.170.228/EpesData/getdata.aspx"), win, fail, options);
                    }else{
                        //myApp.alert('Image is required !', 'EFES');
                        
                        $.ajax({
                            url: base_url+"getdata.aspx",
                            type: 'POST',
                            data:{__VIEWSTATE:"/wEPDwUJLTg2MTA1NTA1D2QWAgIDDxYCHgdlbmN0eXBlBRNtdWx0aXBhcnQvZm9ybS1kYXRhZGSThzPq+sIy3XZX27TSz9oWjYA39FQrXGbJOV7gFT0W1Q==",__EVENTVALIDATION:"/wEWBQKe6q+uBAKl1bKzCQL9orimCgK8hOCtCALCi9reAwbkTFlr3vADfRAbAJpgnErbmV7RBgtmSSqDlvVuFcxV",txtFeedData:$("#customText").val(),txtUserName:window.localStorage.getItem("username"),txtLikes:"0",btnSubmit:"Submit",fuImage:""},
                            success: function(html){
                                //alert(html);

                                $("#customText").val("");
                                $('#multi_img').html("");

                                myApp.hidePreloader();
                                mainView.router.loadPage('wel_page.html');

                               // alert(html);

                               // instance_div.parent().parent().fadeOut();
                            }
                        });


                    }
                // }else{
                //     //myApp.alert('');
                //     myApp.alert('Text field is required !', 'EFES');
                // }

            }else{
                mainView.router.loadPage('login_page.html');

            }
        });



    

       
    }

    


    if (page.name === 'reports') {
       

        $("#report_data").html("");
        myApp.showPreloader();
         
        $.ajax({  
            url: base_url+"PdfJson.aspx",
            type: 'GET',
            success: function(html)
            {
                //console.log(html);

                $.each(html.pdfcontent,function(ind,val){
                    if(val.pdfcat == "RAPORLAR VE DOKUMANLAR"){
                        //console.log(val);
                        $("#report_data").append('<div class="col-33 repor_pdf_link" data-link = "'+base_url+'PDF/'+val.pdffilename+'"><div class="reports_box"><div class="report_pdf_name"><p>'+val.pdffilename.split(".")[0]+'</p></div></div></div>');
                    }
                });

                $(".repor_pdf_link").on("click",function(){
                    window.open($(this).attr("data-link"), '_system', 'location=yes')
                    
                }); 

                myApp.hidePreloader();


            }


        });
       
    }

    if (page.name === 'porsedurler') {
       

        $("#porse_data").html("");
        myApp.showPreloader();

        
         
        $.ajax({  
            url: base_url+"PdfJson.aspx",
            type: 'GET',
            success: function(html)
            {
                console.log(html);

                $.each(html.pdfcontent,function(ind,val){
                    if(val.pdfcat == "PROSEDURLER"){
                        //console.log(val);
                        $("#porse_data").append('<div class="col-33 repor_pdf_link" data-link = "'+base_url+'PDF/'+val.pdffilename+'"><div class="reports_box"><div class="report_pdf_name"><p>'+val.pdffilename.split(".")[0]+'</p></div></div></div>');
                    }
                });

                $(".repor_pdf_link").on("click",function(){
                    window.open($(this).attr("data-link"), '_system', 'location=yes')
                    
                }); 

                myApp.hidePreloader();


            }


        });
       
    }



    if (page.name === 'bira_kulturu') {
       

        $("#bira_data").html("");
        myApp.showPreloader();

         
        $.ajax({  
            url: base_url+"PdfJson.aspx",
            type: 'GET',
            success: function(html)
            {
                //console.log(html);

                $.each(html.pdfcontent,function(ind,val){
                    if(val.pdfcat == "Bira Kültürü" || val.pdfsubcat == "Bira Kültürü"){
                        //console.log(val);
                        $("#bira_data").append('<div class="col-33 repor_pdf_link" data-link = "'+base_url+'PDF/'+val.pdffilename+'"><div class="reports_box"><div class="report_pdf_name"><p>'+val.pdffilename.split(".")[0]+'</p></div></div></div>');
                    }
                });

                $(".repor_pdf_link").on("click",function(){
                    window.open($(this).attr("data-link"), '_system', 'location=yes')
                    
                }); 

                myApp.hidePreloader();


            }


        });
       
    }




    if (page.name === 'together') {



       

        $("#birarada_data").html("");
        
        myApp.showPreloader();

       
         
        $.ajax({  
            url: base_url+"PdfJson.aspx",
            type: 'GET',
            success: function(html)
            {
                console.log(html);
                var i=1;
                $.each(html.pdfcontent,function(ind,val){
                    if(val.pdfcat == "BIRARADA DERGI"){

                        if(val.thumbnail == ""){
                            img = 'images/report_pdf.jpg';
                        }else{
                            img = base_url+'PDF/'+val.thumbnail;
                        }
                        //console.log(val);
                        $("#birarada_data").prepend('<div class="col-33 repor_pdf_link" data-link = "'+base_url+'PDF/'+val.pdffilename+'"><div class="together_box"><img src="'+img+'" alt=""><div class="together_number"><p> SAYI '+i+'</p></div></div></div>');
                        i++;
                    }
                });

                $(".repor_pdf_link").on("click",function(){
                    window.open($(this).attr("data-link"), '_system', 'location=yes')
                    
                }); 

                myApp.hidePreloader();


            }


        });
       
    }


    if (page.name === 'brands') {
       

        $("#brands_data").html("");
        
        myApp.showPreloader();
        
       
       
         
        $.ajax({  
            url: base_url+"BrandJson.aspx",
            type: 'GET',
            success: function(html)
            {
                //console.log(html);

                $.each(html.brands,function(ind,val){
                     $("#brands_data").append('<div class="col-33 brand_wrap"><a href="brand_details.html?brand_id='+val.brandid+'"><div class="brands_box" style="background-image: url('+base_url+'Brands/'+val.brandlogo+');"></div></a></div>');
                    
                });

               

                myApp.hidePreloader();


            }


        });
       
    }

    if (page.name === 'brand_details') {
       
        brand_id = page.query.brand_id;
       


       
        
        myApp.showPreloader();
       
      
         
        $.ajax({  
            url: base_url+"BrandJson.aspx",
            type: 'GET',
            success: function(html)
            {
                //console.log(html);

                $.each(html.brands,function(ind,val){
                     if(val.brandid == brand_id){
                        $("#brand_banner").css("background","url('"+base_url+'Brands/'+val.brandbanner+"')");
                        $("#brand_banner").css("background-size","cover");

                        $("#brand_banner").css("background-position","top");

                        $("#brand_name").text(val.brandname);
                        $("#brand_content").text(val.brandcontent);


                        $("#profile_title").text(val.title2);
                        $("#brand_desc").text(val.description);

                        $("#brand_cat").text(val.category);
                        $("#brand_service").text(val.service);
                        $("#brand_derece").text(val.derece);
                        $("#brand_ambalaj").text(val.ambalaj);
                        $("#brand_raf").text(val.raf);
                        $("#brand_ulce").text(val.ulce);
                        $("#spiderpath").attr("src",base_url+'Brands/'+val.spiderpath);

                        $("#dolgun").attr("src","images/dolgunluk/"+val.dolgunluk+".png");
                        $("#aromatik").attr("src","images/aromatiklik/"+val.aromatiklik+".png");
                        $("#goruntu").attr("src","images/goruntu/"+val.goruntu+".png");

                        bardak = val.bardak.split(",");


                        $.each(bardak,function(ind,va){
                            $("#bardak").append('<div class="col-33 open-popup" data-popup=".popup-bardak" ><div class="brand_icon_detail"><img src="images/bardak/'+va+'.png" alt=""><p>Bardak</p></div></div>');
                        });
                        //$("#bardak").attr("src","images/bardak/"+val.bardak+".png");


                        $(".bardak_icon").on("click",function(){
                            //alert("ed");
                            $("#bardak_pop_up").css('display','block');
                        });

                        $("#bardak_pop_close").on("click",function(){
                            //alert("ed");
                            $("#bardak_pop_up").css('display','none');
                        });





                     }
                    
                });

               

                myApp.hidePreloader();


               

            }

                




        });


    }


    if (page.name === 'about_us') {
        
        $("#tarich").on("click",function(){

            iabRef = window.open('http://anadoluefes.com.tr/hakkimizda/tarihcemiz', '_blank', 'location=yes');
            
        }); 

        $("#vizyon").on("click",function(){
            window.open('http://anadoluefes.com.tr/hakkimizda/vizyonumuz-misyonumuz', '_blank', 'location=yes')
            
        }); 

        $("#deger").on("click",function(){
            window.open('http://anadoluefes.com.tr/hakkimizda/degerlerimiz', '_blank', 'location=yes')
            
        }); 

        $("#fabrik").on("click",function(){
            window.open('http://anadoluefes.com.tr/hakkimizda/fabrikalarimiz', '_blank', 'location=yes')
            
        }); 

        $("#odull").on("click",function(){
            window.open('http://anadoluefes.com.tr/hakkimizda/odullerimiz', '_blank', 'location=yes')
            
        }); 
    }

    if (page.name === 'toplumsal') {
        
        $("#turi").on("click",function(){

            iabRef = window.open('http://anadoluefes.com.tr/toplumsal-sorumluluk/gelecek-turizmde', '_blank', 'location=yes');
            

            
        }); 

        $("#tari").on("click",function(){
            window.open('http://anadoluefes.com.tr/toplumsal-sorumluluk/gelecek-tarimda', '_blank', 'location=yes')
            
        }); 

        $("#sanat").on("click",function(){
            window.open('http://anadoluefes.com.tr/toplumsal-sorumluluk/kultur-sanat', '_blank', 'location=yes')
            
        }); 

        $("#spor").on("click",function(){
            window.open('http://anadoluefes.com.tr/toplumsal-sorumluluk/spor', '_blank', 'location=yes')
            
        }); 

        $("#sorumlu").on("click",function(){
            window.open('http://anadoluefes.com.tr/toplumsal-sorumluluk/sorumlu-tuketim', '_blank', 'location=yes')
            
        }); 
    }


    if (page.name === 'surdur') {
       
        
        $("#politi").on("click",function(){

            iabRef = window.open('http://anadoluefes.com.tr/surdurulebilirlik/surdurulebilirlik-politikamiz', '_blank', 'location=yes');
           
        }); 

        $("#rapor").on("click",function(){
            window.open('http://anadoluefes.com.tr/surdurulebilirlik/surdurulebilirlik-raporu', '_blank', 'location=yes')
            
        }); 

    }

    if (page.name === 'search') {

        
            myApp.showPreloader();

            $.ajax({  
                url: base_url+"GetLocations.aspx",
                type: 'GET',
                success: function(html)
                {
                    
                     locations_list = html;

                    $("#search_location").html("");                               
                                                    
                    $("#search_location").append('<option value="" disabled selected>Tüm Lokasyonlar</option>');
                    if(html.location){
                        $.each(html.location,function(ind,val){
                            $("#search_location").append('<option value="'+val.locationcode+'" >'+val.locationtext+'</option>');

                        });

                    }

                     myApp.hidePreloader();


                }


            });
        
        $("#search_location").on("change",function(){
            location_val = $(this).val();
            myApp.showPreloader();

            
            $.ajax({  
                url: base_url+"GetDept.aspx",
                type: 'POST',
                data:{__VIEWSTATE:'/wEPDwULLTEzMTc4NjY3NThkZGEscyV5gbVBpps65VNMpmYgTQIBO8Ju3ph/gWhJIbS4',__EVENTVALIDATION:'/wEWAwK7tcbFBgKF+9bXBQLCi9reA6ok3DiSKvO+jAnD/3qO4FgNM5a/8H8q6AZvnHG4w40c',txtLoc:location_val,btnSubmit:'Submit'},
                success: function(dept)
                {
                    
                

                    $("#search_dept").html("");                               
                    $("#search_dept").append('<option value="" disabled selected>Tüm Departmanlar</option>');
                    if(dept.departments){
                        $.each(dept.departments,function(ind,val){
                            $("#search_dept").append('<option value="'+val.departmentcode+'" >'+val.departmenttext+'</option>');

                        });

                    }

                     myApp.hidePreloader();


                }


            });

        });



        $("#btnSubmit").on("click",function(){
            //mainView.router.loadPage('search_result.html');

            myApp.showPreloader();

            $.ajax({  
                url: base_url+"getper.aspx",
                type: 'POST',
                data:$("#search_form").serialize(),
                success: function(html)
                {
                    
                     person_search_result = html;

                     mainView.router.loadPage('search_result.html');

                     myApp.hidePreloader();


                }


            });
        });


        

    }


    if (page.name === 'search_result') {

        //alert(person_search_result);

        //console.log(person_search_result);
        //
        $("#result_list").html("");
        
        $("#result_text").text(person_search_result.result);
        if(person_search_result.usersearch){
            $.each(person_search_result.usersearch,function(ind,val){
                content = '<a href="search_profile_detail.html?user_id='+val.perno+'"><div class="search_result"><div class="result_userimg" style="background-image: url('+base_url+val.photo+');"></div><div class="result_detail"><div class="result_detail_name"><h4>'+val.name+'</h4><p>'+val.title+'</p></div><div class="result_detail_loc_dept"><div class="result_detail_loc"><h5>Lokasyon</h5><p>'+val.loc+'</p></div><div class="result_detail_dept"><h5>Departman</h5><p>'+val.dept+'</p></div></div></div></div></a>';
                $("#result_list").append(content);

            });
        }
        
    }

    if (page.name === 'search_profile_detail') {

        user_no = page.query.user_id;
        
        
        if(person_search_result.usersearch){
            $.each(person_search_result.usersearch,function(ind,val){
                if(val.perno == user_no){
                    $("#result_photo").css("background-image",'url('+base_url+val.photo+')');
                    $("#result_title").text(val.name);
                    $("#result_name").text(val.title);
                    $("#result_department").text(val.dept);
                    $("#result_location").text(val.loc);
                    $("#result_email").attr("href","mailto:"+val.email);
                    $("#result_email").text(val.email);

                    $("#result_phone").attr("href","tel:"+val.phone);
                    $("#result_phone").text(val.phone);
                    $("#user_feeds").on("click",function(){
                        mainView.router.loadPage('my_posts.html?user_id='+val.perno);

                    });
                   return false;
                }



            });
        }else{
            myApp.showPreloader();
            //html={ "status": "OK", "result": "Personel bilgisi iletildi", "usersearch": [ { "title": "Sendikalı İşçi", "name": "ENDER", "familyname": "ÖNER", "phone": "", "perno": "90000245", "loc": "Anadolu Efes - İstanbul", "haspic": "X", "dept": "TBTZ. İst. D.Fıçılama", "email": "", "picture": "/USER/90000245.Bmp" } ] };
            $.ajax({
                url: base_url+"getperdtlx.aspx",
                type: 'POST',
                data:{__VIEWSTATE:"/wEPDwULLTEzMTc4NjY3NThkZAVsUVuJqJG7K5caVhzxUYthBEuztNiAwTyZN7W7NZ4Z",__EVENTVALIDATION:"/wEWAwKKz7SDBwLnp8nWCALCi9reA7QmPsZEsK1mdLdnIH0KitUlJLMwmlI2CLa/oPkSoiT5",txtUid2:user_no,btnSubmit:"Submit"},
                success: function(html){
                    if(html.usersearch){
                        val = html.usersearch[0];
                        $("#result_photo").css("background-image",'url('+base_url+val.picture+')');
                        $("#result_title").text(val.name);
                        $("#result_name").text(val.title);
                        $("#result_department").text(val.dept);
                        $("#result_location").text(val.loc);
                        $("#result_email").attr("href","mailto:"+val.email);
                        $("#result_email").text(val.email);
                        if(val.showphone != "NO"){
                            $("#result_phone").attr("href","tel:"+val.phone);
                            $("#result_phone").text(val.phone);
                        }
                        
                        $("#user_feeds").on("click",function(){
                            mainView.router.loadPage('my_posts.html?user_id='+val.perno);

                        });
                        myApp.hidePreloader();
                    }
                }
            });
        }
        
    }
    if (page.name === 'my_profile') {

        
        
        
        
        



        if(window.localStorage.getItem("username")){
            myApp.showPreloader();
            //html={ "status": "OK", "result": "Personel bilgisi iletildi", "usersearch": [ { "title": "Sendikalı İşçi", "name": "ENDER", "familyname": "ÖNER", "phone": "", "perno": "90000245", "loc": "Anadolu Efes - İstanbul", "haspic": "X", "dept": "TBTZ. İst. D.Fıçılama", "email": "", "picture": "/USER/90000245.Bmp" } ] };
            $.ajax({
                url: base_url+"getperdtlx.aspx",
                type: 'POST',
                data:{__VIEWSTATE:"/wEPDwULLTEzMTc4NjY3NThkZAVsUVuJqJG7K5caVhzxUYthBEuztNiAwTyZN7W7NZ4Z",__EVENTVALIDATION:"/wEWAwKKz7SDBwLnp8nWCALCi9reA7QmPsZEsK1mdLdnIH0KitUlJLMwmlI2CLa/oPkSoiT5",txtUid2:window.localStorage.getItem("username"),btnSubmit:"Submit"},
                success: function(html){
                    if(html.usersearch){
                        val = html.usersearch[0];
                        $("#profile_photo").css("background-image",'url('+base_url+val.picture+')');
                        $("#profile_title").text(val.name+" "+val.familyname);
                        $("#profile_name").text(val.title);
                        $("#profile_department").text(val.dept);
                        $("#profile_location").text(val.loc);
                        $("#profile_email").attr("href","mailto:"+val.email);
                        $("#profile_email").text(val.email);

                        $("#profile_phone").attr("href","tel:"+val.phone);
                        $("#profile_phone").text(val.phone);

                        var og_phone_stat = "";
                        if(val.showphone == "NO"){
                            og_phone_stat = "NO";
                            $("#phone_status").attr("checked",false);
                        }else{
                            og_phone_stat = "YES";

                            $("#phone_status").attr("checked",true);

                        }



                        $("#phone_status").on("change",function(){
                            var now_stat = "";
                           if(this.checked) {
                                now_stat = "YES";

                            }else{
                                now_stat = "NO";

                            }

                            if(og_phone_stat != now_stat){

                                og_phone_stat = now_stat;
                                //console.log("call");
                               
                                $.ajax({
                                    url: base_url+"UserUpdate.aspx",
                                    type: 'POST',
                                    data:{__VIEWSTATE:"/wEPDwUKMTEzMDk4MTM1NA9kFgICAw8WAh4HZW5jdHlwZQUTbXVsdGlwYXJ0L2Zvcm0tZGF0YWRkhP5C1YCbxNldzBqnSRxiLLy/nPrqRKQkVW81FKegENA=",__EVENTVALIDATION:"/wEWCgKwkLybBwKl1bKzCQL9h72aAQKF+9bXBQKB5fjZAQLEku2wCAK24+CpAQKW+q3cBwL0lYOsCwLCi9reAzAdnymotdXhg37/9ws8RY/NPjm9ObeQwVXeMe/SYa0w",rbOption:og_phone_stat,txtUserName:window.localStorage.getItem("username"),btnSubmit:"Submit"},
                                    success: function(html){
                                        console.log(html);
                                    }
                                });

                            }

                        });

                        $('#change_photo').on("click",function () {
                          
                           navigator.camera.getPicture(upload_profile_Photo, function(message) {
                                    myApp.alert('get picture failed',"EFES");
                                },{
                                    quality: 50, 
                                    destinationType: navigator.camera.DestinationType.FILE_URI,
                                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                                }
                            );


                           function upload_profile_Photo(imageURI) {
                                $('.my_profile_pic').css('background-image', 'url("' + imageURI + '")');
                                date = new Date();
                                var file_nitesh = imageURI.substr(imageURI.lastIndexOf('/')+1);
                                var file_extn = file_nitesh.substr(file_nitesh.lastIndexOf('.'));
                                if(file_extn != ".jpg" || file_extn != ".JPG" || file_extn != ".JPEG" || file_extn != ".jpeg" || file_extn != ".PNG" || file_extn != ".png"){
                                  file_extn =   ".jpg";
                                }
                                var options = new FileUploadOptions();
                                options.fileKey="fuImage";
                               // options.fileName="extra_"+imageURI.substr(imageURI.lastIndexOf('/')+1);
                                options.fileName="profile_"+date.getDate()+"_"+date.getTime()+file_extn;
                               
                                options.mimeType="image/jpeg";
                                options.chunkedMode = false;

                                options.headers = {

                                    Connection: "close"

                                };
                                //alert(options.fileName+'---'+file_extn+'-----');

                                var params = {};
                                params.__VIEWSTATE = "/wEPDwUKMTEzMDk4MTM1NA9kFgICAw8WAh4HZW5jdHlwZQUTbXVsdGlwYXJ0L2Zvcm0tZGF0YWRkhP5C1YCbxNldzBqnSRxiLLy/nPrqRKQkVW81FKegENA=";
                                params.__EVENTVALIDATION = "/wEWCgKwkLybBwKl1bKzCQL9h72aAQKF+9bXBQKB5fjZAQLEku2wCAK24+CpAQKW+q3cBwL0lYOsCwLCi9reAzAdnymotdXhg37/9ws8RY/NPjm9ObeQwVXeMe/SYa0w";
                                params.txtUserName = window.localStorage.getItem("username");
                                params.btnSubmit = "Submit";
                                options.params = params;

                                var ft = new FileTransfer();
                                myApp.showPreloader("Yükleniyor.");

                                ft.upload(imageURI, encodeURI(base_url+"UserUpdate.aspx"),profile_win,profile_fail, options);
                                //ft.upload(imageURI, "http://yourdomain.com/upload.php", win, fail, options);
                            }
                     
                            function profile_win(r) {
                                  myApp.hidePreloader();

                                // console.log("Code = " + r.responseCode);
                                // console.log("Response = " + r.response);
                                // console.log("Sent = " + r.bytesSent);
                                // alert(r.response);
                            }
                     
                            function profile_fail(error) {
                                myApp.hidePreloader();

                                myApp.alert("An error has occurred: Code = " + error.code,"EFES");
                            }



                        }); 


                        $("#my_feeds").on("click",function(){
                            mainView.router.loadPage('my_posts.html?user_id='+val.perno);

                        });
                      
                    }
                    myApp.hidePreloader();

                }
            });
        }else{
            setTimeout(function () {
                mainView.router.loadPage('login_page.html');
                
            },1000);

        }

        $("#my_profile_logout").on("click",function(){
            window.localStorage.removeItem("username");
            mainView.router.loadPage('login_page.html');

        });
        
    }

    if (page.name === 'my_posts') {

        myApp.showPreloader();
        $.ajax({  
            url: base_url+"GetJson.aspx?USR="+page.query.user_id,
            type: 'GET',
            success: function(html)
            {
                var all_feeds = "";

                myApp.hidePreloader();
                
                if(html.feeddata){
                    for(var i=0;i<html.feeddata.length;i++){
                            //alert(value.imagename[0].image);
                    
                        var date_time = html.feeddata[i].uploaddate;
                        var time_ago = jQuery.timeago(date_time);
                        var posts = '<div class="welcome_post"><div class="row no-gutter"><div class="col-75"><div class="profile_img" style="background-image: url('+base_url+html.feeddata[i].image+');"></div><div class="user_name"><p>'+html.feeddata[i].username+'</p><span>'+time_ago+'</span></div></div><div class="col-25"><div class="likes_wrap"><span class="likes_count">'+html.feeddata[i].likes+'</span><div class="post_likes" alt="'+html.feeddata[i].uniqid+'"><i class="fa fa-heart"></i></div></div></div></div><div class="row"><a href="feed_photo.html?uid='+html.feeddata[i].uniqid+'"><div class="col-100"><div class="post_text"><p>'+html.feeddata[i].feeddata+'</p></div>';
                            if(html.feeddata[i].imagename[0] && html.feeddata[i].imagename[0].image != ""){
                                //feed_img = html.feeddata[i].imagename[0].image;
                                posts +='<div class="post_img"><img src="'+base_url+'/images/'+html.feeddata[i].imagename[0].image+'" alt=""></div>';
                            }
                             posts +='</div></div></a></div>';
                        // $(".welcome_wrapper").append(posts);
                       all_feeds += posts;
                        
                    }

                    
                }

                
                
                $("#my_posts_list").html("");

                $("#my_posts_list").append(all_feeds);

            }
        });

    }

    if (page.name === 'uygul') {
        // document.addEventListener("deviceready", onDeviceReady, false);

        // function onDeviceReady() {

        //         device_model = device.model;
        //         device_platform =  device.platform;
        //         device_uid =  device.uuid;
        //         device_version = device.version;
        //         alert(device.platform);


        // }
        //alert(device_platform);
        myApp.showPreloader();
        $.ajax({  
            url: base_url+"UygulamlarJson.aspx",
            type: 'GET',
            success: function(html)
            {
               
                $.each(html.uygulamlar,function(ind,val){
                    var ext_link = "";
                    if(device_platform.toLowerCase() == "ios"){
                        ext_link = val.ioslink;
                    }else if(device_platform.toLowerCase() == "andriod"){
                        ext_link = val.androidlink;
                    }else{
                        ext_link = val.microsoftlink;
                    }

                    $('#uygul_data').append('<div class="col-33 open_url_title" alt="'+ext_link+'"><div class="ugul_bg"><div class="ugul_icon" style="background-image: url('+base_url+val.uyimage+');"></div><p>'+val.uytitle+'</p></div></div>');
                });
                $(".open_url_title").on("click",function(){
                   //alert($(this).attr("alt"));
                    window.open($(this).attr("alt"), '_system', 'location=yes')   
                });

                myApp.hidePreloader();


            }
        });
    }
    
    if (page.name === 'test') {
            //alert("hellloooo");

        // $.getScript("pinch_js/prettify.js", function(){
        //    //alert("hellloooo");

        // });
        // $.getScript("pinch_js/modernizr.min.js", function(){

        // });
        // $.getScript("pinch_js/jquery-1.10.0.min.js", function(){

        // });   
        // $.getScript("pinch_js/jquery.mousewheel.min.js", function(){

        // });
        // $.getScript("pinch_js/jquery.hammer.min.js", function(){

        // });
        // $.getScript("pinch_js/bootstrap.min.js", function(){

        // });
        // $.getScript("pinch_js/TweenMax.min.js", function(){

        // });
        // $.getScript("pinch_js/plugins/ScrollToPlugin.min.js", function(){

        // });

        //  $.getScript("pinch_js/main.min.js", function(){

        // });

        //$("#img1").pinchZoomer();
    }

});


// Generate dynamic page
// var dynamicPageIndex = 0;
// function createContentPage() {
//  mainView.router.loadContent(
//         '<!-- Top Navbar-->' +
//         '<div class="navbar">' +
//         '  <div class="navbar-inner">' +
//         '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
//         '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
//         '  </div>' +
//         '</div>' +
//         '<div class="pages">' +
//         '  <!-- Page, data-page contains page name-->' +
//         '  <div data-page="dynamic-pages" class="page">' +
//         '    <!-- Scrollable page content-->' +
//         '    <div class="page-content">' +
//         '      <div class="content-block">' +
//         '        <div class="content-block-inner">' +
//         '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
//         '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
//         '        </div>' +
//         '      </div>' +
//         '    </div>' +
//         '  </div>' +
//         '</div>'
//     );
//  return;
// }