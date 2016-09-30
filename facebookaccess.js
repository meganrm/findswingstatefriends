
function newTagjQuery(tagType, parent, text){
  var elementName=$('<'+tagType+'>');
  elementName.appendTo(parent).text(text);
  return elementName;
}

function newlistitem(listid, text) {
  newTagjQuery('li', listid, text);
}


// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

var loginbutton = $('#login')

loginbutton.on('click', function(event) {
  event.preventDefault();
  FB.login(function(response) {
    if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
      });
      FB.api('/me/family',
  function (response) {
    if (response && !response.error) {
      console.log(response);
      for (var i = 0; i < response['data'].length; i++) {
        newlistitem($('#events'), response['data'][i]['name']+', '+ response['data'][i]['relationship'])}

        }
          }
          );
          FB.api("/me/posts",
            function (response) {
              if (response && !response.error) {
                console.log(response);
                for (var i = 0; i < response['data'].length; i++) {
                  console.log(response['data']);
                  postid= response['data'][i]['id']
                 newlistitem($('#events'), response['data'][i]['message'])
                 console.log(postid);
                 FB.api(
                  "/postid/likes", {  "summary": true},
                  function (response) {
                    if (response && !response.error) {
                      console.log(response);
                      newlistitem($('#events'), response)}
                })
  }

               }
               }
               );
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
}, {scope:"user_relationship_details,user_events, user_relationships, user_posts"})
})



window.fbAsyncInit = function() {
  FB.init({
    appId      : '1738519856408489',
    xfbml      : true,
    version    : 'v2.7'
  });
};




(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

 function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
