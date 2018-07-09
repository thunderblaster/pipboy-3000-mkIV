Vue.component("invstats", {
	props: ["item"],
	template: `<table><tr v-for="property in item.properties"><td class="table-key">{{property.name}}</td>
	<td class="table-value">{{property.value}}</td></tr></table>`,
});

Vue.component("mapel", {
	props: ["mapNodes", "waypoints"],
	template: `<canvas id="map-canvas" width="600px" height="400px"></canvas>`,
	created: function() {
		if ("geolocation" in navigator) {
			/* geolocation is available */
			console.log("geolocation available!");
			navigator.geolocation.getCurrentPosition(function(position) {
				console.log(position.coords.latitude, position.coords.longitude);
				let southBound = (position.coords.latitude - 0.0025).toFixed(4);
				app.minLat = southBound;
				let westBound = (position.coords.longitude - 0.0035).toFixed(4);
				app.maxLon = westBound;
				let northBound = (position.coords.latitude + 0.0025).toFixed(4);
				app.maxLat = northBound;
				let eastBound = (position.coords.longitude + 0.0035).toFixed(4);
				app.minLon = eastBound;
				$.get("https://www.openstreetmap.org/api/0.6/map?bbox=" + westBound + "," + southBound + "," + eastBound + "," + northBound, function(data) {
					//nodes
					let nodes = $(data).find("node").filter(function() {
						return $(this).find("tag[k='name']").length && $(this).find("tag[k='amenity']").length;
					});
					var cleanedNodes = [];
					$(nodes).each(function() {
						let cleanedNode = {};
						cleanedNode.name = $(this).find("tag[k='name']").attr('v');
						cleanedNode.type = $(this).find("tag[k='amenity']").attr('v');
						cleanedNode.lat = $(this).attr('lat');
						cleanedNode.lon = $(this).attr('lon');
						cleanedNode.ref = $(this).attr('id');
						cleanedNodes.push(cleanedNode);
					});
					app.mapNodes = cleanedNodes;
					//waypoints
					let waypoints = $(data).find("way").filter(function() {
						return $(this).find("tag[k='name']").length;
					});
					var cleanedWaypoints = [];
					$(waypoints).each(function() {
						let cleanedWaypoint = {};
						//console.log(this);
						cleanedWaypoint.name = $(this).find("tag[k='name']").attr('v');
						cleanedWaypoint.points = [];
						$(this).children("nd").each(function() {
							thisPoint = {};
							thisPoint.ref = $(this).attr('ref');
							let matchingPoints = $(data).find("node").filter(function() {
								return $(this).attr("id")==thisPoint.ref;
							});
							thisPoint.lat = $(matchingPoints[0]).attr('lat');
							thisPoint.lon = $(matchingPoints[0]).attr('lon');
							cleanedWaypoint.points.push(thisPoint);
						});
						cleanedWaypoints.push(cleanedWaypoint);
					});
					app.waypoints = cleanedWaypoints;
					app.drawMap();
				});
			  },
			function(error) {
				/* error using geolocation */
				if (error.code == error.PERMISSION_DENIED) {
					console.log("geolocation permission denied, using default map data");
				} else {
					console.log("geolocation error occurred, using default map data");
				}
				app.drawMap();
			});
		} else {
			/* geolocation IS NOT available */
			console.log("geolocation not available, using default map data");
			app.drawMap();
		}
	},
})

