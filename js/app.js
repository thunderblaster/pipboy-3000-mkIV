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
				submenuClasses: "submenu submenu-scoot-left",
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
				submenuClasses: "submenu",
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
				submenuClasses: "submenu submenu-scoot-right",
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

