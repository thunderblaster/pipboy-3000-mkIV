This is a project to create a Pip Boy GUI for use in cosplay, props, and for fun.  This project was
inspired by [Pypboy](https://github.com/sabas1080/pypboy).  It aims to recreate that concept using
HTML/JS/CSS and allow it to be displayed in a browser instead of using Pygame.  This will allow the
GUI to be responsive and gracefully resize to different resolutions.

GOALS
-----
* Do not require internet connectivity. Ensure a raspberry pi without wifi is a first-class citizen.
* Support mouse/touch. Ensure a phone or tablet with no other input can access all screens.
* Support keyboard-only. Ensure a raspberry pi with buttons emulating a keyboard can access all screens.
* Support resolutions from 320x480 to 1080x1920. Cheap LCD HATs should work as well as any other device.

USE
-----
* Page Up and Page Down cycle top-level menus
* Left arrow and Right arrow cycle submenus