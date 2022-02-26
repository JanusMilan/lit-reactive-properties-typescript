import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { state } from 'lit/decorators.js';

// Daten importieren
import { address } from "./data";
// Typdefinition importieren
import { Address } from "./model";


/* 
   Unter-Komponente 
   - Wird nur beim Auswahl eines Nutzers sichtbar sons wird nur leere Template gezeigt
*/
@customElement("address-viewer")
class AddressViewer extends LitElement {
  static styles = css`
      :host {
        display: block;
      }
  
      table {
        border-collapse: collapse;
        width: 100%;
      }
  
      td,
      th {
        border: 1px solid gray;
        text-align: left;
        padding: 5px;
      }
    `;

/*   'public' Property, Initialisiert mit '0'    
  default converter '{ type: Number }' wird angewandt 
  converting von Attribut (String) auf Property (Number) */
  @property({ type: Number }) userId: number = 0;
  // 'private' Property, nicht Initialisiert deswegen '?'
  @state() protected _userAddress?: Address;


  /* render() wird IMMER von 'update' aufgerufen 
     - wenn ein User nicht gewählt wird, dann wird leere Tempalte gezeigt 
     - wenn ein User gewählt wird, dann wird Tempalte mit Tabelles gezeigt
  */
  render() {
    console.log("render")
    // bevor property '_userAddress' nicht verändert wird bzw. so weit sie 'undefined' ist
    if (this._userAddress === undefined) {
      return html``;
    }      

    // wenn ein user gewählt ist und '_userAddress' NICHT 'undefined' ist  
    return html`
        <table>
          <tr>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Street</th>
            <th>Zip Code</th>
          </tr>
          <tr>
            <td>${this._userAddress.country}</td>
            <td>${this._userAddress.state}</td>
            <td>${this._userAddress.city}</td>
            <td>${this._userAddress.street}</td>
            <td>${this._userAddress.zipCode}</td>
          </tr>
        </table>
      `;
  }


  /*  
     Called to update the component's DOM.
     - Use the Map of 'changedProperties' to compare current and previous values
     - Methode 'update' ruft IMMER  die Methdie 'render'
  */
 /* Es ist ein künstliches Beispiel 
    - stat mit 'customEvent' (wie beim Vaadim Beispiel) wird hier 'changedProperties' überprüft 
      ob Property 'userId' gewählt wurde bzw. sich geändert hat
    - eigentlich soll man diese Methode nicht selbst implementieren        
 */
  update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("userId")) {
      const oldValue = changedProperties.get("userId") as number;
      // suchen die Adresse für ID
      this.loadAddress(this.userId);
    }
    // IMMER 'super' aufrufen
    super.update(changedProperties);
  }

  /* Vielleich künstlich um zu zeigen wie man asynchron aufruft Funktion 'loadAddress' 
     die wiederrum eine promise 'resolve'  
  */
  private async loadAddress(id: number) {
    // suchen die Adresse für ID
    this._userAddress = await this.getAddress(id);
  }

  /* Funktion gibt zurück ein Promisse */
  private getAddress(id: number) {
    // zurückgeben die Adresse für ID
    return new Promise<Address>((resolve, reject) => resolve(address[id]));
  }
}
