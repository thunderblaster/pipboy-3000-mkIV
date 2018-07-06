Vue.component("mapel", {
	props: ["mapNodes", "waypoints"],
	template: `<canvas id="map-canvas" width="600px" height="400px"></canvas>`,
	created: function() {
		if ("geolocation" in navigator) {
			/* geolocation is available */
			console.log("geolocation available!");
			navigator.geolocation.getCurrentPosition(function(position) {
				console.log(position.coords.latitude, position.coords.longitude);
				let southBound = (position.coords.latitude - 0.001).toFixed(4);
				app.minLat = southBound;
				let westBound = (position.coords.longitude - 0.0015).toFixed(4);
				app.minLon = westBound;
				let northBound = (position.coords.latitude + 0.001).toFixed(4);
				app.maxLat = northBound;
				let eastBound = (position.coords.longitude + 0.0015).toFixed(4);
				app.maxLon = eastBound;
				$.get("http://www.openstreetmap.org/api/0.6/map?bbox=" + westBound + "," + southBound + "," + eastBound + "," + northBound, function(data) {
					//nodes
					let nodes = $(data).find("node").filter(function() {
						return $(this).find("tag[k='name']").length;
					});
					var cleanedNodes = [];
					$(nodes).each(function() {
						let cleanedNode = {};
						cleanedNode.name = $(this).find("tag[k='name']").attr('v');
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
					//console.log(cleanedWaypoints);
					app.waypoints = cleanedWaypoints;
					app.drawMap();
				});
			  },
			function(error) {
				/* error using geolocation */
				if (error.code == error.PERMISSION_DENIED) {
					console.log("geolocation permission denied :(");
				} else {
					console.log(error);
				}
			});
		  } else {
			/* geolocation IS NOT available */
			console.log("geolocation failure :(");
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
							},
							{
								name: "10mm Pistol",
								quantity: 2,
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
							},
							{
								name: "Jeans",
								equipped: true,
							},
						]
					},
					{
						name: "Aid",
						type: "List",
						items: [
							{
								name: "Band-Aids",
							},
						]
					},
					{
						name: "Misc",
						type: "List",
						items: [
							{
								name: "Swiss Army Knife",
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
							},
						]
					},
					{
						name: "Mods",
						type: "List",
						items: [
							{
								name: "Silencer",
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
							},
							{
								name: "10mm Round",
								quantity: 15,
							}
						]
					},
				],
				submenuClasses: "submenu",
				footerSectionOne: "5/50",
				footerSectionTwo: "this is the Inv menu",
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
				footerSectionOne: "10.23.2287",
				footerSectionTwo: "this is the Data menu",
			},
			{
				name: "Map",
				submenus: [],
				footerSectionTwo: "this is the Map menu",
			},
			{
				name: "Radio",
				submenus: [],
				footerSectionTwo: "this is the Radio menu",
			},
		],
		mapNodes: [],
		waypoints: [],
		minLon: 0,
		minLat: 0,
		maxLon: 0,
		maxLat: 0,
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
						console.log(startx, starty, endx, endy);
						console.log(this.waypoints[i].points[j].lat, this.waypoints[i].points[j].lon, this.waypoints[i].points[j+1].lat,this.waypoints[i].points[j+1].lon);
						ctx.strokeStyle="#5fFF80"; // should match $primary-text-color in styles.scss
						ctx.moveTo(startx, starty);
						ctx.lineTo(endx, endy);
						ctx.stroke();
					}
				}
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
		console.log(coordValue-app.minLon);
		return Math.abs(Math.round(relativePosition * canvasWidth));
	} else {
		//should never get here
		throw "bad coordAxis";
	}
}