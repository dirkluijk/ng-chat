# NgChat

Let's make a PWA of this Angular app!

## Preparations

### Install dependencies

Use `npm install` or `yarn` to install the dependencies.

### Firebase setup
To make this app fully progressive, it needs to be served over HTTPS. Let's use 
Google Firebase hosting for that!

1. Install the [Firebase CLI](https://firebase.google.com/docs/cli/)
2. Run `firebase init` in this project. Choose "Hosting", the existing `ng-chat` project, and use the directory `dist/ng-chat`.
  Also, choose YES for `Configure as a single-page app`. For the other options, use the defaults.
  Alternatively, you can create your own Firebase project to prevent deployment collisions with others. Please let me know what the Firebase project name is, so that I can adjust the oAuth settings. 

### Run the app
To serve the app locally, use `ng serve`. The app is running on `http://localhost:4200`.

You can test the PWA features using [Lighthouse](https://developers.google.com/web/tools/lighthouse/) in Chrome Devtools.

### Deployment
You can build and deploy the app with `ng build --prod && firebase deploy`.

## Exercises

1. Run the app with `ng serve` to try it out.
2. Run `ng add @angular/pwa` to add Angular Service Worker and the App Manifest. Take your time to see what this command does: 
    - it adds `@angular/pwa` and `@angular/service-worker` as dependencies in `package.json`
    - it generates the `src/manifest.json` and adds it to `src/index.html`
    - it generates some default app icons in `src/assets/icons`
    - it informs the Angular CLI to generate a service worker script by setting `serviceWorker: true` in `angular.json`
    - it registers the service worker by importing the `ServiceWorkerModule` in `src/app/app.module.ts`.
    This is actually an abstraction of the `serviceWorker.register()` mechanism! Also note that it disables the service worker in debug mode.
    That means that in order to test the service worker we need to do make `--prod` build and deploy it somewhere.
3. Change the title in `app.component.html` (and in `login.component.html` if you want) to something else, so that you can identify your version of this app when we deploy it.
3. Let's test it! Run `ng build --prod && firebase deploy` and visit to the Firebase URL to test it. NOTE: please inform others when you want to deploy, as we work with a shared hosting project!
4. If you look close, you will see that some things break when we go offline. To fix the broken icons, we need to add the following urls to the `assets` group in `ngsw-config.json`:
   ```
    "urls": [
      "https://fonts.googleapis.com/**",
      "https://fonts.gstatic.com/**"
    ]
    ```
5. Besides that, Firebase does not work offline. It does not seem to work with service workers. 
  Luckily, Angular Firebase has its own offline capabilities! Change `AngularFirestoreModule` to `AngularFirestoreModule.enablePersistence()` in `app.module.ts`.
  This will store messages when offline, and sync them as soon as you get online.
6. Awesome! The app should be fully progressive. As a bonus, we could disable some functionality when offline.
    - Go to `app.component.ts`. Add a property `online = navigator.onLine;`.
    - Disable the textarea and button using `[disabled]="!online"`.
    - Of course we need to listen for online/offline changes as well. In plain JavaScript, we do this using `window.addEventListener('offline', () => ...)` and `window.addEventListener('offline', () => ...)`.
    The Angular equivalent is:
    
    ```
      @HostListener('window:online')
      @HostListener('window:offline')
      onConnectivityChange(): void {
        this.online = navigator.onLine;
      }
    ```

If you have finished the exercises, you can help others. Or try to get Firebase Push Notifications working!
