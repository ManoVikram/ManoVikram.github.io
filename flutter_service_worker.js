'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "75e83158e14318f507c29af2d507cd1d",
"assets/assets/fonts/Noto%2520Color%2520Emoji/NotoColorEmoji-Regular.ttf": "ed84f46d3d5564a08541cd64bddd495c",
"assets/assets/icons/GitHub%2520Logo.png": "3adab44dcbfa4c9a35fe52e43f7068dd",
"assets/assets/icons/GMail%2520Logo.png": "2a9f41eda7b0bdd5516c2f8e98b719be",
"assets/assets/icons/Instagram%2520Logo.png": "3913090a2b2db75f30b5ca948dbfcaaf",
"assets/assets/icons/LinkedIn%2520Logo.png": "367dec0acbdd8710f68904d4e9c0f05b",
"assets/assets/icons/Twitter%2520Logo.png": "46483b57dd8a6a3de500831f5df88fe0",
"assets/assets/icons/YouTube%2520Logo.png": "65e01fb90b63b789520c59328871423b",
"assets/assets/images/DP_WithCircleBackground.png": "42a86ffb489920bfe9a257a97b6a5bc2",
"assets/assets/images/DP_WithoutBackground%2520(1).png": "84f9bffc3e5ae69eb964342115c83a21",
"assets/assets/images/DP_WithoutBackground.png": "185f1525fa826257c95cc136221535a3",
"assets/assets/images/projects/DopeNews.png": "429b0bf2d7202538db223e5235cc2a30",
"assets/assets/images/projects/HarrySay.png": "cf3b6364a31de540d1836e85a95b0195",
"assets/assets/images/projects/InfomataApp.png": "5bee58aaf0f642dfeeaf7dfb30433ca8",
"assets/assets/images/projects/JobPortalApp.png": "b32884859210d38871e14efd0efa6fc2",
"assets/assets/images/projects/MusikRadio.png": "0f5dd9e55e90f3fc2321852e0372ece5",
"assets/assets/images/projects/PingPongGame%2520(1).png": "22c9638efb82b9a4c223a23c143dbc85",
"assets/assets/images/projects/PingPongGame.png": "97ec07ea00e47de46a521a5f352d555d",
"assets/assets/images/projects/PomodoroTimer.png": "6d5921b813dcebdafda074789dbc7ea8",
"assets/assets/images/projects/SquidGameShop.png": "65355c59b01a472f0483dbc2eb61627a",
"assets/assets/images/projects/TheVoltzWeatherApp.png": "5e4996d220c062bedc41a9f7cf8da1b8",
"assets/assets/images/projects/YouTubeDownloader.png": "3e9f3f6a7059ed99ca5fcea39179ca7e",
"assets/FontManifest.json": "b2820c707cfe3d2035fc2896058e42af",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "23e48a9593c4a6e48d8b87ae49d50a43",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "4e20cb87b0d43808c49449ffd69b1a74",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "1f7cb220b3f5309130bd6d9ad87e0fc0",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "26f5af2d93473531f82ef5060f9c6d45",
"assets/shaders/ink_sparkle.frag": "dc138572b70113f08e84d16dcab11557",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.ico": "bfe09ae9e242f8011b81d381ee810e69",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "668e3cc4805d64f4039fee9264b25046",
"icons/Icon-512.png": "5a13af1ab85e1cfb7260fcf9b451fbe4",
"icons/Icon-maskable-192.png": "668e3cc4805d64f4039fee9264b25046",
"icons/Icon-maskable-512.png": "5a13af1ab85e1cfb7260fcf9b451fbe4",
"index.html": "e3c096da3f472933e0bc5ad47ed8da37",
"/": "e3c096da3f472933e0bc5ad47ed8da37",
"main.dart.js": "69e49c786ec2988637614266e07e689b",
"manifest.json": "edcf9db2a6384107e5472ff1be819d56",
"version.json": "1b0b40b903a22dd4ab44bc49fdb164bf"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
