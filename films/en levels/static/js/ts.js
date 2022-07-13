'use strict';
(function (exports) {

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var getBuffer = function getBuffer(file) {
    return fetch(file).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }

      return response.arrayBuffer();
    });
  };
  var throwsError = function throwsError(value) {
    throw new Error("`ts-audio`: " + value);
  };
  var shuffle = function shuffle(list) {
    var result = list.slice();
    var index = list.length - 1;

    while (index >= 0) {
      var randomIdx = Math.floor(Math.random() * index + 1);
      var tmp = result[index];
      result[index] = result[randomIdx];
      result[randomIdx] = tmp;
      index--;
    }

    return result;
  };
  var preloadFiles = function preloadFiles(files, limit, api, done) {
    if (api === void 0) {
      api = fetch;
    }

    var queue = files.slice(limit).reverse();

    var requestNext = function requestNext() {
      if (!queue.length) {
        done == null ? void 0 : done();
        return;
      }

      request(queue.pop());
    };

    var request = function request(fileName) {
      api(fileName).then(requestNext)["catch"](requestNext);
    };

    for (var i = 0; i < limit; i++) {
      request(files[i]);
    }
  };

  var AudioCtx = function AudioCtx() {
    var Context = window.AudioContext || window.webkitAudioContext;

    if (!Context) {
      throwsError("Your browser doesn't support AudioContext - https://bit.ly/2YWmpnX");
    }

    return new Context();
  };

  var states = {
    isDecoded: false,
    isPlaying: false,
    hasStarted: false,
    source: null,
    gainNode: null
  };

  var EventEmitter = function EventEmitter() {
    var events = {};
    return {
      listener: function listener(keyEvent, callback) {
        events[keyEvent] = callback;
      },
      emit: function emit(keyEvent, param) {
        var _events$keyEvent;

        (_events$keyEvent = events[keyEvent]) == null ? void 0 : _events$keyEvent.call(events, param);
      }
    };
  };

  var EventHandler = function EventHandler(emitter, audioCtx) {
    return {
      ready: function ready(callback) {
        emitter.listener('decoded', callback);
      },
      start: function start(callback) {
        emitter.listener('start', callback);
      },
      end: function end(callback) {
        emitter.listener('end', callback);
      },
      state: function state(callback) {
        if (audioCtx) {
          audioCtx.onstatechange = function () {
            return callback({
              data: audioCtx.state
            });
          };
        }
      }
    };
  };

  var initializeSource = function initializeSource(audioCtx, volume, emitter, states) {
    var source = states.source = audioCtx.createBufferSource();
    var gainNode = states.gainNode = audioCtx.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(audioCtx.destination);
    source.connect(gainNode);

    source.onended = function () {
      states.hasStarted = false;
      states.isPlaying = false;
      emitter.emit('end', {
        data: null
      });
    };
  };

  var decodeAudioData = function decodeAudioData(audioCtx, source, arrayBuffer, autoPlay, loop, states, emitter) {
    var onSuccess = function onSuccess(buffer) {
      source.buffer = buffer;
      source.loop = loop;
      states.isDecoded = true;
      emitter.emit('decoded', {
        data: buffer
      });

      if (autoPlay) {
        source.start(0);
        states.isPlaying = true;
      }
    };

    audioCtx.decodeAudioData(arrayBuffer, onSuccess, console.error);
  };

  // state become `suspended` by default. once audiocontext.state is `suspended`
  // the only way to start it after a user gesture is executing the `resume` method

  var start = function start(audioCtx, source) {
    return audioCtx.state === 'suspended' ? audioCtx.resume().then(function () {
      return source.start(0);
    }) : source.start(0);
  };

  var Audio = function Audio(_ref) {
    var file = _ref.file,
      _ref$volume = _ref.volume,
      volume = _ref$volume === void 0 ? 1 : _ref$volume,
      _ref$autoPlay = _ref.autoPlay,
      autoPlay = _ref$autoPlay === void 0 ? false : _ref$autoPlay,
      _ref$loop = _ref.loop,
      loop = _ref$loop === void 0 ? false : _ref$loop,
      _ref$preload = _ref.preload,
      preload = _ref$preload === void 0 ? false : _ref$preload;
    var audioCtx = AudioCtx();

    var states$1 = _extends({}, states);

    var emitter = EventEmitter();
    var eventHandler = EventHandler(emitter, audioCtx);

    var curryGetBuffer = function curryGetBuffer(source) {
      states$1.isDecoded = false;
      getBuffer(file).then(function (buffer) {
        return decodeAudioData(audioCtx, source, buffer, autoPlay, loop, states$1, emitter);
      })["catch"](console.error);
    };

    var Player = {
      play: function play() {
        if (states$1.hasStarted) {
          audioCtx.resume();
          states$1.isPlaying = true;
          return;
        }

        initializeSource(audioCtx, volume, emitter, states$1);
        var source = states$1.source;

        if (source) {
          curryGetBuffer(source);
          states$1.isDecoded ? start(audioCtx, source) : emitter.listener('decoded', function () {
            return start(audioCtx, source);
          });
          states$1.hasStarted = true;
          states$1.isPlaying = true;
          emitter.emit('start', {
            data: null
          });
        }
      },
      pause: function pause() {
        audioCtx.suspend();
        states$1.isPlaying = false;
      },
      toggle: function toggle() {
        states$1.isPlaying ? Player.pause() : Player.play();
      },
      stop: function stop() {
        if (states$1.hasStarted) {
          var _states$source;

          (_states$source = states$1.source) == null ? void 0 : _states$source.stop(0);
          states$1.isPlaying = false;
        }
      },
      on: function on(eventType, callback) {
        var _eventHandler$eventTy;

        (_eventHandler$eventTy = eventHandler[eventType]) == null ? void 0 : _eventHandler$eventTy.call(eventHandler, callback);
      },

      get volume() {
        var _states$gainNode$gain, _states$gainNode;

        return (_states$gainNode$gain = (_states$gainNode = states$1.gainNode) == null ? void 0 : _states$gainNode.gain.value) != null ? _states$gainNode$gain : 0;
      },

      set volume(newVolume) {
        if (states$1.gainNode) {
          states$1.gainNode.gain.value = newVolume;
        }
      },

      get loop() {
        var _states$source$loop, _states$source2;

        return (_states$source$loop = (_states$source2 = states$1.source) == null ? void 0 : _states$source2.loop) != null ? _states$source$loop : false;
      },

      set loop(newLoop) {
        if (states$1.source) {
          states$1.source.loop = newLoop;
        }
      },

      get state() {
        return audioCtx.state;
      }

    };

    if (preload) {
      preloadFiles([file], 1);
    }

    return Player;
  };

  var states$1 = {
    volume: 1,
    loop: false,
    audio: null,
    isStopped: false,
    isPlaying: false,
    audioIndex: 0
  };

  var playNextAudio = function playNextAudio(states, files) {
    var _states$audio;

    var isLastFile = states.audioIndex === files.length - 1;
    states.audioIndex = isLastFile ? 0 : states.audioIndex + 1;
    (_states$audio = states.audio) == null ? void 0 : _states$audio.pause();
    var file = files[states.audioIndex];
    var audio = Audio({
      file: file,
      volume: states.volume
    });
    states.audio = audio;
    audio.play();
  };

  var playPrevAudio = function playPrevAudio(states, files) {
    var _states$audio;

    var isFirstFile = states.audioIndex === 0;
    states.audioIndex = isFirstFile ? files.length - 1 : states.audioIndex - 1;
    (_states$audio = states.audio) == null ? void 0 : _states$audio.pause();
    var file = files[states.audioIndex];
    var audio = Audio({
      file: file,
      volume: states.volume
    });
    states.audio = audio;
    audio.play();
  };

  var playAudio = function playAudio(states, emmiter) {
    var playAudioHelper = function playAudioHelper(files, loop) {
      var file = files[states.audioIndex];
      var audio = Audio({
        file: file,
        volume: states.volume
      });
      states.audio = audio;
      audio.on('start', function (e) {
        return emmiter.emit('start', e);
      });
      audio.on('end', function () {
        if (states.isStopped) return;

        if (files.length === states.audioIndex + 1) {
          states.audio = null;
          states.audioIndex = 0;

          if (states.loop) {
            playAudioHelper(files);
          } else {
            emmiter.emit('end', {
              data: null
            });
            states.isPlaying = false;
          }
        } else {
          states.audioIndex++;
          playAudioHelper(files);
        }
      });
      audio.play();
    };

    return playAudioHelper;
  };

  var AudioPlaylist = function AudioPlaylist(_ref) {
    var files = _ref.files,
      _ref$volume = _ref.volume,
      volume = _ref$volume === void 0 ? 1 : _ref$volume,
      _ref$loop = _ref.loop,
      loop = _ref$loop === void 0 ? false : _ref$loop,
      _ref$shuffle = _ref.shuffle,
      shuffle$1 = _ref$shuffle === void 0 ? false : _ref$shuffle,
      _ref$preload = _ref.preload,
      preload = _ref$preload === void 0 ? false : _ref$preload,
      _ref$preloadLimit = _ref.preloadLimit,
      preloadLimit = _ref$preloadLimit === void 0 ? 3 : _ref$preloadLimit;
    var emmiter = EventEmitter();

    var states = _extends({}, states$1, {
      volume: volume,
      loop: loop
    });

    var copiedFiles = shuffle$1 ? shuffle(files) : files.slice();
    var curryPlayAudio = playAudio(states, emmiter);

    if (preload) {
      preloadFiles(copiedFiles, preloadLimit);
    }

    var Player = {
      play: function play() {
        var audio = states.audio;
        states.isPlaying = true;

        if (!audio || states.isStopped) {
          curryPlayAudio(copiedFiles, loop);
          states.isStopped = false;
          return;
        }

        audio.play();
      },
      toggle: function toggle() {
        states.isPlaying ? Player.pause() : Player.play();
      },
      pause: function pause() {
        var _states$audio;

        (_states$audio = states.audio) == null ? void 0 : _states$audio.pause();
        states.isPlaying = false;
      },
      stop: function stop() {
        var _states$audio2;

        states.isPlaying = false;
        states.isStopped = true;
        (_states$audio2 = states.audio) == null ? void 0 : _states$audio2.stop();
      },
      next: function next() {
        playNextAudio(states, copiedFiles);
      },
      prev: function prev() {
        playPrevAudio(states, copiedFiles);
      },
      on: function on(eventType, callback) {
        emmiter.listener(eventType, callback);
      },

      get volume() {
        return states.volume;
      },

      set volume(newVolume) {
        states.volume = newVolume;

        if (states.audio) {
          states.audio.volume = newVolume;
        }
      },

      get loop() {
        return states.loop;
      },

      set loop(newLoop) {
        states.loop = newLoop;
      }

    };
    return Player;
  };

  exports.AudioPlaylist = AudioPlaylist;
  exports.default = Audio;

})(this.mAudio = {})