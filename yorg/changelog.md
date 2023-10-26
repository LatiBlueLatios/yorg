# Changelog

## Important Note

- I quit lol
- Project is now archived

## v3.0.0 (25.10.2023) - Major Update

- Developer Takeover! BlueLatios has taken over development of this game *unofficially*
- ! This game is considered a mod of Yorg.io, this is an unofficial copy !
- Changelog has now been moved to a changelog file. To those who object, what are you gonna do about it?
- Started process of modernizing the code and preparing it for a fresh WebPack rebuild
- [Experimental] Started on Japenese translation
- [Backend Change] Reworked savegame loading, now buildings will be loaded in batches to prevent freezing
- [Notice] Removed all translations except for English and Simplified Chinese
- [Notice] Removed all ad related code
- [Notice] I am planning to remove the tutorial, the code is too inefficient and hard to maintain
- [Notice] Slight math changes in the backend results in stats no longer being rounded to 5/0 digits
- [Notice] Reverted effect where the camera spawns in random locations
- [Gameplay Change] Reworked wave spawn mechanics, zombies now spawn in groups to prevent initial lag
- [Gameplay Change] Map generator now generates 1k crystals per map instead of 270 crystals, original yorg saves are no longer compatible!
- [New Feature] Added a bomb tower, a slow tower that fires projectiles that deal massive aoe dmg!
- [Rebalance] Buffed Lightning damage to make it viable in late-game, cost was increased to balance
- [Rebalance] Lowered zombie max speed cap along with "farspeedBoost" to prevent a phenomenon known as "wall-skating"

### Known Issues

- laaaaaaaaaaaaaaaaaaaaaagggggggggggg....
- Shield Towers do not transfer over from old saves
- Bomb Towers uses cannon tower assets (I am too lazy to make one for the bomb tower)
- You can no longer create games with the Yorg api, aka leaderboard incompatible
- MouseTracker exploit still exists (It will come soon dw)
- Tutorial autoplays itself, I'll leave it until I replace it with something else

## v2.6.8 (04.03.2022) - Minor Update

- Fixed game not working with certain adblockers

## v2.6.7 (21.05.2020) - Minor Update

- Added link to my new game: shapez.io

## v2.6.6 (01.05.2020) - Minor Update

- Minor performance improvements
- Updated translations
- Changed back to old resource textures

## v2.6.5 (21.06.2019) - Minor Update

- Minor fixes
- Cleaned up the front page
- Added link to help translate

## v2.6.4 (08.05.2019) - Minor Update

- Updated resource artwork

## v2.6.3 (26.04.2019) - Minor Update

- Improved ingame chat system!

## v2.6.2 (08.04.2019) - Minor Update

- Minor fixes and improvements

## v2.6.1 (04.04.2019) - Minor Update

- Improved and resizeable chat
- Enhanced the start page
- Minor fixes and improvements

## v2.6.0 (01.04.2019) - Minor Update

- Ingame chat! Connect with other players from all over the world

## v2.5.4 (26.03.2019) - Minor Update

- Update translations
- Fix savegame download in Microsoft Edge
- Sounds and notifications when a building is destroyed now also appear with particles disabled
- Decreased the amount of ingame video ads, in exchange showing one in the beginning

## v2.5.3 (13.03.2019) - Minor Update

- Update translations

## v2.5.2 (30.01.2019) - Minor Update

- Fix crash in Microsoft Edge (Use Chrome for the best experience)

## v2.5.1 (23.01.2019) - Minor Update

- Fix bug when moving camera while pressing space
- Do not increase zombie speed past day 200 to avoid zombies getting stuck
- Add Greek translations

## v2.5.0 *14.01.2019*

- **Global Transport!** There is now a skill which fixes lategame lag!
- You can now download savegames instead of having to copy them

## v2.4.0 *05.12.2018*

- Resource statistics UI can now be toggled in the settings
- Add introductory tutorial
- Fix tooltips overlapping on small screens
- Update translations

