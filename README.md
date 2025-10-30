# Cantus Catholici - cantuscatholici-frontend

React Singe Page App. Using Typescript and Webpack.

## Instalation
`npm install`

## Development server
`npm run dev`

This runs the development server on port 3001. 

## Testing
There is provided storybook that can be run on port 6006 by the following command: 

`npm run storybook`

<br/>

---

<br/>

### Recommended setup:

**node**: 24.3.0


## Task

- vytvoriť detail zobrazenia akéhokoľvek užívateľa -> vytvoriť view (podstránku), potrebné komponenty a potrebný request na API

### View a komponenty.
- vytvoriť UserDetailView podľa mocku: https://excalidraw.com/#json=_v4dqwqihCiI9wOC_eYIY,HUybKsSDXGXv5b8ptMkPvA
- vytvoriť potrebné komponenty, ak nejaké treba 
- zaregistrovať si tento view do main routeru v /src/router/routers pod nejakú rozumnú path, napríklad: /user/:id/detail alebo dačo podobné
- Dá sa implementovať aj bez API, čisto len s mocknutými dátami v nejakej javascript konštante, viz. HomepageView kde su taky a piesne ako konstanta. 
- 

### Api request
- vytvoriť si mock d8t v /public/mock/ (on tam ten mock uz aj je, ale asi ho bude treba este trochu upravit)
- Podĺa vzoru v /src/api, vytvoriť api request a namiesto url na backend tam zatiaľ dať url na ten mock v public/mocks
- vytvoriť UserService s funkciou getUser(id), sem dat ten endpoint na mock a nie na backend.
- vytvoriť hook /api/user/useUserDetail. Ošetriť v ňom načítavanie dát (použiť komponentu Loader z @musica-sacra/lodaer) a notifikácie (použiť hook addNotification a removeNotification z @musica-sacra/notifications). Oba komponenty sa dajú zahľadať v tomto projekte a inšpirovať sa už z ich predchádzajúceho použitia, poprípade si otvoriť dokumentáciu vo web-pluginohc, ich použitie by malo byť priamočiare. 
- Technológie sú ReactQuery a Axios
- toto je trochu ale zložitá časť na pochopenie, keďže som tam implementoval možno trochu zložitejšiu `factory`, tak6e si kľudne môžme ešte zavolať na chvíľu nech to vysvetlím:
