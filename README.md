![Github banner](https://user-images.githubusercontent.com/70329467/203670919-d0ab507a-56d7-4bee-a2cb-1a283ea788d2.png)

## Prerequisites:

- Ubuntu 20.04 or newer.
- xdotool installed on your system.

```bash
sudo apt-get xdotool
```


## Instalation
0) Make sure you accomplished all the prerequisites
```bash
sudo apt-get xdotool
```
1) Download .deb binary from any release you want.
2) Install it with
```bash
sudo apt install ~/Downloads/<release-name>.deb
```
3) Launch!
![Screenshot from 2022-12-04 22-40-21](https://user-images.githubusercontent.com/70329467/205530979-fe1c16ac-4894-4498-8bb7-2c29255b4cad.png)


## Usage
After launching Sittly you will see the index page.

There you will have all the pre-installed modules.

> Important

  >Once you launched Sittly It will keep running in the background.
  >This is because app is always listen for you to press `Ctrl+Alt+K` to bring it on top.
  >If you really want to close the app, in the **Helper menu** you will have an option called `Close app` to fix this situation.
  

### Navigation
This is the most important point. The entire app is designed to be only used via **keyboard**.

Because of this Sittly highly relies on keyboard arrows to navigate across the menus and components in the screen.

Usage is easy, if you see it you can reach it with arrow keys or some keys combinations.

Some general combinations:
- `Esc` (Escape): Go back or close *popups/modals*, if you are in the home page Sittly will hide in System Tray.
- `Ctrl + Alt + K`: Open Sittly. Move it to the front.
- `Arrows`: Navigation across the components.
- `Enter` or `Space`: They are like a *Click*. Usually triggers the main action of the component you are sitting.
- `Ctrl + O`: open *Helper menu*.
- `Ctrl + Super + .`: open emoji module.
- `Any other key`: Whenever a key (including Supr or Delete) is pressed, immediately *querybar* will be focused and the value of the key pressed will be written inside it.


### Querybar
- It's fixed.
- It will probably be the most used component by you. 
- Depending the context it will serve as a search input or a command launcher and remeber this: whenever you want to choose the first result you are seeing you can hit `Enter` and it will be actioned.
![Frame 2](https://user-images.githubusercontent.com/70329467/205532305-cd676c29-b569-4bad-bcfb-73917f60bf18.png)

### Body
- It will display the main content.
- It's dynamic.
- You will see all kind of components (input text, radio buttons, checkboxes, buttons, etc...).
- The most repetitive component is the `ListItem` (each row you are seing down below). 
![Frame 3](https://user-images.githubusercontent.com/70329467/205533114-0c21f7c3-8123-4465-be3c-20804cb5e64d.png)


### Status bar
- Also known as **Footer**.
- It's probably the most expresive component in Sittly.
- It provides information about your current route and the status of async operations happening at the current time.
- You will always see **Ver más opciones**`Ctrl+O (letter O)`. It will drop down multiple options, and depending where you are positioned it will show you even more options (and contextual ones).
![Frame 4](https://user-images.githubusercontent.com/70329467/205534285-9dec2539-4465-4a78-9479-5e4ee60ff148.png)


### Helper menu
Having an excessive amount of interactive components in the screen can be overwhelming.

In order to provide you a friedly way to interact with elements, componentes and routes, you will have at the tip of your fingertips the helper menu trigger `Ctrl+O`.

- Type of options that will be always avaiable:
  - Navigation
  - Theme dark/light
  - App exit
- It contains every option avaiable.
  
  ![Frame 5](https://user-images.githubusercontent.com/70329467/205535847-bf6d5dab-58be-4ab2-9c1f-e805734c62a2.png)