## v2.3.3 *03.09.2018*

- Fix smaller bugs
- Revert music and sounds
- Fix tutorial not working
- Fix leaderboard shown on mobile
- Update colors

## v2.3.1 *23.08.2018*

- Added **Sell All** option when holding shift in the building tooltip
- Added Lithuanian Translations

## v2.3.0 *20.08.2018*

- **Brand new save system!** (Yes, you can import your old saves)
- Days no longer get longer past day 100
- Fix resource amounts not being updated while paused
- Fix network recomputation sometimes getting stuck
- Added a FAQ

## v2.2.1 *25.07.2018*

- Fix 'fill all' button in sandbox mode
- Fix error when clicking follow button twice

## v2.2.0 *18.07.2018*

- **Sandbox mode!**

## v2.1.2 *16.07.2018*

- Smaller preparations for the next update

## v2.1.1 *11.07.2018*

- Fix bug regarding all settings being disabled by default
- Fix some cheats
- Improve UI on smaller resolutions
- Make easy the default game mode

## v2.1.0 *09.07.2018*

- **The map is now four times as big as previously!**
- Unfortunately, this makes old savegames incompatible. Sorry!
- You can now hold M to increase the minimap size
- Made invisible transporters available earlier
- Added skills to place up to 12 crystals per resource
- Fix crash when selling invisible transporters
- Fix exploit when loading savegames multiple times
- When a building got destroyed, show its icon and also an indicator on the minimap
- Big numbers are now better formatted
- Made easy mode easier, increased difficulty of the challenge mode
- Minor fixes

## v2.0.0 *15.06.2018*

- **Skill tree!**
- **Save / Load your games!** (very experimental)
- **Shield Towers!**
- **Permanent Leaderboard** (All Time / Today)!
- **19 New Levels, up to Level 30!**
- Show hints when unlocking new features
- The resource visualizer (bottom left) now shows the demand instead of the stored amount of resources
- Improve Performance by a lot
- Zombies now collide with each other
- Improve zombie AI
- Multiple particles are now grouped together to save performance
- When pressing ALT while placing, buildings will be upgraded automatically
- Hold N / X or Alt and click on a building to upgrade / sell or max out it without having to open the tooltip
- Allow pause during night
- Add key to toggle GUI
- Fix missing resources shown also while paused
- The game no longer pauses on focus lost, instead when getting invisible
- Also disable shoot animation when disabling particles
- Remove collectable crystals on startup
- Added map fog
- Fix crystals sometimes being dropped when using long transport routes
- Improve Defensive Towers, they don't shoot at enemies which will die anyways anymore
- Show crystals over time statistics on gameover
- Improved welcome screen and added blog posts

## v1.9.1 *25.05.2018*

- Defensive towers now have an animation when shooting
- Mobile optimization
- Improve page load speed
- Fix zoom on firefox
- Fix always showing 'Did you even play' on Gameover screen
- GDPR compliance

## v1.9.0 *20.05.2018*

- **Sound effects!**
- **Translations for various languages! Not all are fully translated yet - You can help translate them!**
- **Add settings to disable particles and more**
- Show dialog when playing for the first time and not choosing the tutorial
- Fix cannons sometimes not dealing damage when zombies come from the bottom

## v1.8.0 *14.05.2018*

- New Levels! There is now level 8, 9, 10 and 11!

## v1.7.1 *11.05.2018*

- Fix zoom also scrolling page when running on third-party sites
- Show current rank in leaderboard

## v1.7.0 *08.05.2018*

- **Zooming!** Use the mouse wheel to control the zoom level
- Fix upgrade to max level option being permanent sometimes

## v1.6.4 *07.05.2018*

- Show transporter radius in detail view

## v1.6.3 *05.05.2018*

- Fast forward is now unlocked from the beginning
- Improve validation token display on game over
- Preparing for the next big update

## v1.6.2 *29.04.2018*

