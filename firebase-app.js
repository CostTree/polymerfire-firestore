import firebase from '@firebase/app';
import '@firebase/app';
import '@firebase/database';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/messaging';
import '@firebase/firestore';

import { PolymerElement } from '@polymer/polymer/polymer-element';

class FirebaseApp extends PolymerElement {
    constructor() {
        super();
    }

    static get properties() {
        return {
            /**
             * The name of your app. Optional.
             *
             * You can use this with the `appName` property of other Polymerfire elements
             * in order to use multiple firebase configurations on a page at once.
             * In that case the name is used as a key to lookup the configuration.
             */
            name: {
                type: String,
                value: ''
            },

            /**
             * Your API key.
             *
             * Get this from the Auth > Web Setup panel of the new
             * Firebase Console at https://console.firebase.google.com
             *
             * It looks like this: 'AIzaSyDTP-eiQezleFsV2WddFBAhF_WEzx_8v_g'
             */
            apiKey: {
                type: String
            },

            /**
             * The domain name to authenticate with.
             *
             * The same as your Firebase Hosting subdomain or custom domain.
             * Available on the Firebase Console.
             *
             * For example: 'polymerfire-test.firebaseapp.com'
             */
            authDomain: {
                type: String
            },

            /**
             * The URL of your Firebase Realtime Database. You can find this
             * URL in the Database panel of the Firebase Console.
             * Available on the Firebase Console.
             *
             * For example: 'https://polymerfire-test.firebaseio.com/'
             */
            databaseUrl: {
                type: String
            },

            /**
             * The Firebase Storage bucket for your project. You can find this
             * in the Firebase Console under "Web Setup".
             *
             * For example: `polymerfire-test.appspot.com`
             */
            storageBucket: {
                type: String,
                value: null
            },

            /**
             * The Firebase Cloud Messaging Sender ID for your project. You can find
             * this in the Firebase Console under "Web Setup".
             */
            messagingSenderId: {
                type: String,
                value: null
            },

            projectId: {
                type: String,
                value: null
            },

            /**
             * The Firebase app object constructed from the other fields of
             * this element.
             * @type {firebase.app.App}
             */
            app: {
                type: Object,
                notify: true,
                computed: '__computeApp(name, apiKey, authDomain, databaseUrl, storageBucket, messagingSenderId, projectId)'
            }
        };
    }

    __computeApp(name, apiKey, authDomain, databaseUrl, storageBucket, messagingSenderId, projectId) {
        if (apiKey && authDomain && databaseUrl) {
            var init = [{
                apiKey: apiKey,
                authDomain: authDomain,
                databaseURL: databaseUrl,
                storageBucket: storageBucket,
                messagingSenderId: messagingSenderId,
                projectId: projectId
            }];

            if (name) {
                init.push(name);
            }

            firebase.initializeApp.apply(firebase, init);
            this.dispatchEvent(new CustomEvent('firebase-app-initialized'));
        } else {
            return null;
        }

        return firebase.app(name);
    }
}

customElements.define("firebase-app", FirebaseApp);