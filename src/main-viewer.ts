import {LitElement, html, css} from 'lit';
import {customElement } from 'lit/decorators.js';
import { state } from 'lit/decorators.js';

// Daten importieren
import { users } from "./data";
// Typdefinition importieren
import { User } from "./model";
// Unter-Komponente importieren
import "./address-viewer";
  

/* Haupt-Komponente */
@customElement("main-viewer")
class MainViewer extends LitElement {

    static styles = css`
      :host {
        display: block;
      }
    `;

  
    // 'private' Property, Initialisiert als leere Array
    @state() protected _users: User[] = [];
    // 'private' Property, nicht Initialisiert deswegen '?'
    @state() protected _userId?: number;

    /*  */
    render() {
      return html`
        <div>
          <h1>User Address Viewer</h1>
          <span>Select a User to see the Address:</span>
          <ul>
            <!-- Mit mappen alle User über Links abbilden  -->
            ${this._users.map(
              user => html`
                <li>
                  <a href="#" @click="${() => this.viewAddress(user.id)}"
                    >${user.name}</a
                  >
                </li>
              `
            )}
          </ul>
          <!-- Unter-Komponente einbinden -->
          <address-viewer .userId=${this._userId}></address-viewer>
        </div>
      `;
    }
  
    /* Fetching Nutzer
       - HIER nur einmal Aufgerufen, da CE nur einmal im DOM eingebunden ist
    */
    async connectedCallback() {
      console.log("connectedCallback")
      // IMMER super
      super.connectedCallback();
      // asynchrone Aufruf
      this._users = await this.getUsers();
    }
  
    // methode die Promise zurückgibt mit allen User
    private getUsers() {
      return new Promise<User[]>((resolve, reject) => resolve(users));
    }
  
    // getter für ID
    private viewAddress(id: number) {
      this._userId = id;
    }
  }
  