- Fix rendering bug causing the game to crash sometimes

## v1.6.1 *26.04.2018*

- Rewrote rendering code to improve performance, especially on later levels
- Add keybinding to max out the current or all buildings to the maximum level. Check out the keybindings dialog!
- Optimize page load speed
- Prevent some cheats

## v1.6.0 *17.04.2018*

- **Add ability to build while paused**
- Add animations when placing or upgrading buildings
- Improved UI
- Rebalance zombies
- Make zombies die slower during the day
- Make buildings regenerate health slower
- Draw connections between transporters different to regular connections
- Make the day-night indicator more visible
- Stop placement when selecting the same building again or clicking on its icon
- Buildings now emit resources with the speed of the transporter (In case they are connected to one)
- Spawn initially at random position on the map
- Minor tutorial improvements

## v1.5.2 *15.04.2018*

- Fix building tooltip shown on pause screen
- Show indicator when a building was destroyed

## v1.5.1 *14.04.2018*

- Add fullscreen button
- Add keybindings dialog
- Add restart button
- Disable fast forward during bosses
- Improve cannon projectile speed
- Add description to all views
- Fix building tooltip closing when pressing shift
- Cleaned up welcome screen
- Rebalance towers
- Make it more clear whether the player is in the leaderboard or not
- Show pause overlay when leaving the window
- Show time until zombie boss spawns

## v1.5.0 *12.04.2018*

- Fix keyboard shortcuts not working sometimes
- Added new utilization view
- Fix zombies giving no gold when killed by lightning towers only
- Increased transporter amount on high levels
- Show on which level a building unlocks
- Make the day-night indicator more visible
- Stop placement when selecting the same building again or clicking on its icon
- Buildings now emit resources with the speed of the transporter (In case they are connected to one)
- Spawn initially at a random position on the map
- Minor tutorial improvements

## v1.4.2 *11.04.2018*

- Added interactive tutorial!

## v1.4.1 *10.04.2018*

- Improve transport view (allow hovering buildings)
- Increase arrow factory limit
- Increase crystal mine limit on level 7 to 16
- Make lightning towers consume slightly more resources
- Add advertisements
- Disallow collecting gems with the mouse while paused

## v1.4.0 *09.04.2018*

- Fix radius of towers being smaller than displayed
- Add new transport view
- Make arrow towers consume up to 30% fewer arrows
- New transporter icon
- Improve bug reporter
- Decrease crystal mine cost and increase throughput
- Allow toggling pause with the spacebar
- Fix UI bug

## v1.3.3 *08.04.2018*

- Added Leaderboard
- Made Days longer, for example: 20s more on day 60, 50s on day 100
- Add defense view
- Show base in the game over screen
- Only spawn collectable crystals when the placer base was placed
- Reduce panel alpha

## v1.3.2 *07.04.2018*

- Fast forward now permanently unlocks on day 15
- Improve building tooltip
- Fix mines producing excess resources
- Cluster crystal particles to improve performance

## v1.3.1 *07.04.2018*

- Don't spawn resources out of map bounds
- Improve storage display on defensive towers
- Make exploding zombies more visible

## v1.3.0 *06.04.2018*

- Refactor transporter system to fix incorrect resource transport
- Reduce available transporter amount on higher levels

## v1.2.9 *04.04.2018*

- New map generator
- Prevent cheats (most of them)
- Show circle around resources when placing mines
- Removed low-resolution warning (caused confusion)

## v1.2.8 *04.04.2018*

- Fix incorrect z-order of iron ores
- Fix crash on game over
- Make zombies die faster on days

## v1.2.7 *04.04.2018*

- Fix numbers not being displayed in Firefox
- Fix tooltip not hiding when dragging slowly
- Balancing improvements
- Huge performance improvements (esp. late game)
# Changelog

# Important Note

- I quit lol
- Project is now archived

## v3.0.0 (25.10.2023) - Major Update

