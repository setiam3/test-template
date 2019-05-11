angular.module("test_templates", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ngMap","test_templates.controllers", "test_templates.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Test Templates" ;
		$rootScope.appLogo = "data/images/header/logo.png" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;

		$rootScope.liveStatus = "pause" ;
		$ionicPlatform.ready(function(){
			$rootScope.liveStatus = "run" ;
		});
		$ionicPlatform.on("pause",function(){
			$rootScope.liveStatus = "pause" ;
		});
		$ionicPlatform.on("resume",function(){
			$rootScope.liveStatus = "run" ;
		});


		$rootScope.hide_menu_template_listing = false ;
		$rootScope.hide_menu_avatar = false ;
		$rootScope.hide_menu_gallery = false ;
		$rootScope.hide_menu_one_icon = false ;
		$rootScope.hide_menu_two_icon = false ;
		$rootScope.hide_menu_thumbnail1 = false ;
		$rootScope.hide_menu_slidebox = false ;
		$rootScope.hide_menu_button = false ;
		$rootScope.hide_menu_new_templates = false ;
		$rootScope.hide_menu_homepage = false ;
		$rootScope.hide_menu_thumbnail2 = false ;
		$rootScope.hide_menu_thumbnail3 = false ;
		$rootScope.hide_menu_slidebox_media = false ;
		$rootScope.hide_menu_card_showcase = false ;
		$rootScope.hide_menu_tables = false ;
		$rootScope.hide_menu_gmap = false ;
		$rootScope.hide_menu_faqs = false ;
		$rootScope.hide_menu_dictionary = false ;


		$ionicPlatform.ready(function() {

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "test_templates",
				storeName : "test_templates",
				description : "The offline datastore for Test Templates app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}


		});
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("phpTime", function(){
		return function (input) {
			var timeStamp = parseInt(input) * 1000;
			return timeStamp ;
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
	$translateProvider.useSanitizeValueStrategy("escapeParameters");
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("test_templates",{
		url: "/test_templates",
			abstract: true,
			templateUrl: "templates/test_templates-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("test_templates.about_us", {
		url: "/about_us",
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.avatar", {
		url: "/avatar",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-avatar.html",
						controller: "avatarCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.avatar_singles", {
		url: "/avatar_singles/:ID",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-avatar_singles.html",
						controller: "avatar_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.button", {
		url: "/button",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-button.html",
						controller: "buttonCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.button_singles", {
		url: "/button_singles/:ID",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-button_singles.html",
						controller: "button_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.card_showcase", {
		url: "/card_showcase",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-card_showcase.html",
						controller: "card_showcaseCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.dashboard", {
		url: "/dashboard",
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.dictionary", {
		url: "/dictionary",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-dictionary.html",
						controller: "dictionaryCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.faqs", {
		url: "/faqs",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.galerie_singles", {
		url: "/galerie_singles/:id",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-galerie_singles.html",
						controller: "galerie_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.gallery", {
		url: "/gallery",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-gallery.html",
						controller: "galleryCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.gmap", {
		url: "/gmap",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-gmap.html",
						controller: "gmapCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.homepage", {
		url: "/homepage",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-homepage.html",
						controller: "homepageCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.one_icon", {
		url: "/one_icon",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-one_icon.html",
						controller: "one_iconCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.one_icon_singles", {
		url: "/one_icon_singles/:ID",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-one_icon_singles.html",
						controller: "one_icon_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.showcase_singles", {
		url: "/showcase_singles/:id",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-showcase_singles.html",
						controller: "showcase_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.slidebox", {
		url: "/slidebox",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-slidebox.html",
						controller: "slideboxCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.slidebox_media", {
		url: "/slidebox_media",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-slidebox_media.html",
						controller: "slidebox_mediaCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.slidebox_singles", {
		url: "/slidebox_singles/:ID",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-slidebox_singles.html",
						controller: "slidebox_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.tables", {
		url: "/tables",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-tables.html",
						controller: "tablesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.thumbnail1", {
		url: "/thumbnail1",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-thumbnail1.html",
						controller: "thumbnail1Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.thumbnail1_singles", {
		url: "/thumbnail1_singles/:id",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-thumbnail1_singles.html",
						controller: "thumbnail1_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.thumbnail2", {
		url: "/thumbnail2",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-thumbnail2.html",
						controller: "thumbnail2Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.thumbnail2_singles", {
		url: "/thumbnail2_singles/:id",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-thumbnail2_singles.html",
						controller: "thumbnail2_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.thumbnail3", {
		url: "/thumbnail3",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-thumbnail3.html",
						controller: "thumbnail3Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.thumbnail3_singles", {
		url: "/thumbnail3_singles/:id",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-thumbnail3_singles.html",
						controller: "thumbnail3_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.two_icon", {
		url: "/two_icon",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-two_icon.html",
						controller: "two_iconCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("test_templates.two_icon_singles", {
		url: "/two_icon_singles/:ID",
		cache:false,
		views: {
			"test_templates-side_menus" : {
						templateUrl:"templates/test_templates-two_icon_singles.html",
						controller: "two_icon_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/test_templates/dashboard");
});
