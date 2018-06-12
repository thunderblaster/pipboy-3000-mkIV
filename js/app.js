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
		}
	}
});