- Developer Takeover! BlueLatios has taken over development of this game *unofficially*
- ! This game is considered a mod of Yorg.io, this is an unofficial copy !
- Changelog has now been moved to a changelog file. To those who object, what are you gonna do about it?
- Started process of modernizing the code and preparing it for a fresh WebPack rebuild
- [Experimental] Started on Japenese translation
- [Backend Change] Reworked savegame loading, now buildings will be loaded in batches to prevent freezing
- [Notice] Removed all translations except for English and Simplified Chinese
- [Notice] Removed all ad related code
- [Notice] I am planning to remove the tutorial, the code is too inefficient and hard to maintain
- [Notice] Slight math changes in the backend results in stats no longer being rounded to 5/0 digits
- [Notice] Reverted effect where the camera spawns in random locations
- [Gameplay Change] Reworked wave spawn mechanics, zombies now spawn in groups to prevent initial lag
- [Gameplay Change] Map generator now generates 1k crystals per map instead of 270 crystals, original yorg saves are no longer compatible!
- [New Feature] Added a bomb tower, a slow tower that fires projectiles that deal massive aoe dmg!
- [Rebalance] Buffed Lightning damage to make it viable in late-game, cost was increased to balance
- [Rebalance] Lowered zombie max speed cap along with "farspeedBoost" to prevent a phenomenon known as "wall-skating"

### Known Issues

- laaaaaaaaaaaaaaaaaaaaaagggggggggggg....
- Shield Towers do not transfer over from old saves
- Bomb Towers uses cannon tower assets (I am too lazy to make one for the bomb tower)
- You can no longer create games with the Yorg api, aka leaderboard incompatible
- MouseTracker exploit still exists (It will come soon dw)
- Tutorial autoplays itself, I'll leave it until I replace it with something else

## v2.6.8 (04.03.2022) - Minor Update

- Fixed game not working with certain adblockers

## v2.6.7 (21.05.2020) - Minor Update

- Added link to my new game: shapez.io

## v2.6.6 (01.05.2020) - Minor Update

- Minor performance improvements
- Updated translations
- Changed back to old resource textures

## v2.6.5 (21.06.2019) - Minor Update

- Minor fixes
- Cleaned up the front page
- Added link to help translate

## v2.6.4 (08.05.2019) - Minor Update

- Updated resource artwork

## v2.6.3 (26.04.2019) - Minor Update

- Improved ingame chat system!

## v2.6.2 (08.04.2019) - Minor Update

- Minor fixes and improvements

## v2.6.1 (04.04.2019) - Minor Update

- Improved and resizeable chat
- Enhanced the start page
- Minor fixes and improvements

## v2.6.0 (01.04.2019) - Minor Update

- Ingame chat! Connect with other players from all over the world

## v2.5.4 (26.03.2019) - Minor Update

- Update translations
- Fix savegame download in Microsoft Edge
- Sounds and notifications when a building is destroyed now also appear with particles disabled
- Decreased the amount of ingame video ads, in exchange showing one in the beginning

## v2.5.3 (13.03.2019) - Minor Update

- Update translations

## v2.5.2 (30.01.2019) - Minor Update

- Fix crash in Microsoft Edge (Use Chrome for the best experience)

## v2.5.1 (23.01.2019) - Minor Update

- Fix bug when moving camera while pressing space
- Do not increase zombie speed past day 200 to avoid zombies getting stuck
- Add Greek translations

## v2.5.0 *14.01.2019*

- **Global Transport!** There is now a skill which fixes lategame lag!
- You can now download savegames instead of having to copy them

## v2.4.0 *05.12.2018*

- Resource statistics UI can now be toggled in the settings
- Add introductory tutorial
- Fix tooltips overlapping on small screens
- Update translations

## v2.3.3 *03.09.2018*

- Fix smaller bugs
- Revert music and sounds
- Fix tutorial not working
- Fix leaderboard shown on mobile
- Update colors

