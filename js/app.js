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
					},
					{
						name: "Special",
						type: "List",
						items: [
							{
								name: "Strength",
								value: "7",
								image: "animations/special/Strength.gif",
							},
							{
								name: "Perception",
								value: "7",
								image: "animations/special/Perception.gif",
							},
							{
								name: "Endurance",
								value: "7",
								image: "animations/special/Endurance.gif",
							},
							{
								name: "Charisma",
								value: "7",
								image: "animations/special/Charisma.gif",
							},
							{
								name: "Intelligence",
								value: "7",
								image: "animations/special/Intelligence.gif",
							},
							{
								name: "Agility",
								value: "7",
								image: "animations/special/Agility.gif",
							},
							{
								name: "Luck",
								value: "7",
								image: "animations/special/Luck.gif",
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
							},
							{
								name: "Locksmith",
							},
						]
					},
				],
				submenuClasses: "submenu submenu-scoot-left",
				footerSectionOne: "HP 100/100",
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
				footerSectionOne: "5/50"
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
				footerSectionOne: "10.23.2287"
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

