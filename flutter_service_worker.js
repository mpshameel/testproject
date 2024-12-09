'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMIT_EDITMSG": "64d42024f1a77ee5e61e4096bdebac78",
".git/config": "696d5d5f2d36e515589a8546de158ef4",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/HEAD": "fb8fe0f25dc63e6fdfac4768197322c9",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "bb50fe1892c24742848b217b263b7389",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "20a3d22442df4cdbde247c8f4029300d",
".git/logs/refs/heads/gh-pages2": "f86717bff4405a95d2e4e2da3adb2361",
".git/logs/refs/remotes/origin/gh-pages": "dcdba877ff449cf84bda2b3b3aff0462",
".git/logs/refs/remotes/origin/gh-pages2": "dd221c67ae2237e342725c9823cbe3e8",
".git/objects/02/7c6432e988efdbaa3387eadccc219291634ddf": "b97f26d8009ad82514fbf7b23ce4a1e6",
".git/objects/03/eaddffb9c0e55fb7b5f9b378d9134d8d75dd37": "87850ce0a3dd72f458581004b58ac0d6",
".git/objects/08/32d0db2def1613c1c45aa4fe9156a1c6b7d589": "e05df183e5eeaddf39672a2516f9c41d",
".git/objects/08/ae9c909892f3e4e920bc71d00474743ad34ec0": "9df1fd0f3a4f0ce9072e350a929d4630",
".git/objects/09/4646a99623c4ee5fbf464b228109adda2ca9d6": "e5f1da5b3d85bef5bfa1b8c5ee62b401",
".git/objects/0c/9517f1cc48d6a1998a1ce5d4a8b901c4dc7b68": "2153fc93e0f1a1055ab713d3a3aced90",
".git/objects/10/97fe6b446583e263f5784661304a9f2d642014": "3fc9029add5472285c20905a0d89a162",
".git/objects/18/bb7a1f100d0b47aa59cd05dff802cd38aa4161": "70cd6e6428d2fd4b4cb726100e88d201",
".git/objects/19/f66bf187f25df8ca4b2c19dbd6fc2881800cbf": "5862191db6af83ee621c4c4a192011ac",
".git/objects/1f/45b5bcaac804825befd9117111e700e8fcb782": "7a9d811fd6ce7c7455466153561fb479",
".git/objects/25/8b3eee70f98b2ece403869d9fe41ff8d32b7e1": "05e38b9242f2ece7b4208c191bc7b258",
".git/objects/29/004d37769d124748d8224786b665ac8a8583e2": "b4f16763e3f94629654c24ac1170267a",
".git/objects/32/aa3cae58a7432051fc105cc91fca4d95d1d011": "4f8558ca16d04c4f28116d3292ae263d",
".git/objects/3a/7525f2996a1138fe67d2a0904bf5d214bfd22c": "ab6f2f6356cba61e57d5c10c2e18739d",
".git/objects/40/0d5b186c9951e294699e64671b9dde52c6f6a0": "f6bd3c7f9b239e8898bace6f9a7446b9",
".git/objects/41/56cdf4c52e87887e617e38cf1b47a473d67fd7": "a8a9ba93a29d2e4c7b0258eb54fb9ba5",
".git/objects/44/a8b8e41b111fcf913a963e318b98e7f6976886": "5014fdb68f6b941b7c134a717a3a2bc6",
".git/objects/45/8e609f8fe34e10a3fdc7fdcfd03cceb4f558eb": "a1f6edaf56157b3ffd1c286db1b66f1e",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/51/634ff74bd56e1e788864e2de163d831543c47f": "9bcf27df0b1aa3e91db60b4887758c3e",
".git/objects/5a/6b6dc6a2e5782cb80f9896f2b7babb4855a026": "85d5b31bdc37f4a905eff1af22889eb8",
".git/objects/5f/01fceb3e199ce0740b129439590625a42b5265": "e191ed63af038ecfa1b9ee94dd7db086",
".git/objects/5f/fd9a2f008d3b0030cbac36bc6d8f254a707f18": "819ac7ddc7d0a128e28d8ebfee1061d2",
".git/objects/63/05e173adb7f46362dcc5090f43d5edbfa3ad94": "3bd9d1bfb07b9edefaa1e707fd4bf2e6",
".git/objects/63/362b4c0ea875e91b3d0eeb47d3f4785766caed": "0dd366cfe039513572ff1503a5b4be1b",
".git/objects/63/531f4aed4da6f17251f9691da620ef7f2467ff": "e951731e2fbb2b8e2999f6d44601584b",
".git/objects/69/dacb2536de571f36202e824c30158b48693af8": "2788cebf61a9b9e91c1b8741ce7f934c",
".git/objects/69/dd618354fa4dade8a26e0fd18f5e87dd079236": "8cc17911af57a5f6dc0b9ee255bb1a93",
".git/objects/6b/e909fbf40b23748412f0ea89bf0fae827ed976": "5f118419157d9534688915220cc803f7",
".git/objects/7b/5145f959034cdc264b6ca104035527c05b1334": "15ef961f9c189c20b760fa413f914ae4",
".git/objects/82/13c8465916c35274646b4b29fd36404de998c2": "7289d6ab96227e6943ab44a48cd97af5",
".git/objects/84/0516208d35dcb4298847ab835e2ef84ada92fa": "36a4a870d8d9c1c623d8e1be329049da",
".git/objects/84/8c73bfb62c045f966db260fbaef2f7647104c6": "4d8366a2c3e26beae2c08860640c878a",
".git/objects/85/6a39233232244ba2497a38bdd13b2f0db12c82": "eef4643a9711cce94f555ae60fecd388",
".git/objects/86/4b1d9d1f85e5fdc929b46788f460e0ede13e1c": "fef92233e1786824af79657afdadf510",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/8d/ab712a34c95001854fbbaa253309a8c533f152": "8465be3aa7fb738cbbf78e5078fee962",
".git/objects/8f/e7af5a3e840b75b70e59c3ffda1b58e84a5a1c": "e3695ae5742d7e56a9c696f82745288d",
".git/objects/90/bcfcf0a77ab618a826db0fd8b0942963b653af": "fc109675cdf1233dd6599a4c3c0a7a69",
".git/objects/95/8f9467ee452391e8685d4f1f8475754fda2b33": "000a19808a0ea37be395bcb4c391a515",
".git/objects/98/57c9b3b0448c92818efc5fda0f206b21914168": "ecbde07c564dabbec0f249821051b8af",
".git/objects/9e/b8d4aab23ee3d0394418efd01704aba69706a2": "9fa569bb506ec66695d7e716ab36693d",
".git/objects/9f/b531e53b0a14ca05e9679c6692ae95c9eab10d": "8704df88ebbb6044d8d4087a2c59803e",
".git/objects/ad/2fa653ac113af310d28573012e8160a3bb7f74": "fe242ee44dfa4cc61616451eccf75035",
".git/objects/b1/5ad935a6a00c2433c7fadad53602c1d0324365": "8f96f41fe1f2721c9e97d75caa004410",
".git/objects/b6/9657d63b5b7c369801bd13648b4cb7bce3df69": "e0f24a682cff9ec404c35afae30f5c7a",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/ba/5317db6066f0f7cfe94eec93dc654820ce848c": "9b7629bf1180798cf66df4142eb19a4e",
".git/objects/ba/9fee2786bf7e69088d9e43a70886ad6dc13aeb": "6a42f71b75011ed59b6f34c9a0b0ea8c",
".git/objects/c2/074479df960b127d84cc8798afd5ebc30423e8": "d00af006bbe73277740744f339bfbc31",
".git/objects/c3/ed691b044b11a1c7ee16df6d584024039c8d56": "7596de85f733c6f454fc1f4b72971358",
".git/objects/c6/c39016d1ecd2d1bb1abebe94c2c3a123ab3189": "82ffb714504c1d9712a1b813a9609952",
".git/objects/ce/65ccdc95056f4282fc20c2fae943036dbb9a24": "a1db4f8a393eb505e41d72b675ce7e3c",
".git/objects/d0/1d1f23f8492ce78b7b9cca7548c747e7697e02": "3313ac83097ab02ab8a599b4f3cc7870",
".git/objects/d0/23371979cf1e985205df19078051c10de0a82d": "700b71074bad7afee32068791dec7442",
".git/objects/d2/1af7bfa467fa0d567a359c0717189fcc3bc880": "b8c80fb91a3e14dd03737374d2f978e7",
".git/objects/d3/57a1da23eb317bbe67582a2ea6248aae19e61b": "69fd57a76289aff954c5fc81a5331472",
".git/objects/d3/d35d7ee6ad51268044a22e047c50f46055b8d6": "0a0f0a53830e18e888aae8bd8346e895",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/d5/4d61604166982fa5eb6e513a08d00e93f61113": "2c06ff14ee3e13b58402894bccb1bdae",
".git/objects/d5/bb50b3c3bc534b51ba035a5e8495ba7af5025b": "81d30e6f235d2cd1960b1a0d917b3043",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/da/fd65422747502c19b5c74b4230282644d2169c": "d8a62caf99a372ff6c7692e143787ce3",
".git/objects/de/e63fdf73932fcabffe1b91f3f641c50ebb223d": "a883159f80500444a52bc643c024aadf",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f2/4a25f044cbead6be0a56ace99e411b207f5b18": "c8da0975109f8ddf6d4b3b4f0a866325",
".git/objects/f7/871a3bb6631dac8326539dbdc417e1a728c888": "cb9f684b3ef6b6ad65650b6317d8d770",
".git/objects/f9/8437ca72cc94ff6893852d63043cf1cfe9b2a8": "3a292993d039f11d8f06ad37572bdb88",
".git/objects/fb/333033bd6ea732186fd3d9431eeb7c64e455ec": "f76880a23b1ab0424924856464cd8e23",
".git/refs/heads/gh-pages2": "decf2229aca08eabaef7ff0414815733",
".git/refs/remotes/origin/gh-pages": "8ab130945acc2fcd3f15a5eb0a2a632b",
".git/refs/remotes/origin/gh-pages2": "decf2229aca08eabaef7ff0414815733",
".github/workflows/deploy.yml": "691b0be59945287d8698d47a59899664",
"assets/AssetManifest.bin": "693635b5258fe5f1cda720cf224f158c",
"assets/AssetManifest.bin.json": "69a99f98c8b1fb8111c5fb961769fcd8",
"assets/AssetManifest.json": "2efbb41d7877d10aac9d091f58ccd7b9",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "52afe9838475864a0b575996cfdc1844",
"assets/NOTICES": "7a1f472d38cdb4e55ea00cafcf535db9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "065eaf4ce7c343e6f9f964a36b0ac7b3",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "c0c8f00976ca3802d2989212fa2aafc9",
"/": "c0c8f00976ca3802d2989212fa2aafc9",
"main.dart.js": "7b3a4cd22f003af0b8ec2b41f074b358",
"manifest.json": "df0ef18e17389f3217e91ff0d0c60e14",
"version.json": "b4e2b7da0afde38b4672740a58d6ae1b"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
