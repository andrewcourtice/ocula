<p align="center">
    <a href="https://app.ocula.io">
        <img src="https://github.com/andrewcourtice/ocula/raw/refactor/owm-migration/client/src/assets/images/logo/logo-192.svg" alt="Ocula"/>
    </a>
</p>

# Ocula
The free and open-source progressive weather app

<!-- TOC depthfrom:2 -->

- [About](#about)
- [Philosophy](#philosophy)
- [Known Issues](#known-issues)
- [Roadmap](#roadmap)
- [Self-hosting](#self-hosting)
- [Donating](#donating)
- [Credits](#credits)

<!-- /TOC -->

## About
Ocula is a weather app built entirely using modern web standards in an attempt to create a great looking weather app that anyone can use on any device while also providing a simple PWA template for developers to build upon.

I set out to create Ocula as a replacement for my favourite weather app - Pocket Weather, which was unfortunately shut down at the end of 2019 due to high maintenance costs. If you're anything like me (or for some reason, most Australians) then you may appreciate a good weather app.

<p align="center">
    <img src="https://user-images.githubusercontent.com/11718453/77266786-3f66ba00-6cec-11ea-9b3d-cc9638e8c31f.png" width="256" />
    <img src="https://user-images.githubusercontent.com/11718453/77266791-4392d780-6cec-11ea-8fda-520d5f506877.png" width="256" />
    <img src="https://user-images.githubusercontent.com/11718453/77266793-468dc800-6cec-11ea-913f-22e0de7b954c.png" width="256" />
</p>

## Philosophy
The goal of this project is to satisfy the following:

- Must be open-source and freely available to all.
- Must be ad-free, subscription-free and any revenue generated to be used for ongoing maintenance costs.
- Must be built entirely using free (or freemium) services/assets (including hosting, api's, graphics etc.).
- Must be fast, lightweight, accessible and beautiful.

It is my hope that by satisfying the above conditions Ocula can be a weather app for all to enjoy without being bombarded with ads and signups. 

However, as a result of satisfying the above conditions it is therefore not sustainable without some form of monetisation. For the most part I use free tiers of various services to ensure the app remains free but with increased usage I will personally incur the cost and may be forced to shutdown the service should costs become burdensome. For this reason I ask that you consider one of the following:

- If you like Ocula and use it as your everyday weather app I ask that you please consider contributing a regular small donation to the project (see [donating](#donating)) to help ease the cost of maintenance.
- If you are a developer you are free to fork this repository and host your own copy in accordance with the MIT licence (see [self-hosting](#self-hosting)).

## Known Issues
- Sunrise/sunset is not currently localised by timezone.
- Pull-to-refresh doesn't work on iOS.

## Roadmap
- Introduce theming (including dark theme and contextual night theme).
- Add more colour and nice weather animations in the top section.
- Improve the trend graphs by adding more interaction.
- Improve onboarding with empty-state graphics.
- Improve accessibility.
- Add mechanism for migrating the settings schema when upgrading settings fields etc.

## Self-hosting
Ocula is free to copy and host yourself. To do so you will need the following:

- A [Zeit](https://zeit.co/) account linked to Github (free Ci and hosting)
- A [DarkSky API](https://darksky.net/dev) account (free up to 1000 calls a day)
- A [MapBox API](https://www.mapbox.com/) account

To host Ocula yourself, follow these steps:

1. Fork this repository and link it in your Zeit account.
2. Add a `.env` and a `.env.build` file to the root folder.
3. In the `.env` file put the following:
```
DARKSKY_API_KEY=your-darksky-api-key
MAPBOX_API_KEY=your-darksky-api-key
```
4. in the `.env.build` file put the following:
```
MAPBOX_API_KEY=your-darksky-api-key
```
5. Install the **@now** cli `yarn global add @now/latest` and run `now` in the terminal to link the project and enable local development.
6. Enjoy!

## Donating
Please consider donating to the ongoing development of this project by visiting my [Patreon page](https://www.patreon.com/ocula).

## Credits
- Weather forecast provided by [DarkSky](https://darksky.net).
- Precipitation map tiles provided by [RainViewer](https://www.rainviewer.com).
- Maps and geocoding services provided by [MapBox](https://www.mapbox.com).
- Logo designed by [Ethan Roxburgh](https://github.com/ethanroxburgh).
- Icons provided by [Feather Icons](https://feathericons.com).
