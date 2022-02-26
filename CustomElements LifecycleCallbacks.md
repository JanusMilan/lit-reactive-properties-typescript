https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks



# Web Componenten Allgemein
JavaScript-Code neuer Komponenten muss mit der Klassensyntax ES2015 geschrieben werden.

https://kinsta.com/de/blog/web-komponenten/


## constructor
- can be used for creating an instance of the Shadow Dom, 
- setting up event listeners and for intializing a component’s state, 
- but it’s not recommended to execute tasks like rendering or fetching resources here. 

## connectedCallback
- wird aufgerufen wenn das Element zu einem Dokument hinzugefügt wird
- Es sollte jedes erforderliche Rendering ausführen.
- Useful for running setup code, such as fetching resources or rendering. 
- Mögliche Anwendung
  - Button zu erzeugen, 
  - dessen Logik zu implementieren 
  - ihn anschließend in den DOM einzuhängen 
- When an element is added to the DOM, the connectedCallback method is triggered. 
  From that moment we can be sure that its available in the DOM and we’re able to 
  - safely set attributes, 
  - fetch resources, 
  - run setup code or render templates. 
  - Therefore you should try to defer as much as work as possible to this point.  
- The connectedCallback hook can be triggered more than once during its lifetime  
Schlussfolgerung
- Für Setup Code (siehe oben) und Rendering der CE
- Kann wiederholt aufgerufen werden wenn CE mehrmals in DOM eingebunden ist
- Implementierung der Methode ergibt Sinn

## disconnectedCallback
- Es wird aufgerufen, wenn die Webkomponente von einem Document Object Model entfernt wird
- Entfernen von gespeicherten Zuständen oder das Abbrechen von Ajax Anfragen
- notify another part of an application that the element is being removed from the DOM
- free resources that won’t be garbage collected automatically
- unsubscribe from DOM events
- stop interval timers
- unregister all registered callbacks with global or application services
- If you don’t clean up your code properly, you might risk memory leakage 
Schlussfolgerung
- Implementierung der Methode ergibt Sinn 

## adoptedCallback
- adoptedCallback ist für das Verschieben des Elements in neue Dokument vorgesehen
- The custom element has been moved into a new document 
  -  someone called 'document.adoptNode(element)'
- In general, this will only occur when dealing with <iframe/> elements 
  where each iframe has its own DOM, but when it happens the adoptedCallback lifecycle hook is triggered  
Schlussfolgerung
- Implementierung der Methode ergibt KEIN Sinn 

## attributeChangedCallback
- attributeChangedCallback wird immer aufgerufen, 
  wenn sich eines der Attribute des Elements ändert.
- alled when an observed attribute has been added, removed, updated, or replaced. 
- Also called for initial values when an element is created by the parser, or upgraded.
- Note: only attributes listed in observedAttributes property will receive this callback.   
- Allgemein
  - The attributes are only read when the component is added to the DOM
  - We first have to remove and add it to the DOM in order to update them again. 
  - A waste of resources, but luckely attributeChangedCallback will be triggered 
    when attributes are added, removed, updated or replaced or when an instance of a component is upgraded
  - only attributes listed in the static get observedAttributes method are observed.
Schlussfolgerung
- Implementierung der Methode ergibt Sinn 

# Lifecycle Hooks/Callbacks Web Components
- http://www.tutorialsavvy.com/2015/07/w3c-web-component-specifications-terminology.html/

The start of a Web Component’s lifecycle: 
- constructor first, 
- and then connectedCallback after adding to the DOM 
- Since the shadow root was attached in the constructor(), then connectedCallback() 
  can be used to access attributes, child elements, or attach event listeners
- If the component is moved or removed and re-attached to the DOM, then connectedCallback() 
  will be called again.  

- The following events happen in a Web Component’s lifecycle:
1. Element is inserted into the DOM
2. Updates when a UI event is being triggered
3. Element deleted from the DOM


# states 
- web Component goes through different states during its life cycle:
  - created: 
    - An web component will be in created state when it is first initialized.
      To handle this state 'createdCallback()' method is provided by the specification.
  - attached: 
    - An web component will be in attached state when it is first inserted to DOM.
      To handle this state 'attachedCallback()' method is provided by the specification.
  - detached: 
    - An web component will be in detached state when it is removed from the DOM.
      To handle this state 'detachedCallback()' method is provided by the specification.
  - attributeChanged: 
    - An web component will be in attributeChanged state when one of its attribute value is 
      updated.To handle this state 'attribueChangedCallback()' method is provided by the specification.
