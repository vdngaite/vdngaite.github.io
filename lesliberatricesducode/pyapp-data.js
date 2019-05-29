
var Module = typeof Module !== 'undefined' ? Module : {};

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'build/t/pyapp.data';
    var REMOTE_PACKAGE_BASE = 'pyapp.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'renpy', true, true);
Module['FS_createPath']('/renpy', 'angle', true, true);
Module['FS_createPath']('/renpy', 'audio', true, true);
Module['FS_createPath']('/renpy', 'text', true, true);
Module['FS_createPath']('/renpy', 'gl', true, true);
Module['FS_createPath']('/renpy', 'styledata', true, true);
Module['FS_createPath']('/renpy', 'gl2', true, true);
Module['FS_createPath']('/renpy', 'test', true, true);
Module['FS_createPath']('/renpy', 'common', true, true);
Module['FS_createPath']('/renpy/common', '_theme_tv', true, true);
Module['FS_createPath']('/renpy/common', '_theme_amie2', true, true);
Module['FS_createPath']('/renpy/common', '_theme_diamond', true, true);
Module['FS_createPath']('/renpy/common', '_placeholder', true, true);
Module['FS_createPath']('/renpy/common', '_theme_awt', true, true);
Module['FS_createPath']('/renpy/common', '_theme_regal', true, true);
Module['FS_createPath']('/renpy/common', '_roundrect', true, true);
Module['FS_createPath']('/renpy/common', '_theme_austen', true, true);
Module['FS_createPath']('/renpy/common', '_theme_threeD', true, true);
Module['FS_createPath']('/renpy/common', '_theme_marker', true, true);
Module['FS_createPath']('/renpy/common', '_theme_glow', true, true);
Module['FS_createPath']('/renpy/common', '_theme_crayon', true, true);
Module['FS_createPath']('/renpy/common', '_theme_bordered', true, true);
Module['FS_createPath']('/renpy/common', '_outline', true, true);
Module['FS_createPath']('/renpy', 'translation', true, true);
Module['FS_createPath']('/renpy', 'sl2', true, true);
Module['FS_createPath']('/renpy', 'display', true, true);
Module['FS_createPath']('/', 'lib', true, true);
Module['FS_createPath']('/lib', 'python2.7', true, true);
Module['FS_createPath']('/lib/python2.7', 'site-packages', true, true);
Module['FS_createPath']('/lib/python2.7/site-packages', 'pygame_sdl2', true, true);
Module['FS_createPath']('/lib/python2.7/site-packages/pygame_sdl2', 'threads', true, true);

    function DataRequest(start, end, audio) {
      this.start = start;
      this.end = end;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);
        this.finish(byteArray);
      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

        var files = metadata.files;
        for (var i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].audio).open('GET', files[i].filename);
        }

  
      var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      var IDB_RO = "readonly";
      var IDB_RW = "readwrite";
      var DB_NAME = "EM_PRELOAD_CACHE";
      var DB_VERSION = 1;
      var METADATA_STORE_NAME = 'METADATA';
      var PACKAGE_STORE_NAME = 'PACKAGES';
      function openDatabase(callback, errback) {
        try {
          var openRequest = indexedDB.open(DB_NAME, DB_VERSION);
        } catch (e) {
          return errback(e);
        }
        openRequest.onupgradeneeded = function(event) {
          var db = event.target.result;

          if(db.objectStoreNames.contains(PACKAGE_STORE_NAME)) {
            db.deleteObjectStore(PACKAGE_STORE_NAME);
          }
          var packages = db.createObjectStore(PACKAGE_STORE_NAME);

          if(db.objectStoreNames.contains(METADATA_STORE_NAME)) {
            db.deleteObjectStore(METADATA_STORE_NAME);
          }
          var metadata = db.createObjectStore(METADATA_STORE_NAME);
        };
        openRequest.onsuccess = function(event) {
          var db = event.target.result;
          callback(db);
        };
        openRequest.onerror = function(error) {
          errback(error);
        };
      };

      // This is needed as chromium has a limit on per-entry files in IndexedDB
      // https://cs.chromium.org/chromium/src/content/renderer/indexed_db/webidbdatabase_impl.cc?type=cs&sq=package:chromium&g=0&l=177
      // https://cs.chromium.org/chromium/src/out/Debug/gen/third_party/blink/public/mojom/indexeddb/indexeddb.mojom.h?type=cs&sq=package:chromium&g=0&l=60
      // We set the chunk size to 64MB to stay well-below the limit
      var CHUNK_SIZE = 64 * 1024 * 1024;

      function cacheRemotePackage(
        db,
        packageName,
        packageData,
        packageMeta,
        callback,
        errback
      ) {
        var transactionPackages = db.transaction([PACKAGE_STORE_NAME], IDB_RW);
        var packages = transactionPackages.objectStore(PACKAGE_STORE_NAME);
        var chunkSliceStart = 0;
        var nextChunkSliceStart = 0;
        var chunkCount = Math.ceil(packageData.byteLength / CHUNK_SIZE);
        var finishedChunks = 0;
        for (var chunkId = 0; chunkId < chunkCount; chunkId++) {
          nextChunkSliceStart += CHUNK_SIZE;
          var putPackageRequest = packages.put(
            packageData.slice(chunkSliceStart, nextChunkSliceStart),
            'package/' + packageName + '/' + chunkId
          );
          chunkSliceStart = nextChunkSliceStart;
          putPackageRequest.onsuccess = function(event) {
            finishedChunks++;
            if (finishedChunks == chunkCount) {
              var transaction_metadata = db.transaction(
                [METADATA_STORE_NAME],
                IDB_RW
              );
              var metadata = transaction_metadata.objectStore(METADATA_STORE_NAME);
              var putMetadataRequest = metadata.put(
                {
                  uuid: packageMeta.uuid,
                  chunkCount: chunkCount
                },
                'metadata/' + packageName
              );
              putMetadataRequest.onsuccess = function(event) {
                callback(packageData);
              };
              putMetadataRequest.onerror = function(error) {
                errback(error);
              };
            }
          };
          putPackageRequest.onerror = function(error) {
            errback(error);
          };
        }
      }

      /* Check if there's a cached package, and if so whether it's the latest available */
      function checkCachedPackage(db, packageName, callback, errback) {
        var transaction = db.transaction([METADATA_STORE_NAME], IDB_RO);
        var metadata = transaction.objectStore(METADATA_STORE_NAME);
        var getRequest = metadata.get('metadata/' + packageName);
        getRequest.onsuccess = function(event) {
          var result = event.target.result;
          if (!result) {
            return callback(false, null);
          } else {
            return callback(PACKAGE_UUID === result.uuid, result);
          }
        };
        getRequest.onerror = function(error) {
          errback(error);
        };
      }

      function fetchCachedPackage(db, packageName, metadata, callback, errback) {
        var transaction = db.transaction([PACKAGE_STORE_NAME], IDB_RO);
        var packages = transaction.objectStore(PACKAGE_STORE_NAME);

        var chunksDone = 0;
        var totalSize = 0;
        var chunks = new Array(metadata.chunkCount);

        for (var chunkId = 0; chunkId < metadata.chunkCount; chunkId++) {
          var getRequest = packages.get('package/' + packageName + '/' + chunkId);
          getRequest.onsuccess = function(event) {
            // If there's only 1 chunk, there's nothing to concatenate it with so we can just return it now
            if (metadata.chunkCount == 1) {
              callback(event.target.result);
            } else {
              chunksDone++;
              totalSize += event.target.result.byteLength;
              chunks.push(event.target.result);
              if (chunksDone == metadata.chunkCount) {
                if (chunksDone == 1) {
                  callback(event.target.result);
                } else {
                  var tempTyped = new Uint8Array(totalSize);
                  var byteOffset = 0;
                  for (var chunkId in chunks) {
                    var buffer = chunks[chunkId];
                    tempTyped.set(new Uint8Array(buffer), byteOffset);
                    byteOffset += buffer.byteLength;
                    buffer = undefined;
                  }
                  chunks = undefined;
                  callback(tempTyped.buffer);
                  tempTyped = undefined;
                }
              }
            }
          };
          getRequest.onerror = function(error) {
            errback(error);
          };
        }
      }
    
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // Reuse the bytearray from the XHR as the source for file reads.
        DataRequest.prototype.byteArray = byteArray;
  
          var files = metadata.files;
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_build/t/pyapp.data');

    };
    Module['addRunDependency']('datafile_build/t/pyapp.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      function preloadFallback(error) {
        console.error(error);
        console.error('falling back to default preload behavior');
        fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, processPackageData, handleError);
      };

      openDatabase(
        function(db) {
          checkCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME,
            function(useCached, metadata) {
              Module.preloadResults[PACKAGE_NAME] = {fromCache: useCached};
              if (useCached) {
                console.info('loading ' + PACKAGE_NAME + ' from cache');
                fetchCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME, metadata, processPackageData, preloadFallback);
              } else {
                console.info('loading ' + PACKAGE_NAME + ' from remote');
                fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE,
                  function(packageData) {
                    cacheRemotePackage(db, PACKAGE_PATH + PACKAGE_NAME, packageData, {uuid:PACKAGE_UUID}, processPackageData,
                      function(error) {
                        console.error(error);
                        processPackageData(packageData);
                      });
                  }
                , preloadFallback);
              }
            }
          , preloadFallback);
        }
      , preloadFallback);

      if (Module['setStatus']) Module['setStatus']('Downloading...');
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"start": 0, "audio": 0, "end": 181723, "filename": "/presplash.png"}, {"start": 181723, "audio": 0, "end": 188099, "filename": "/main.py"}, {"start": 188099, "audio": 0, "end": 193407, "filename": "/renpy/error.pyo"}, {"start": 193407, "audio": 0, "end": 206379, "filename": "/renpy/memory.pyo"}, {"start": 206379, "audio": 0, "end": 209145, "filename": "/renpy/editor.pyo"}, {"start": 209145, "audio": 0, "end": 220110, "filename": "/renpy/main.pyo"}, {"start": 220110, "audio": 0, "end": 236034, "filename": "/renpy/color.pyo"}, {"start": 236034, "audio": 0, "end": 241899, "filename": "/renpy/easy.pyo"}, {"start": 241899, "audio": 0, "end": 262120, "filename": "/renpy/execution.pyo"}, {"start": 262120, "audio": 0, "end": 273003, "filename": "/renpy/persistent.pyo"}, {"start": 273003, "audio": 0, "end": 311247, "filename": "/renpy/ui.pyo"}, {"start": 311247, "audio": 0, "end": 313751, "filename": "/renpy/curry.pyo"}, {"start": 313751, "audio": 0, "end": 315746, "filename": "/renpy/object.pyo"}, {"start": 315746, "audio": 0, "end": 326704, "filename": "/renpy/defaultstore.pyo"}, {"start": 326704, "audio": 0, "end": 329814, "filename": "/renpy/minstore.pyo"}, {"start": 329814, "audio": 0, "end": 396531, "filename": "/renpy/ast.pyo"}, {"start": 396531, "audio": 0, "end": 396663, "filename": "/renpy/vc_version.pyo"}, {"start": 396663, "audio": 0, "end": 400979, "filename": "/renpy/substitutions.pyo"}, {"start": 400979, "audio": 0, "end": 420382, "filename": "/renpy/pyanalysis.pyo"}, {"start": 420382, "audio": 0, "end": 469464, "filename": "/renpy/python.pyo"}, {"start": 469464, "audio": 0, "end": 502168, "filename": "/renpy/character.pyo"}, {"start": 502168, "audio": 0, "end": 559889, "filename": "/renpy/parser.pyo"}, {"start": 559889, "audio": 0, "end": 573016, "filename": "/renpy/savelocation.pyo"}, {"start": 573016, "audio": 0, "end": 579823, "filename": "/renpy/statements.pyo"}, {"start": 579823, "audio": 0, "end": 581118, "filename": "/renpy/debug.pyo"}, {"start": 581118, "audio": 0, "end": 602459, "filename": "/renpy/lint.pyo"}, {"start": 602459, "audio": 0, "end": 613117, "filename": "/renpy/config.pyo"}, {"start": 613117, "audio": 0, "end": 629822, "filename": "/renpy/loadsave.pyo"}, {"start": 629822, "audio": 0, "end": 634051, "filename": "/renpy/dump.pyo"}, {"start": 634051, "audio": 0, "end": 674302, "filename": "/renpy/atl.pyo"}, {"start": 674302, "audio": 0, "end": 702595, "filename": "/renpy/screenlang.pyo"}, {"start": 702595, "audio": 0, "end": 712535, "filename": "/renpy/scriptedit.pyo"}, {"start": 712535, "audio": 0, "end": 714853, "filename": "/renpy/add_from.pyo"}, {"start": 714853, "audio": 0, "end": 716903, "filename": "/renpy/performance.pyo"}, {"start": 716903, "audio": 0, "end": 723704, "filename": "/renpy/log.pyo"}, {"start": 723704, "audio": 0, "end": 727121, "filename": "/renpy/warp.pyo"}, {"start": 727121, "audio": 0, "end": 744063, "filename": "/renpy/script.pyo"}, {"start": 744063, "audio": 0, "end": 752358, "filename": "/renpy/arguments.pyo"}, {"start": 752358, "audio": 0, "end": 758560, "filename": "/renpy/preferences.pyo"}, {"start": 758560, "audio": 0, "end": 772161, "filename": "/renpy/__init__.pyo"}, {"start": 772161, "audio": 0, "end": 782068, "filename": "/renpy/game.pyo"}, {"start": 782068, "audio": 0, "end": 790630, "filename": "/renpy/bootstrap.pyo"}, {"start": 790630, "audio": 0, "end": 890199, "filename": "/renpy/exports.pyo"}, {"start": 890199, "audio": 0, "end": 920367, "filename": "/renpy/six.pyo"}, {"start": 920367, "audio": 0, "end": 939036, "filename": "/renpy/loader.pyo"}, {"start": 939036, "audio": 0, "end": 939437, "filename": "/renpy/angle/glblacklist.pyo"}, {"start": 939437, "audio": 0, "end": 939612, "filename": "/renpy/angle/__init__.pyo"}, {"start": 939612, "audio": 0, "end": 959092, "filename": "/renpy/audio/audio.pyo"}, {"start": 959092, "audio": 0, "end": 972467, "filename": "/renpy/audio/music.pyo"}, {"start": 972467, "audio": 0, "end": 1002294, "filename": "/renpy/audio/audio.py.orig"}, {"start": 1002294, "audio": 0, "end": 1004134, "filename": "/renpy/audio/sound.pyo"}, {"start": 1004134, "audio": 0, "end": 1008691, "filename": "/renpy/audio/ioshw.pyo"}, {"start": 1008691, "audio": 0, "end": 1013440, "filename": "/renpy/audio/androidhw.pyo"}, {"start": 1013440, "audio": 0, "end": 1013615, "filename": "/renpy/audio/__init__.pyo"}, {"start": 1013615, "audio": 0, "end": 1019302, "filename": "/renpy/text/extras.pyo"}, {"start": 1019302, "audio": 0, "end": 1066442, "filename": "/renpy/text/text.pyo"}, {"start": 1066442, "audio": 0, "end": 1086621, "filename": "/renpy/text/font.pyo"}, {"start": 1086621, "audio": 0, "end": 1086795, "filename": "/renpy/text/__init__.pyo"}, {"start": 1086795, "audio": 0, "end": 1131450, "filename": "/renpy/gl/gldraw.pyx.orig"}, {"start": 1131450, "audio": 0, "end": 1131848, "filename": "/renpy/gl/glblacklist.pyo"}, {"start": 1131848, "audio": 0, "end": 1132020, "filename": "/renpy/gl/__init__.pyo"}, {"start": 1132020, "audio": 0, "end": 1133639, "filename": "/renpy/styledata/styleutil.pyo"}, {"start": 1133639, "audio": 0, "end": 1134739, "filename": "/renpy/styledata/__init__.pyo"}, {"start": 1134739, "audio": 0, "end": 1135139, "filename": "/renpy/gl2/gl2blacklist.pyo"}, {"start": 1135139, "audio": 0, "end": 1135312, "filename": "/renpy/gl2/__init__.pyo"}, {"start": 1135312, "audio": 0, "end": 1143928, "filename": "/renpy/test/testkey.pyo"}, {"start": 1143928, "audio": 0, "end": 1147805, "filename": "/renpy/test/testexecution.pyo"}, {"start": 1147805, "audio": 0, "end": 1151960, "filename": "/renpy/test/testparser.pyo"}, {"start": 1151960, "audio": 0, "end": 1154120, "filename": "/renpy/test/testmouse.pyo"}, {"start": 1154120, "audio": 0, "end": 1157060, "filename": "/renpy/test/testfocus.pyo"}, {"start": 1157060, "audio": 0, "end": 1157234, "filename": "/renpy/test/__init__.pyo"}, {"start": 1157234, "audio": 0, "end": 1173454, "filename": "/renpy/test/testast.pyo"}, {"start": 1173454, "audio": 1, "end": 1178588, "filename": "/renpy/common/_silence.ogg"}, {"start": 1178588, "audio": 0, "end": 1179024, "filename": "/renpy/common/_transparent_tile.png"}, {"start": 1179024, "audio": 0, "end": 1935096, "filename": "/renpy/common/DejaVuSans.ttf"}, {"start": 1935096, "audio": 0, "end": 2172964, "filename": "/renpy/common/OpenDyslexic3-Regular.ttf"}, {"start": 2172964, "audio": 0, "end": 2173657, "filename": "/renpy/common/blindstile.png"}, {"start": 2173657, "audio": 0, "end": 2178038, "filename": "/renpy/common/OpenDyslexic3-Regular.txt"}, {"start": 2178038, "audio": 0, "end": 2182854, "filename": "/renpy/common/DejaVuSans.txt"}, {"start": 2182854, "audio": 0, "end": 2197172, "filename": "/renpy/common/_tv_unsafe.png"}, {"start": 2197172, "audio": 0, "end": 2221847, "filename": "/renpy/common/gamecontrollerdb.txt"}, {"start": 2221847, "audio": 0, "end": 2222453, "filename": "/renpy/common/squarestile.png"}, {"start": 2222453, "audio": 0, "end": 2926581, "filename": "/renpy/common/DejaVuSans-Bold.ttf"}, {"start": 2926581, "audio": 0, "end": 2926765, "filename": "/renpy/common/_theme_tv/tscrollbar_thumb.png"}, {"start": 2926765, "audio": 0, "end": 2927031, "filename": "/renpy/common/_theme_tv/tvscrollbar.png"}, {"start": 2927031, "audio": 0, "end": 2927235, "filename": "/renpy/common/_theme_tv/tvscrollbar_thumb.png"}, {"start": 2927235, "audio": 0, "end": 2927481, "filename": "/renpy/common/_theme_tv/tscrollbar.png"}, {"start": 2927481, "audio": 0, "end": 2927845, "filename": "/renpy/common/_theme_tv/tslider_empty.png"}, {"start": 2927845, "audio": 0, "end": 2928253, "filename": "/renpy/common/_theme_tv/tvslider_empty.png"}, {"start": 2928253, "audio": 0, "end": 2928568, "filename": "/renpy/common/_theme_tv/t_box.png"}, {"start": 2928568, "audio": 0, "end": 2928780, "filename": "/renpy/common/_theme_tv/tvslider_thumb.png"}, {"start": 2928780, "audio": 0, "end": 2928986, "filename": "/renpy/common/_theme_tv/tslider_thumb.png"}, {"start": 2928986, "audio": 0, "end": 2929398, "filename": "/renpy/common/_theme_tv/tvslider_full.png"}, {"start": 2929398, "audio": 0, "end": 2929782, "filename": "/renpy/common/_theme_tv/tslider_full.png"}, {"start": 2929782, "audio": 0, "end": 2930107, "filename": "/renpy/common/_theme_amie2/bar.png"}, {"start": 2930107, "audio": 0, "end": 2930661, "filename": "/renpy/common/_theme_amie2/button.png"}, {"start": 2930661, "audio": 0, "end": 2931019, "filename": "/renpy/common/_theme_amie2/hover_bar.png"}, {"start": 2931019, "audio": 0, "end": 2931553, "filename": "/renpy/common/_theme_amie2/button_hover.png"}, {"start": 2931553, "audio": 0, "end": 2932027, "filename": "/renpy/common/_theme_amie2/hover_frame.png"}, {"start": 2932027, "audio": 0, "end": 2933073, "filename": "/renpy/common/_theme_amie2/frame.png"}, {"start": 2933073, "audio": 0, "end": 2933309, "filename": "/renpy/common/_theme_diamond/dscrollbar.png"}, {"start": 2933309, "audio": 0, "end": 2933633, "filename": "/renpy/common/_theme_diamond/dslider_empty.png"}, {"start": 2933633, "audio": 0, "end": 2933922, "filename": "/renpy/common/_theme_diamond/dslider_thumb.png"}, {"start": 2933922, "audio": 0, "end": 2934327, "filename": "/renpy/common/_theme_diamond/dvslider_full.png"}, {"start": 2934327, "audio": 0, "end": 2934582, "filename": "/renpy/common/_theme_diamond/dvscrollbar_thumb.png"}, {"start": 2934582, "audio": 0, "end": 2934938, "filename": "/renpy/common/_theme_diamond/dslider_full.png"}, {"start": 2934938, "audio": 0, "end": 2935185, "filename": "/renpy/common/_theme_diamond/dvscrollbar.png"}, {"start": 2935185, "audio": 0, "end": 2935544, "filename": "/renpy/common/_theme_diamond/dvslider_empty.png"}, {"start": 2935544, "audio": 0, "end": 2935809, "filename": "/renpy/common/_theme_diamond/dscrollbar_thumb.png"}, {"start": 2935809, "audio": 0, "end": 2936096, "filename": "/renpy/common/_theme_diamond/d_box.png"}, {"start": 2936096, "audio": 0, "end": 2936409, "filename": "/renpy/common/_theme_diamond/dvslider_thumb.png"}, {"start": 2936409, "audio": 0, "end": 3028192, "filename": "/renpy/common/_placeholder/girl.png"}, {"start": 3028192, "audio": 0, "end": 3104072, "filename": "/renpy/common/_placeholder/boy.png"}, {"start": 3104072, "audio": 0, "end": 3104837, "filename": "/renpy/common/_theme_awt/scroller.png"}, {"start": 3104837, "audio": 0, "end": 3105147, "filename": "/renpy/common/_theme_awt/bar_thumb.png"}, {"start": 3105147, "audio": 0, "end": 3108563, "filename": "/renpy/common/_theme_awt/radio_unselected_hover.png"}, {"start": 3108563, "audio": 0, "end": 3111856, "filename": "/renpy/common/_theme_awt/frame_overlay.png"}, {"start": 3111856, "audio": 0, "end": 3112814, "filename": "/renpy/common/_theme_awt/vslider_empty_all.png"}, {"start": 3112814, "audio": 0, "end": 3114341, "filename": "/renpy/common/_theme_awt/scroller_overlay.png"}, {"start": 3114341, "audio": 0, "end": 3118180, "filename": "/renpy/common/_theme_awt/slider_full_overlay.png"}, {"start": 3118180, "audio": 0, "end": 3119857, "filename": "/renpy/common/_theme_awt/vthumb_overlay.png"}, {"start": 3119857, "audio": 0, "end": 3123186, "filename": "/renpy/common/_theme_awt/radio_unselected.png"}, {"start": 3123186, "audio": 0, "end": 3126070, "filename": "/renpy/common/_theme_awt/button.png"}, {"start": 3126070, "audio": 0, "end": 3127235, "filename": "/renpy/common/_theme_awt/v_bar_full_overlay.png"}, {"start": 3127235, "audio": 0, "end": 3130119, "filename": "/renpy/common/_theme_awt/button_selected.png"}, {"start": 3130119, "audio": 0, "end": 3130427, "filename": "/renpy/common/_theme_awt/v_bar_thumb.png"}, {"start": 3130427, "audio": 0, "end": 3133844, "filename": "/renpy/common/_theme_awt/radio_selected_hover.png"}, {"start": 3133844, "audio": 0, "end": 3134563, "filename": "/renpy/common/_theme_awt/bar_thumb_overlay.png"}, {"start": 3134563, "audio": 0, "end": 3135560, "filename": "/renpy/common/_theme_awt/slider_empty_overlay.png"}, {"start": 3135560, "audio": 0, "end": 3137114, "filename": "/renpy/common/_theme_awt/vscroller_overlay.png"}, {"start": 3137114, "audio": 0, "end": 3138289, "filename": "/renpy/common/_theme_awt/bar_full_overlay.png"}, {"start": 3138289, "audio": 0, "end": 3138963, "filename": "/renpy/common/_theme_awt/vscroller.png"}, {"start": 3138963, "audio": 0, "end": 3139281, "filename": "/renpy/common/_theme_awt/slider_full.png"}, {"start": 3139281, "audio": 0, "end": 3140244, "filename": "/renpy/common/_theme_awt/slider_empty_all.png"}, {"start": 3140244, "audio": 0, "end": 3143720, "filename": "/renpy/common/_theme_awt/radio_base_overlay.png"}, {"start": 3143720, "audio": 0, "end": 3144434, "filename": "/renpy/common/_theme_awt/vslider_full.png"}, {"start": 3144434, "audio": 0, "end": 3168258, "filename": "/renpy/common/_theme_awt/Quicksand-Regular.ttf"}, {"start": 3168258, "audio": 0, "end": 3171263, "filename": "/renpy/common/_theme_awt/button_overlay_highlight.png"}, {"start": 3171263, "audio": 0, "end": 3172256, "filename": "/renpy/common/_theme_awt/vslider_full_overlay.png"}, {"start": 3172256, "audio": 0, "end": 3172549, "filename": "/renpy/common/_theme_awt/radio_base.png"}, {"start": 3172549, "audio": 0, "end": 3173002, "filename": "/renpy/common/_theme_awt/vthumb.png"}, {"start": 3173002, "audio": 0, "end": 3173554, "filename": "/renpy/common/_theme_awt/v_bar_thumb_overlay.png"}, {"start": 3173554, "audio": 0, "end": 3176602, "filename": "/renpy/common/_theme_awt/button_selected_overlay.png"}, {"start": 3176602, "audio": 0, "end": 3179723, "filename": "/renpy/common/_theme_awt/frame.png"}, {"start": 3179723, "audio": 0, "end": 3180076, "filename": "/renpy/common/_theme_awt/v_bar_full.png"}, {"start": 3180076, "audio": 0, "end": 3184577, "filename": "/renpy/common/_theme_awt/OFL.txt"}, {"start": 3184577, "audio": 0, "end": 3187564, "filename": "/renpy/common/_theme_awt/button_selected_overlay_highlight.png"}, {"start": 3187564, "audio": 0, "end": 3210972, "filename": "/renpy/common/_theme_awt/Quicksand-Bold.ttf"}, {"start": 3210972, "audio": 0, "end": 3214044, "filename": "/renpy/common/_theme_awt/button_overlay.png"}, {"start": 3214044, "audio": 0, "end": 3214342, "filename": "/renpy/common/_theme_awt/button_disabled_overlay.png"}, {"start": 3214342, "audio": 0, "end": 3214428, "filename": "/renpy/common/_theme_awt/bar_thumb.gif"}, {"start": 3214428, "audio": 0, "end": 3214832, "filename": "/renpy/common/_theme_awt/bar_full.png"}, {"start": 3214832, "audio": 0, "end": 3215365, "filename": "/renpy/common/_theme_regal/revslider_full.png"}, {"start": 3215365, "audio": 0, "end": 3215710, "filename": "/renpy/common/_theme_regal/revscrollbar_thumb.png"}, {"start": 3215710, "audio": 0, "end": 3216102, "filename": "/renpy/common/_theme_regal/re_box.png"}, {"start": 3216102, "audio": 0, "end": 3216586, "filename": "/renpy/common/_theme_regal/reslider_thumb.png"}, {"start": 3216586, "audio": 0, "end": 3217129, "filename": "/renpy/common/_theme_regal/reslider_full.png"}, {"start": 3217129, "audio": 0, "end": 3217531, "filename": "/renpy/common/_theme_regal/revscrollbar.png"}, {"start": 3217531, "audio": 0, "end": 3217893, "filename": "/renpy/common/_theme_regal/rescrollbar_thumb.png"}, {"start": 3217893, "audio": 0, "end": 3218268, "filename": "/renpy/common/_theme_regal/rescrollbar.png"}, {"start": 3218268, "audio": 0, "end": 3218755, "filename": "/renpy/common/_theme_regal/revslider_thumb.png"}, {"start": 3218755, "audio": 0, "end": 3219283, "filename": "/renpy/common/_theme_regal/reslider_empty.png"}, {"start": 3219283, "audio": 0, "end": 3219799, "filename": "/renpy/common/_theme_regal/revslider_empty.png"}, {"start": 3219799, "audio": 0, "end": 3220328, "filename": "/renpy/common/_roundrect/rrvscrollbar_thumb.png"}, {"start": 3220328, "audio": 0, "end": 3221693, "filename": "/renpy/common/_roundrect/rrvslider_full.png"}, {"start": 3221693, "audio": 0, "end": 3222707, "filename": "/renpy/common/_roundrect/rrslider_full.png"}, {"start": 3222707, "audio": 0, "end": 3222986, "filename": "/renpy/common/_roundrect/rr6.png"}, {"start": 3222986, "audio": 0, "end": 3223853, "filename": "/renpy/common/_roundrect/rrslider_empty.png"}, {"start": 3223853, "audio": 0, "end": 3225326, "filename": "/renpy/common/_roundrect/rr12g.png"}, {"start": 3225326, "audio": 0, "end": 3225700, "filename": "/renpy/common/_roundrect/rrvslider_thumb.png"}, {"start": 3225700, "audio": 0, "end": 3226597, "filename": "/renpy/common/_roundrect/rrscrollbar.png"}, {"start": 3226597, "audio": 0, "end": 3227614, "filename": "/renpy/common/_roundrect/rrvscrollbar.png"}, {"start": 3227614, "audio": 0, "end": 3228720, "filename": "/renpy/common/_roundrect/rrvslider_empty.png"}, {"start": 3228720, "audio": 0, "end": 3229111, "filename": "/renpy/common/_roundrect/rrslider_thumb.png"}, {"start": 3229111, "audio": 0, "end": 3229497, "filename": "/renpy/common/_roundrect/rr12.png"}, {"start": 3229497, "audio": 0, "end": 3230809, "filename": "/renpy/common/_roundrect/rr6g.png"}, {"start": 3230809, "audio": 0, "end": 3231285, "filename": "/renpy/common/_roundrect/rrscrollbar_thumb.png"}, {"start": 3231285, "audio": 0, "end": 3232074, "filename": "/renpy/common/_theme_austen/auvscrollbar.png"}, {"start": 3232074, "audio": 0, "end": 3233363, "filename": "/renpy/common/_theme_austen/auvslider_full.png"}, {"start": 3233363, "audio": 0, "end": 3233768, "filename": "/renpy/common/_theme_austen/auscrollbar_thumb.png"}, {"start": 3233768, "audio": 0, "end": 3234391, "filename": "/renpy/common/_theme_austen/auvslider_thumb.png"}, {"start": 3234391, "audio": 0, "end": 3235124, "filename": "/renpy/common/_theme_austen/auscrollbar.png"}, {"start": 3235124, "audio": 0, "end": 3235780, "filename": "/renpy/common/_theme_austen/auslider_thumb.png"}, {"start": 3235780, "audio": 0, "end": 3236997, "filename": "/renpy/common/_theme_austen/auslider_full.png"}, {"start": 3236997, "audio": 0, "end": 3238537, "filename": "/renpy/common/_theme_austen/auvslider_empty.png"}, {"start": 3238537, "audio": 0, "end": 3239491, "filename": "/renpy/common/_theme_austen/au_box.png"}, {"start": 3239491, "audio": 0, "end": 3240915, "filename": "/renpy/common/_theme_austen/auslider_empty.png"}, {"start": 3240915, "audio": 0, "end": 3241324, "filename": "/renpy/common/_theme_austen/auvscrollbar_thumb.png"}, {"start": 3241324, "audio": 0, "end": 3241554, "filename": "/renpy/common/_theme_threeD/thvscrollbar_thumb.png"}, {"start": 3241554, "audio": 0, "end": 3241770, "filename": "/renpy/common/_theme_threeD/thscrollbar_thumb.png"}, {"start": 3241770, "audio": 0, "end": 3242133, "filename": "/renpy/common/_theme_threeD/thslider_thumb.png"}, {"start": 3242133, "audio": 0, "end": 3242369, "filename": "/renpy/common/_theme_threeD/thvslider_thumb.png"}, {"start": 3242369, "audio": 0, "end": 3242632, "filename": "/renpy/common/_theme_threeD/thvscrollbar.png"}, {"start": 3242632, "audio": 0, "end": 3242960, "filename": "/renpy/common/_theme_threeD/thslider_full.png"}, {"start": 3242960, "audio": 0, "end": 3243339, "filename": "/renpy/common/_theme_threeD/thvslider_empty.png"}, {"start": 3243339, "audio": 0, "end": 3243720, "filename": "/renpy/common/_theme_threeD/thslider_empty.png"}, {"start": 3243720, "audio": 0, "end": 3243899, "filename": "/renpy/common/_theme_threeD/th_box.png"}, {"start": 3243899, "audio": 0, "end": 3244146, "filename": "/renpy/common/_theme_threeD/thscrollbar.png"}, {"start": 3244146, "audio": 0, "end": 3244496, "filename": "/renpy/common/_theme_threeD/thvslider_full.png"}, {"start": 3244496, "audio": 0, "end": 3245124, "filename": "/renpy/common/_theme_marker/inkslider_empty.png"}, {"start": 3245124, "audio": 0, "end": 3248736, "filename": "/renpy/common/_theme_marker/inkvslider_full.png"}, {"start": 3248736, "audio": 0, "end": 3251557, "filename": "/renpy/common/_theme_marker/inkvslider_thumb.png"}, {"start": 3251557, "audio": 0, "end": 3252184, "filename": "/renpy/common/_theme_marker/inkvscrollbar.png"}, {"start": 3252184, "audio": 0, "end": 3252322, "filename": "/renpy/common/_theme_marker/inkslider_thumb.png"}, {"start": 3252322, "audio": 0, "end": 3252732, "filename": "/renpy/common/_theme_marker/inkscrollbar_thumb.png"}, {"start": 3252732, "audio": 0, "end": 3253545, "filename": "/renpy/common/_theme_marker/inkslider_full.png"}, {"start": 3253545, "audio": 0, "end": 3255139, "filename": "/renpy/common/_theme_marker/ink_box.png"}, {"start": 3255139, "audio": 0, "end": 3258504, "filename": "/renpy/common/_theme_marker/inkvslider_empty.png"}, {"start": 3258504, "audio": 0, "end": 3258933, "filename": "/renpy/common/_theme_marker/inkvscrollbar_thumb.png"}, {"start": 3258933, "audio": 0, "end": 3259461, "filename": "/renpy/common/_theme_marker/inkscrollbar.png"}, {"start": 3259461, "audio": 0, "end": 3260072, "filename": "/renpy/common/_theme_glow/gvscrollbar.png"}, {"start": 3260072, "audio": 0, "end": 3261152, "filename": "/renpy/common/_theme_glow/gvslider_full.png"}, {"start": 3261152, "audio": 0, "end": 3262014, "filename": "/renpy/common/_theme_glow/g_outline.png"}, {"start": 3262014, "audio": 0, "end": 3262464, "filename": "/renpy/common/_theme_glow/gscrollbar_thumb.png"}, {"start": 3262464, "audio": 0, "end": 3262924, "filename": "/renpy/common/_theme_glow/gvscrollbar_thumb.png"}, {"start": 3262924, "audio": 0, "end": 3263453, "filename": "/renpy/common/_theme_glow/gvslider_thumb.png"}, {"start": 3263453, "audio": 0, "end": 3264518, "filename": "/renpy/common/_theme_glow/gslider_full.png"}, {"start": 3264518, "audio": 0, "end": 3265299, "filename": "/renpy/common/_theme_glow/gslider_empty.png"}, {"start": 3265299, "audio": 0, "end": 3266062, "filename": "/renpy/common/_theme_glow/g_box.png"}, {"start": 3266062, "audio": 0, "end": 3266607, "filename": "/renpy/common/_theme_glow/gslider_thumb.png"}, {"start": 3266607, "audio": 0, "end": 3267131, "filename": "/renpy/common/_theme_glow/gscrollbar.png"}, {"start": 3267131, "audio": 0, "end": 3267947, "filename": "/renpy/common/_theme_glow/gvslider_empty.png"}, {"start": 3267947, "audio": 0, "end": 3270632, "filename": "/renpy/common/_theme_crayon/cry_box.png"}, {"start": 3270632, "audio": 0, "end": 3270846, "filename": "/renpy/common/_theme_crayon/cryscrollbar_thumb.png"}, {"start": 3270846, "audio": 0, "end": 3271073, "filename": "/renpy/common/_theme_crayon/cryvscrollbar_thumb.png"}, {"start": 3271073, "audio": 0, "end": 3271512, "filename": "/renpy/common/_theme_crayon/cryvscrollbar.png"}, {"start": 3271512, "audio": 0, "end": 3273012, "filename": "/renpy/common/_theme_crayon/cryslider_full.png"}, {"start": 3273012, "audio": 0, "end": 3274356, "filename": "/renpy/common/_theme_crayon/rr12g.png"}, {"start": 3274356, "audio": 0, "end": 3275131, "filename": "/renpy/common/_theme_crayon/cryvslider_empty.png"}, {"start": 3275131, "audio": 0, "end": 3275727, "filename": "/renpy/common/_theme_crayon/cryslider_empty.png"}, {"start": 3275727, "audio": 0, "end": 3276100, "filename": "/renpy/common/_theme_crayon/cryscrollbar.png"}, {"start": 3276100, "audio": 0, "end": 3276410, "filename": "/renpy/common/_theme_crayon/cryvslider_thumb.png"}, {"start": 3276410, "audio": 0, "end": 3276699, "filename": "/renpy/common/_theme_crayon/cryslider_thumb.png"}, {"start": 3276699, "audio": 0, "end": 3278378, "filename": "/renpy/common/_theme_crayon/cryvslider_full.png"}, {"start": 3278378, "audio": 0, "end": 3279722, "filename": "/renpy/common/_theme_crayon/cry_box2.png"}, {"start": 3279722, "audio": 0, "end": 3282724, "filename": "/renpy/common/_theme_bordered/brvslider_full.png"}, {"start": 3282724, "audio": 0, "end": 3285717, "filename": "/renpy/common/_theme_bordered/brslider_full.png"}, {"start": 3285717, "audio": 0, "end": 3285983, "filename": "/renpy/common/_theme_bordered/br_box.png"}, {"start": 3285983, "audio": 0, "end": 3288953, "filename": "/renpy/common/_theme_bordered/brvslider_empty.png"}, {"start": 3288953, "audio": 0, "end": 3291871, "filename": "/renpy/common/_theme_bordered/brscrollbar.png"}, {"start": 3291871, "audio": 0, "end": 3294863, "filename": "/renpy/common/_theme_bordered/brslider_empty.png"}, {"start": 3294863, "audio": 0, "end": 3295352, "filename": "/renpy/common/_theme_bordered/brvscrollbar.png"}, {"start": 3295352, "audio": 0, "end": 3298279, "filename": "/renpy/common/_theme_bordered/brvscrollbar_thumb.png"}, {"start": 3298279, "audio": 0, "end": 3301162, "filename": "/renpy/common/_theme_bordered/brscrollbar_thumb.png"}, {"start": 3301162, "audio": 0, "end": 3301475, "filename": "/renpy/common/_theme_bordered/brvslider_thumb.png"}, {"start": 3301475, "audio": 0, "end": 3304423, "filename": "/renpy/common/_theme_bordered/brslider_thumb.png"}, {"start": 3304423, "audio": 0, "end": 3304598, "filename": "/renpy/common/_outline/vbar.png"}, {"start": 3304598, "audio": 0, "end": 3304769, "filename": "/renpy/common/_outline/bar.png"}, {"start": 3304769, "audio": 0, "end": 3305109, "filename": "/renpy/common/_outline/circle.png"}, {"start": 3305109, "audio": 0, "end": 3307237, "filename": "/renpy/translation/merge.pyo"}, {"start": 3307237, "audio": 0, "end": 3309215, "filename": "/renpy/translation/extract.pyo"}, {"start": 3309215, "audio": 0, "end": 3316332, "filename": "/renpy/translation/dialogue.pyo"}, {"start": 3316332, "audio": 0, "end": 3321983, "filename": "/renpy/translation/scanstrings.pyo"}, {"start": 3321983, "audio": 0, "end": 3344298, "filename": "/renpy/translation/__init__.pyo"}, {"start": 3344298, "audio": 0, "end": 3357460, "filename": "/renpy/translation/generation.pyo"}, {"start": 3357460, "audio": 0, "end": 3361670, "filename": "/renpy/sl2/slproperties.pyo"}, {"start": 3361670, "audio": 0, "end": 3372773, "filename": "/renpy/sl2/sldisplayables.pyo"}, {"start": 3372773, "audio": 0, "end": 3416304, "filename": "/renpy/sl2/slast.pyo"}, {"start": 3416304, "audio": 0, "end": 3441519, "filename": "/renpy/sl2/slparser.pyo"}, {"start": 3441519, "audio": 0, "end": 3441692, "filename": "/renpy/sl2/__init__.pyo"}, {"start": 3441692, "audio": 0, "end": 3445789, "filename": "/renpy/display/error.pyo"}, {"start": 3445789, "audio": 0, "end": 3449151, "filename": "/renpy/display/predict.pyo"}, {"start": 3449151, "audio": 0, "end": 3472224, "filename": "/renpy/display/swdraw.pyo"}, {"start": 3472224, "audio": 0, "end": 3512169, "filename": "/renpy/display/im.pyo"}, {"start": 3512169, "audio": 0, "end": 3525669, "filename": "/renpy/display/video.pyo"}, {"start": 3525669, "audio": 0, "end": 3554110, "filename": "/renpy/display/screen.pyo"}, {"start": 3554110, "audio": 0, "end": 3570355, "filename": "/renpy/display/anim.pyo"}, {"start": 3570355, "audio": 0, "end": 3572888, "filename": "/renpy/display/presplash.pyo"}, {"start": 3572888, "audio": 0, "end": 3578091, "filename": "/renpy/display/pgrender.pyo"}, {"start": 3578091, "audio": 0, "end": 3589687, "filename": "/renpy/display/focus.pyo"}, {"start": 3589687, "audio": 0, "end": 3595467, "filename": "/renpy/display/imagemap.pyo"}, {"start": 3595467, "audio": 0, "end": 3626026, "filename": "/renpy/display/transition.pyo"}, {"start": 3626026, "audio": 0, "end": 3672430, "filename": "/renpy/display/layout.pyo"}, {"start": 3672430, "audio": 0, "end": 3697115, "filename": "/renpy/display/transform.pyo"}, {"start": 3697115, "audio": 0, "end": 3712961, "filename": "/renpy/display/particle.pyo"}, {"start": 3712961, "audio": 0, "end": 3720467, "filename": "/renpy/display/module.pyo"}, {"start": 3720467, "audio": 0, "end": 3732901, "filename": "/renpy/display/viewport.pyo"}, {"start": 3732901, "audio": 0, "end": 3756629, "filename": "/renpy/display/dragdrop.pyo"}, {"start": 3756629, "audio": 0, "end": 3757691, "filename": "/renpy/display/joystick.pyo"}, {"start": 3757691, "audio": 0, "end": 3761242, "filename": "/renpy/display/emulator.pyo"}, {"start": 3761242, "audio": 0, "end": 3773970, "filename": "/renpy/display/imagelike.pyo"}, {"start": 3773970, "audio": 0, "end": 3776544, "filename": "/renpy/display/scale.pyo"}, {"start": 3776544, "audio": 0, "end": 3777348, "filename": "/renpy/display/__init__.pyo"}, {"start": 3777348, "audio": 0, "end": 3780519, "filename": "/renpy/display/gesture.pyo"}, {"start": 3780519, "audio": 0, "end": 3784959, "filename": "/renpy/display/controller.pyo"}, {"start": 3784959, "audio": 0, "end": 3785343, "filename": "/renpy/display/minigame.pyo"}, {"start": 3785343, "audio": 0, "end": 3789110, "filename": "/renpy/display/tts.pyo"}, {"start": 3789110, "audio": 0, "end": 3807855, "filename": "/renpy/display/motion.pyo"}, {"start": 3807855, "audio": 0, "end": 3824803, "filename": "/renpy/display/movetransition.pyo"}, {"start": 3824803, "audio": 0, "end": 3888852, "filename": "/renpy/display/core.pyo"}, {"start": 3888852, "audio": 0, "end": 3914270, "filename": "/renpy/display/image.pyo"}, {"start": 3914270, "audio": 0, "end": 3960826, "filename": "/renpy/display/behavior.pyo"}, {"start": 3960826, "audio": 0, "end": 3961161, "filename": "/lib/python2.7/threading.pyo"}, {"start": 3961161, "audio": 0, "end": 3961301, "filename": "/lib/python2.7/subprocess.pyo"}, {"start": 3961301, "audio": 0, "end": 3965251, "filename": "/lib/python2.7/site-packages/pygame_sdl2/compat.pyo"}, {"start": 3965251, "audio": 0, "end": 3998764, "filename": "/lib/python2.7/site-packages/pygame_sdl2/sprite.pyo"}, {"start": 3998764, "audio": 0, "end": 3999364, "filename": "/lib/python2.7/site-packages/pygame_sdl2/version.pyo"}, {"start": 3999364, "audio": 0, "end": 3999605, "filename": "/lib/python2.7/site-packages/pygame_sdl2/time.pyo"}, {"start": 3999605, "audio": 0, "end": 4020503, "filename": "/lib/python2.7/site-packages/pygame_sdl2/sysfont.pyo"}, {"start": 4020503, "audio": 0, "end": 4026085, "filename": "/lib/python2.7/site-packages/pygame_sdl2/__init__.pyo"}, {"start": 4026085, "audio": 0, "end": 4032676, "filename": "/lib/python2.7/site-packages/pygame_sdl2/threads/Py25Queue.pyo"}, {"start": 4032676, "audio": 0, "end": 4039929, "filename": "/lib/python2.7/site-packages/pygame_sdl2/threads/__init__.pyo"}], "remote_package_size": 4039929, "package_uuid": "b2c78c4d-5c8e-44f8-abc7-0097bb942c1c"});

})();
