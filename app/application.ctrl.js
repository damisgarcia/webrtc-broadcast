'use strict'

// @private

var ApplicationCtrl = function($rootScope){
  var self = this

  self.aswer = false

  self.rooms = []
  self.candidates = []

  self.joinRoom = function(room){
    captureUserMedia(function() {
        broadcastUI.joinRoom({
            roomToken: room.roomToken,
            joinUser: room.broadcaster
        });
    });
    hideUnnecessaryStuff();
  }

  self.getCandidate = function(candidate){
    if(self.aswer){
      if(participants.children.length >= 2){
        participants.removeChild(participants.firstChild)
      }
      var video = candidate.video
      video.setAttribute('controls', true);
      video.setAttribute('autoplay', true);
      video.setAttribute('class', 'aswer');
      participants.insertBefore(video, participants.firstChild)
    }
  }

  var config = {
      openSocket: function(config) {
          // https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Signaling.md
          // This method "openSocket" can be defined in HTML page
          // to use any signaling gateway either XHR-Long-Polling or SIP/XMPP or WebSockets/Socket.io
          // or WebSync/SignalR or existing implementations like signalmaster/peerserver or sockjs etc.

          var channel = config.channel || location.href.replace( /\/|:|#|%|\.|\[|\]/g , '');
          var socket = new Firebase('https://webrtc.firebaseIO.com/' + channel);
          socket.channel = channel;

          socket.on('child_added', function(data) {
              config.onmessage(data.val());
          });

          socket.send = function(data) {
              this.push(data);
          };

          config.onopen && setTimeout(config.onopen, 1);
          socket.onDisconnect().remove();
          return socket;
      },
      onRemoteStream: function(candidate) {
        if(self.aswer){
          self.candidates.push(candidate)
        } else{
          var video = candidate.video;
          video.setAttribute('controls', true);
          video.setAttribute('class', 'aswer');
          participants.insertBefore(video, participants.firstChild);
          video.play();
        }

        $rootScope.$apply()
      },
      onRoomFound: function(room) {
        if(self.rooms.length == 0){
          self.rooms.push(room)
          $rootScope.$apply()
        } else{
          var array = _.uniqBy(self.rooms, 'roomToken').map(function(r){ return r.roomToken })

          array.forEach(function(r){
            if(!_.includes(array, room.roomToken)){
              self.rooms.push(room)
              $rootScope.$apply()
            }
          })
        }
      }
  };


  /* on page load: get public rooms */
  var broadcastUI = broadcast(config);

  /* UI specific */
  var participants = document.getElementById("participants") || document.body;
  var startConferencing = document.getElementById('start-conferencing');
  var roomsList = document.getElementById('rooms-list');

  if (startConferencing) self.createRoom = createButtonClickHandler;

  function createButtonClickHandler() {
      captureUserMedia(function() {
          broadcastUI.createRoom({
              roomName: (document.getElementById('conference-name') || { }).value || 'Anonymous'
          });
      });

      self.aswer = true

      hideUnnecessaryStuff();
  }

  function captureUserMedia(callback) {
      var video = document.createElement('video');
      video.setAttribute('autoplay', true);
      video.setAttribute('controls', true);
      participants.insertBefore(video, participants.firstChild);

      getUserMedia({
          video: video,
          onsuccess: function(stream) {
              config.attachStream = stream;
              callback && callback(video);

              video.setAttribute('muted', true);
              video.setAttribute('class','me')
          },
          onerror: function() {
              alert('unable to get access to your webcam.');
              callback && callback();
          }
      });
  }

  function hideUnnecessaryStuff() {
      var visibleElements = document.getElementsByClassName('visible'),
          length = visibleElements.length;
      for (var i = 0; i < length; i++) {
          visibleElements[i].style.display = 'none';
      }
  }


  (function() {
      var uniqueToken = document.getElementById('unique-token');
      if (uniqueToken)
          if (location.hash.length > 2) uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;"><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
          else uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace( /\./g , '-');
  })();



  return self
}

ApplicationCtrl.$inject = ['$rootScope']

angular.module("app").controller('ApplicationCtrl', ApplicationCtrl)