## v2.3.1 *23.08.2018*

- Added **Sell All** option when holding shift in the building tooltip
- Added Lithuanian Translations

## v2.3.0 *20.08.2018*

- **Brand new save system!** (Yes, you can import your old saves)
- Days no longer get longer past day 100
- Fix resource amounts not being updated while paused
- Fix network recomputation sometimes getting stuck
- Added a FAQ

## v2.2.1 *25.07.2018*

- Fix 'fill all' button in sandbox mode
- Fix error when clicking follow button twice

## v2.2.0 *18.07.2018*

- **Sandbox mode!**

## v2.1.2 *16.07.2018*

- Smaller preparations for the next update

## v2.1.1 *11.07.2018*

- Fix bug regarding all settings being disabled by default
- Fix some cheats
- Improve UI on smaller resolutions
- Make easy the default game mode

## v2.1.0 *09.07.2018*

- **The map is now four times as big as previously!**
- Unfortunately, this makes old savegames incompatible. Sorry!
- You can now hold M to increase the minimap size
- Made invisible transporters available earlier
- Added skills to place up to 12 crystals per resource
- Fix crash when selling invisible transporters
- Fix exploit when loading savegames multiple times
- When a building got destroyed, show its icon and also an indicator on the minimap
- Big numbers are now better formatted
- Made easy mode easier, increased difficulty of the challenge mode
- Minor fixes

## v2.0.0 *15.06.2018*

- **Skill tree!**
- **Save / Load your games!** (very experimental)
- **Shield Towers!**
- **Permanent Leaderboard** (All Time / Today)!
- **19 New Levels, up to Level 30!**
- Show hints when unlocking new features
- The resource visualizer (bottom left) now shows the demand instead of the stored amount of resources
- Improve Performance by a lot
- Zombies now collide with each other
- Improve zombie AI
- Multiple particles are now grouped together to save performance
- When pressing ALT while placing, buildings will be upgraded automatically
- Hold N / X or Alt and click on a building to upgrade / sell or max out it without having to open the tooltip
- Allow pause during night
- Add key to toggle GUI
- Fix missing resources shown also while paused
- The game no longer pauses on focus lost, instead when getting invisible
- Also disable shoot animation when disabling particles
- Remove collectable crystals on startup
- Added map fog
- Fix crystals sometimes being dropped when using long transport routes
- Improve Defensive Towers, they don't shoot at enemies which will die anyways anymore
- Show crystals over time statistics on gameover
- Improved welcome screen and added blog posts

## v1.9.1 *25.05.2018*

- Defensive towers now have an animation when shooting
- Mobile optimization
- Improve page load speed
- Fix zoom on firefox
- Fix always showing 'Did you even play' on Gameover screen
- GDPR compliance

## v1.9.0 *20.05.2018*

- **Sound effects!**
- **Translations for various languages! Not all are fully translated yet - You can help translate them!**
- **Add settings to disable particles and more**
- Show dialog when playing for the first time and not choosing the tutorial
- Fix cannons sometimes not dealing damage when zombies come from the bottom

## v1.8.0 *14.05.2018*

- New Levels! There is now level 8, 9, 10 and 11!

## v1.7.1 *11.05.2018*

- Fix zoom also scrolling page when running on third-party sites
- Show current rank in leaderboard

## v1.7.0 *08.05.2018*

- **Zooming!** Use the mouse wheel to control the zoom level
- Fix upgrade to max level option being permanent sometimes

## v1.6.4 *07.05.2018*

- Show transporter radius in detail view

## v1.6.3 *05.05.2018*

- Fast forward is now unlocked from the beginning
- Improve validation token display on game over
- Preparing for the next big update

## v1.6.2 *29.04.2018*

- Fix rendering bug causing the game to crash sometimes

## v1.6.1 *26.04.2018*

- Rewrote rendering code to improve performance, especially on later levels
- Add keybinding to max out the current or all buildings to the maximum level. Check out the keybindings dialog!
- Optimize page load speed
- Prevent some cheats

