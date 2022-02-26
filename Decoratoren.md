# decorators

## decorators Lit 2.0
- https://lit.dev/docs/api/decorators/

## decorators Lit 1.0
- https://lit.dev/docs/v1/api/lit-element/decorators/
- https://lit.dev/docs/components/decorators/


## Decorator 'property'
- creates a reactive property that reflects a corresponding attribute value. 
- When a decorated property is set the element will update and render. 
- This decorator should only be used for public fields. 
  - settable by element users, either via attribute or the property itself.
- only be done in response to user interaction

## Decorator 'state' 
- Declares a private or protected reactive property 
- triggers updates to the element when it changes
- It does not reflect from the corresponding attribute
- properties that are changed by the element should be private or protected fields 
  and should use the state decorator
- when an element needs to manage state, 
  a private property decorated via the state decorator should be used. 
- Beispiel mit Instanzierung und Initialisiereung
  - @property({ type: Boolean }) clicked = false;

## 'property' vs 'state'
- beide Dekoratoren für reactive Properties
- 'property' ist Äquivalent für 'public'  
  - Wenn Nutzer die Fähigkeit haben soll den Wert über Attribute oder Property zu ändern 
- 'state' ist Äquivalent für 'private' und 'protected' 
  - Wenn Nutzer die NICHT Fähigkeit haben soll den Wert über Attribute oder Property zu ändern 
  - Wenn Wert der Property nur innerhalb der Komponente veränderbar sein sollte
- Änderung der Property im Bezug zum korespondierendem Attribut
  - 'state' reflektiert sich NICHT auf lokale Attribut da KEIN automatisch generiert wird 
  - 'property' reflektiert sich auf lokale Attribut 
- Änderung der Property im Bezug zum korespondierendem CE
  - Änderung 'state' triggert Update der CE   
  - Änderung 'property' triggert Update der CE 
  - Also beide 
- Für State Menagment soll man 'state' nutzen
  - In Kombi mit Redux????????????????????????????????????????????????????????????????