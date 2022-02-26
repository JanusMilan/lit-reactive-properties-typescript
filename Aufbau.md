
# Aufbau 

## Haupt-Komponente 'main-viewer'
- Im 'main-viewer' Template wird 'address-viewer' eingebunden
  - import "./address-viewer";
  - <address-viewer .userId=${this.userId}></address-viewer>
- nutzt Interface 'User' aus "./model" für Property Typ Deklaration
  - import { address } from "./data";
- nutzt 'users' Variable aus "./data" als Data Input 
  - import { users } from "./data";

## Komponente 'address-viewer' 
- ist im 'main-viewer' Template eingebunden
- dient zur Darstellung der Daten 
- nutzt Interface 'Address' aus "./model" für Property Typ Deklaration
   - import { Address } from "./model"; 
- nutzt 'address' Variable aus "./data" als Data Input 
  - import { address } from "./data";

## Interface Definitionen im 'model.ts' 
- Interfaces Property Typ Deklaration
  - Interface 'Address'
  - Interface 'User'


## Daten Buffer 'data.ts' 
- Array Variable 'users' von Typ 'User' mit Nutzern
- Array Variable 'address' von Typ 'Address' mit Addressen