## v1.6.0 *17.04.2018*

- **Add ability to build while paused**
- Add animations when placing or upgrading buildings
- Improved UI
- Rebalance zombies
- Make zombies die slower during the day
- Make buildings regenerate health slower
- Draw connections between transporters different to regular connections
- Make the day-night indicator more visible
- Stop placement when selecting the same building again or clicking on its icon
- Buildings now emit resources with the speed of the transporter (In case they are connected to one)
- Spawn initially at random position on the map
- Minor tutorial improvements

## v1.5.2 *15.04.2018*

- Fix building tooltip shown on pause screen
- Show indicator when a building was destroyed

## v1.5.1 *14.04.2018*

- Add fullscreen button
- Add keybindings dialog
- Add restart button
- Disable fast forward during bosses
- Improve cannon projectile speed
- Add description to all views
- Fix building tooltip closing when pressing shift
- Cleaned up welcome screen
- Rebalance towers
- Make it more clear whether the player is in the leaderboard or not
- Show pause overlay when leaving the window
- Show time until zombie boss spawns

## v1.5.0 *12.04.2018*

- Fix keyboard shortcuts not working sometimes
- Added new utilization view
- Fix zombies giving no gold when killed by lightning towers only
- Increased transporter amount on high levels
- Show on which level a building unlocks
- Make the day-night indicator more visible
- Stop placement when selecting the same building again or clicking on its icon
- Buildings now emit resources with the speed of the transporter (In case they are connected to one)
- Spawn initially at a random position on the map
- Minor tutorial improvements

## v1.4.2 *11.04.2018*

- Added interactive tutorial!

## v1.4.1 *10.04.2018*

- Improve transport view (allow hovering buildings)
- Increase arrow factory limit
- Increase crystal mine limit on level 7 to 16
- Make lightning towers consume slightly more resources
- Add advertisements
- Disallow collecting gems with the mouse while paused

## v1.4.0 *09.04.2018*

- Fix radius of towers being smaller than displayed
- Add new transport view
- Make arrow towers consume up to 30% fewer arrows
- New transporter icon
- Improve bug reporter
- Decrease crystal mine cost and increase throughput
- Allow toggling pause with the spacebar
- Fix UI bug

## v1.3.3 *08.04.2018*

- Added Leaderboard
- Made Days longer, for example: 20s more on day 60, 50s on day 100
- Add defense view
- Show base in the game over screen
- Only spawn collectable crystals when the placer base was placed
- Reduce panel alpha

## v1.3.2 *07.04.2018*

- Fast forward now permanently unlocks on day 15
- Improve building tooltip
- Fix mines producing excess resources
- Cluster crystal particles to improve performance

## v1.3.1 *07.04.2018*

- Don't spawn resources out of map bounds
- Improve storage display on defensive towers
- Make exploding zombies more visible

## v1.3.0 *06.04.2018*

- Refactor transporter system to fix incorrect resource transport
- Reduce available transporter amount on higher levels

## v1.2.9 *04.04.2018*

- New map generator
- Prevent cheats (most of them)
- Show circle around resources when placing mines
- Removed low-resolution warning (caused confusion)

## v1.2.8 *04.04.2018*

- Fix incorrect z-order of iron ores
- Fix crash on game over
- Make zombies die faster on days

## v1.2.7 *04.04.2018*

- Fix numbers not being displayed in Firefox
- Fix tooltip not hiding when dragging slowly
- Balancing improvements
- Huge performance improvements (esp. late game)

## v1.2.6 *03.04.2018*

- Added changelog
- Improved balancing
- Improved placement of walls and transporters
- Added welcome screen
- Improved UI
- Added cursor key movement

## v1.2.6 *03.04.2018*

- Added changelog
- Improved balancing
- Improved placement of walls and transporters
- Added welcome screen
- Improved UI
- Added cursor key movement
