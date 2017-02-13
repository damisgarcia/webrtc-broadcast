// Muaz Khan         - www.MuazKhan.com
// MIT License       - www.WebRTC-Experiment.com/licence
// Experiments       - github.com/muaz-khan/WebRTC-Experiment

// var client = {
//   aswer: false
// }
//
// var config = {
//     openSocket: function(config) {
//         // https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Signaling.md
//         // This method "openSocket" can be defined in HTML page
//         // to use any signaling gateway either XHR-Long-Polling or SIP/XMPP or WebSockets/Socket.io
//         // or WebSync/SignalR or existing implementations like signalmaster/peerserver or sockjs etc.
//
//         var channel = config.channel || location.href.replace( /\/|:|#|%|\.|\[|\]/g , '');
//         var socket = new Firebase('https://webrtc.firebaseIO.com/' + channel);
//         socket.channel = channel;
//         socket.on('child_added', function(data) {
//             config.onmessage(data.val());
//         });
//         socket.send = function(data) {
//             this.push(data);
//         };
//         config.onopen && setTimeout(config.onopen, 1);
//         socket.onDisconnect().remove();
//         return socket;
//     },
//     onRemoteStream: function(media) {
//         var video = media.video;
//         video.setAttribute('controls', true);
//
//         participants.insertBefore(video, participants.firstChild);
//
//         video.setAttribute('class','aswer')
//         video.play();
//         // rotateVideo(video);
//     },
//     onRoomFound: function(room) {
//         var alreadyExist = document.getElementById(room.broadcaster);
//         if (alreadyExist) return;
//
//         if (typeof roomsList === 'undefined') roomsList = document.body;
//
//         var tr = document.createElement('div');
//         tr.setAttribute('class', 'row');
//         tr.setAttribute('id', room.broadcaster);
//         tr.innerHTML = '<div class="col-md-10"><h4>' + room.roomName + '</h4></div>' +
//             '<div class="col-md-2"><button class="join btn btn-default" id="' + room.roomToken + '">Join Room</button></div>';
//         roomsList.insertBefore(tr, roomsList.firstChild);
//
//         tr.onclick = function() {
//             tr = this;
//             captureUserMedia(function() {
//                 broadcastUI.joinRoom({
//                     roomToken: tr.querySelector('.join').id,
//                     joinUser: tr.id
//                 });
//             });
//             hideUnnecessaryStuff();
//         };
//     }
// };
//
// function createButtonClickHandler() {
//     captureUserMedia(function() {
//         client.aswer = true
//         broadcastUI.createRoom({
//             roomName: (document.getElementById('conference-name') || { }).value || 'Anonymous'
//         });
//     });
//     hideUnnecessaryStuff();
// }
//
// function captureUserMedia(callback) {
//     var video = document.createElement('video');
//     video.setAttribute('autoplay', true);
//     video.setAttribute('controls', true);
//     participants.insertBefore(video, participants.firstChild);
//
//     getUserMedia({
//         video: video,
//         onsuccess: function(stream) {
//             config.attachStream = stream;
//             callback && callback(video);
//
//             video.setAttribute('muted', true);
//             video.setAttribute('class','me')
//             // rotateVideo(video);
//         },
//         onerror: function() {
//             alert('unable to get access to your webcam.');
//             callback && callback();
//         }
//     });
// }
//
// /* on page load: get public rooms */
// var broadcastUI = broadcast(config);
//
// /* UI specific */
// var participants = document.getElementById("participants") || document.body;
// var startConferencing = document.getElementById('start-conferencing');
// var roomsList = document.getElementById('rooms-list');
//
// if (startConferencing) startConferencing.onclick = createButtonClickHandler;
//
// function hideUnnecessaryStuff() {
//     var visibleElements = document.getElementsByClassName('visible'),
//         length = visibleElements.length;
//     for (var i = 0; i < length; i++) {
//         visibleElements[i].style.display = 'none';
//     }
// }
//
// function rotateVideo(video) {
//     video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
//     setTimeout(function() {
//         video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
//     }, 1000);
// }
//
// (function() {
//     var uniqueToken = document.getElementById('unique-token');
//     if (uniqueToken)
//         if (location.hash.length > 2) uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;"><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
//         else uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace( /\./g , '-');
// })();
