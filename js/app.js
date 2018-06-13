var app = new Vue({
	el: "#vue-app",
	data: {
		activeMenu: 0,
		activeSubMenu: 0,
		menus: [
			{
				name: "Stat",
				submenus: [
					{
						name: "Status",
					},
					{
						name: "Special",
					},
					{
						name: "Perks",
					},
				],
			},
			{
				name: "Inv",
				submenus: [
					{
						name: "Weapons",
					},
					{
						name: "Apparel",
					},
					{
						name: "Aid",
					},
					{
						name: "Misc",
					},
					{
						name: "Junk",
					},
					{
						name: "Mods",
					},
					{
						name: "Ammo",
					},
				],
			},
			{
				name: "Data",
				submenus: [
					{
						name: "Quests",
					},
					{
						name: "Workshops",
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
				],
			},
			{
				name: "Map",
				submenus: [],
			},
			{
				name: "Radio",
				submenus: [],
			},
		],
	},
	methods: {
		switchMenu: function (index) {
			this.activeSubMenu = 0;
			this.activeMenu = index;
		},
		keyEventHandler: function (e) {
			//console.log("key pressed: " + e.which);
			if(e.which===37&&this.activeSubMenu>0) {
				this.activeSubMenu--;
			}
			if(e.which===39&&this.activeSubMenu<this.menus[this.activeMenu].submenus.length-1) {
				this.activeSubMenu++;
			}
			if(e.which===33&&this.activeMenu<this.menus.length-1) {
				this.switchMenu(this.activeMenu+1);
			}
			if(e.which===34&&this.activeMenu>0) {
				this.switchMenu(this.activeMenu-1);
			}
		},
	},
	mounted: function() {
		window.addEventListener('keyup', this.keyEventHandler);
	}
});