var app = new Vue({
	el: "#vue-app",
	data: {
		activeMenu: 0,
		activeSubMenu: 0,
		activeListItem: 0,
		menus: [
			{
				name: "Stat",
				submenus: [
					{
						name: "Status",
						type: "Status",
					},
					{
						name: "Special",
						type: "List",
						items: [
							{
								name: "Strength",
								value: "7",
								image: "animations/special/Strength.gif",
								text: "Strength is a measure of your raw physical power. It affects how much you can carry, and the damage of all melee attacks.",
							},
							{
								name: "Perception",
								value: "7",
								image: "animations/special/Perception.gif",
								text: "Perception is your environmental awareness and \"sixth sense,\" and affects weapon accuracy in V.A.T.S.",

							},
							{
								name: "Endurance",
								value: "7",
								image: "animations/special/Endurance.gif",
								text: "Endurance is a measure of your overall physical fitness. It affects your total health and the Action Point drain from sprinting.",
							},
							{
								name: "Charisma",
								value: "7",
								image: "animations/special/Charisma.gif",
								text: "Charisma is your ability to charm and convince others. It affects your success to persuade in dialogue and prices when you barter.",
							},
							{
								name: "Intelligence",
								value: "7",
								image: "animations/special/Intelligence.gif",
								text: "Intelligence is a measure of your overall mental acuity, and affects the number of Experience Points earned.",
							},
							{
								name: "Agility",
								value: "7",
								image: "animations/special/Agility.gif",
								text: "Agility is a measure of your overall finesse and reflexes. It affects the number of Action Points in V.A.T.S. and your ability to sneak.",
							},
							{
								name: "Luck",
								value: "7",
								image: "animations/special/Luck.gif",
								text: "Luck is a measure of your general good fortune, and affects the recharge rate of Critical Hits.",
							},
						]
					},
					{
						name: "Perks",
						type: "List",
						items: [
							{
								name: "Iron Fist",
								quantity: 2,
								image: "animations/perks/Iron-Fist.gif",
								text: "	Punching attacks now do 40% more damage and can disarm your opponent.",
							},
							{
								name: "Locksmith",
								image: "animations/perks/Locksmith.gif",
								text: "Your nimble fingers allow you to pick advanced locks.",
							},
						]
					},
				],
				submenuClasses: "submenu submenu-scoot-left",
				footerSectionOne: "HP 100/100",
				footerSectionTwo: "Level 1",
				footerSectionThree: "AP 50/50"
			},
			{
				name: "Inv",
				submenus: [
					{
						name: "Weapons",
						type: "List",
						items: [
							{
								name: "Sawed-off Double Barrel Shotgun",
								equipped: true,
								favorite: true,
								properties: [
									{
										name: "Damage",
										value: 50,
									},
									{
										name: "Value",
										value: 100
									},
									{
										name: "Weight",
										value: 4
									},
								],
							},
							{
								name: "10mm Pistol",
								quantity: 2,
								properties: [
									{
										name: "Damage",
										value: 18,
									},
									{
										name: "Value",
										value: 50
									},
									{
										name: "Weight",
										value: 1
									},
								],
							},
						]
					},
					{
						name: "Apparel",
						type: "List",
						items: [
							{
								name: "T-Shirt",
								equipped: true,
								properties: [
									{
										name: "Value",
										value: 5
									},
									{
										name: "Weight",
										value: 0.1
									},
								],
							},
							{
								name: "Jeans",
								equipped: true,
								properties: [
									{
										name: "Value",
										value: 5
									},
									{
										name: "Weight",
										value: 0.1
									},
								],
							},
						]
					},
					{
						name: "Aid",
						type: "List",
						items: [
							{
								name: "Band-Aids",
								properties: [
									{
										name: "Health",
										value: 10
									},
									{
										name: "Value",
										value: 5
									},
									{
										name: "Weight",
										value: 0.1
									},
								],
							},
						]
					},
					{
						name: "Misc",
						type: "List",
						items: [
							{
								name: "Swiss Army Knife",
								properties: [
									{
										name: "Value",
										value: 1000
									},
									{
										name: "Weight",
										value: 0.5
									},
								],
							},
						]
					},
					{
						name: "Junk",
						type: "List",
						items: [
							{
								name: "iPhone",
								equipped: true,
								properties: [
									{
										name: "Value",
										value: 1
									},
									{
										name: "Weight",
										value: 1
									},
								],
							},
						]
					},
					{
						name: "Mods",
						type: "List",
						items: [
							{
								name: "Silencer",
								properties: [
									{
										name: "Value",
										value: 200
									},
									{
										name: "Weight",
										value: 1
									},
								],
							},
						]
					},
					{
						name: "Ammo",
						type: "List",
						items: [
							{
								name: "12ga Shell",
								equipped: true,
								quantity: 2,
								properties: [
									{
										name: "Value",
										value: 1
									},
									{
										name: "Weight",
										value: 0
									},
								],
							},
							{
								name: "10mm Round",
								quantity: 15,
								properties: [
									{
										name: "Value",
										value: 1
									},
									{
										name: "Weight",
										value: 0
									},
								],
							}
						]
					},
				],
				submenuClasses: "submenu",
				footerSectionOne: "Weight: 5/50", //this should be a computed value that updates based on items in inventory
				footerSectionTwo: "126",
			},
			{
				name: "Data",
				submenus: [
					{
						name: "Quests",
						type: "List",
						items: [
							{
								name: "War Never Changes",
								image: "animations/quests/War-Never-Changes.gif",
								text: "Enter the wasteland",
							}
						]
					},
					{
						name: "Workshops",
					},
					{
						name: "Stats",
						type: "List",
						items: [
							{
								name: "General",
							},
							{
								name: "Quest",
							},
							{
								name: "Combat",
							},
							{
								name: "Crafting",
							},
							{
								name: "Crime",
							},
						]
					},
				],
				submenuClasses: "submenu submenu-scoot-right",
			},
			{
				name: "Map",
				submenus: [],
				footerSectionThree: "Commonwealth",
			},
			{
				name: "Radio",
				submenus: [],
				footerSectionTwo: "this is the Radio menu",
			},
		],
		mapNodes: defaultMapNodes,
		waypoints: defaultWaypoints,
		minLon: defaultMinLon,
		minLat: defaultMinLat,
		maxLon: defaultMaxLon,
		maxLat: defaultMaxLat,
		mapIcons: {
			"pub": "images/map-icons/vault.png",
			"nightclub": "images/map-icons/vault.png",
			"bar": "images/map-icons/vault.png",
			"fast_food": "images/map-icons/sewer.png",
			"cafe": "images/map-icons/sewer.png",
			"drinking_water": "images/map-icons/sewer.png",
			"restaurant": "images/map-icons/settlement.png",
			"cinema": "images/map-icons/office.png",
			"pharmacy": "images/map-icons/office.png",
			"school": "images/map-icons/office.png",
			"bank": "images/map-icons/monument.png",
			"townhall": "images/map-icons/monument.png",
			"bicycle_parking": "images/map-icons/misc.png",
			"place_of_worship": "images/map-icons/misc.png",
			"theatre": "images/map-icons/misc.png",
			"bus_station": "images/map-icons/misc.png",
			"parking": "images/map-icons/misc.png",
			"fountain": "images/map-icons/misc.png",
			"marketplace": "images/map-icons/misc.png",
			"atm": "images/map-icons/misc.png",
		}
	},
	methods: {
		switchMenu: function (index) {
			this.activeSubMenu = 0;
			this.activeListItem = 0;
			this.activeMenu = index;
		},
		switchSubMenu: function (index) {
			this.activeListItem = 0;
			this.activeSubMenu = index;
		},
		keyEventHandler: function (e) {
			//console.log("key pressed: " + e.which);
			if(e.which===37&&this.activeSubMenu>0) {
				this.switchSubMenu(this.activeSubMenu-1);
			}
			if(e.which===39&&this.activeSubMenu<this.menus[this.activeMenu].submenus.length-1) {
				this.switchSubMenu(this.activeSubMenu+1);
			}
			if(e.which===33&&this.activeMenu<this.menus.length-1) {
				this.switchMenu(this.activeMenu+1);
			}
			if(e.which===34&&this.activeMenu>0) {
				this.switchMenu(this.activeMenu-1);
			}
			if(e.which===38&&this.activeListItem>0) {
				this.activeListItem--;
			}
			if(e.which===40&&this.activeListItem<this.menus[this.activeMenu].submenus[this.activeSubMenu].items.length-1) {
				this.activeListItem++;
			}
			if(e.which===49&&this.activeMenu!==0) {
				this.switchMenu(0);
			}
			if(e.which===50&&this.activeMenu!==1) {
				this.switchMenu(1);
			}
			if(e.which===51&&this.activeMenu!==2) {
				this.switchMenu(2);
			}
			if(e.which===52&&this.activeMenu!==3) {
				this.switchMenu(3);
			}
			if(e.which===53&&this.activeMenu!==4) {
				this.switchMenu(4);
			}
		},
		drawMap: function() {
			var c = document.getElementById("map-canvas");
			var ctx = c.getContext("2d");
			for(let i=0; i<this.waypoints.length; i++) {
				for(let j=0; j< this.waypoints[i].points.length; j++) {
					if(this.waypoints[i].points[j+1]) {
						let startx = convertCoordsToPx(this.waypoints[i].points[j].lon, 'x');
						let starty = convertCoordsToPx(this.waypoints[i].points[j].lat, 'y');
						let endx = convertCoordsToPx(this.waypoints[i].points[j+1].lon, 'x');
						let endy = convertCoordsToPx(this.waypoints[i].points[j+1].lat, 'y');
						ctx.strokeStyle="#5fFF80"; // should match $primary-text-color in styles.scss
						ctx.fillStyle="#5fFF80";
						ctx.moveTo(startx, starty);
						ctx.lineTo(endx, endy);
						ctx.stroke();
					}
				}
			}
			for(let i=0; i<this.mapNodes.length; i++) {
				var c = document.getElementById("map-canvas");
				var ctx = c.getContext("2d");
				let img = new Image();
				img.addEventListener('load', () => { // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
					let x = convertCoordsToPx(this.mapNodes[i].lon, 'x');
					let y = convertCoordsToPx(this.mapNodes[i].lat, 'y');
					ctx.drawImage(img, x, y);
					ctx.font = "10px Arial";
					ctx.fillText(this.mapNodes[i].name, x-24, y+24);
				}, false);
				img.src = this.mapIcons[this.mapNodes[i].type];
			}
		}
	},
	computed: {
		visibleSubMenus: function () {
			var visibleSubMenus = [];
			if(this.activeSubMenu>1) {
				visibleSubMenus.push(this.menus[this.activeMenu].submenus[this.activeSubMenu-2]);
			}
			if(this.activeSubMenu>0) {
				visibleSubMenus.push(this.menus[this.activeMenu].submenus[this.activeSubMenu-1]);
			}
			visibleSubMenus.push(this.menus[this.activeMenu].submenus[this.activeSubMenu]);
			if(this.activeSubMenu<this.menus[this.activeMenu].submenus.length) {
				visibleSubMenus.push(this.menus[this.activeMenu].submenus[this.activeSubMenu+1]);
			}
			if(this.activeSubMenu+1<this.menus[this.activeMenu].submenus.length) {
				visibleSubMenus.push(this.menus[this.activeMenu].submenus[this.activeSubMenu+2]);
			}
			return visibleSubMenus;
		},
		currentTime: function () {
			let time = new Date();
			let currentHours = time.getHours();
			var pm = false;
			if (currentHours>12) {
				currentHours -= 12;
				pm = true;
			}
			let currentTime = ("0" + currentHours).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2);
			if(pm) {
				currentTime += " PM";
			} else {
				currentTime += " AM";
			}
			return currentTime;
		},
		fakeDate: function () {
			let time = new Date();
			let fakeDate = (time.getMonth() + 1) + "." + time.getDate() + "." +	(time.getFullYear() + 200);
			return fakeDate;
		}
	},
	mounted: function() {
		window.addEventListener('keyup', this.keyEventHandler);
	}
});

function convertCoordsToPx(coordValue, coordAxis) {
	let canvasWidth = document.getElementById("map-canvas").width;
	let canvasHeight = document.getElementById("map-canvas").height;

	if(coordAxis==='y') {
		let range = app.maxLat - app.minLat;
		let relativePosition = (coordValue - app.minLat) / range;
		return Math.abs(Math.round(relativePosition * canvasHeight));
	} else if(coordAxis==='x') {
		let range = app.maxLon - app.minLon;
		let relativePosition = (coordValue - app.minLon) / range;
		return Math.abs(Math.round(relativePosition * canvasWidth));
	} else {
		//should never get here
		throw "bad coordAxis";
	}
}