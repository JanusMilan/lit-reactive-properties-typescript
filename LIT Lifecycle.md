

https://lit.dev/docs/components/lifecycle/#reactive-update-cycle

# Allgemein
- Lit components are standard custom elements and inherit the custom element lifecycle methods
- If you need to customize any of the standard custom element lifecycle methods, 
  make sure to call the super implementation (such as super.connectedCallback()) 
  so the standard Lit functionality is maintained
- standard custom element lifecycle methods  
  - constructor
  - connectedCallback
  - disconnectedCallback
  - adoptedCallback
  - attributeChangedCallback
- Schlussfolgerung
  - Lit lifecycle nutzt die standard CE lifecycle Methoden
  - Beim Überschreiben von standard CE lifecycle Methoden IMMER 'super' aufrufen

# Lit lifecycle methods

## 'constructor()' und Lit lifecycle
- Perform one time initialization tasks that must be done before the first update


## 'connectedCallback()' und Lit lifecycle
- Invoked when a component is added to the document's DOM.
- Lit initiates the first element update cycle after the element is connected
- In preparation for rendering, Lit ensures renderRoot (shadowRoot) is created.
- In connectedCallback() you should setup tasks that should only occur when the element is 
  connected to the document.
- The most common of these is adding event listeners to nodes external to the element, 
  like a keydown event handler added to the window. 
- Typically, anything done in connectedCallback() should be undone when the element 
  is disconnected — for example, removing event listeners on window to prevent memory leaks.
- Schlussfolgerung
  - In 'connectedCallback' sollen nur Tasks reinkommen die auftreten wenn CE ist schon im DOM
  - z.B. event listeners 'addEventListener' für Node auserhalb des CEs bzw. in anderem CE
  - AUCH 'requestUpdate()' kann man im 'connectedCallback()' nutzen

## 'disconnectedCallback()' und Lit lifecycle
- Invoked when a component is removed from the document's DOM.
- Pauses the reactive update cycle. It is resumed when the element is connected.
- Typically, anything done in connectedCallback() should be undone when the element 
  is disconnected — for example, removing event listeners on window to prevent memory leaks.
- No need to remove internal event listeners. You don't need to remove event listeners added 
  on the component's own DOM—including those added declaratively in your template. Unlike external event listeners, these won't prevent the component from being garbage collected.  
- Schlussfolgerung
  - In 'disconnectedCallback' sollen 'addEventListener' für Node auserhalb des CEs 
    bzw. in anderem CE entfernt werden
  - ALSO interne CE sollen NICHT 'addEventListener' entfernt werden

# 'attributeChangedCallback()' und Lit lifecycle
- Invoked when one of the element’s observedAttributes changes.
- Lit uses this callback to sync changes in attributes to reactive properties. 
- Specifically, when an attribute is set, the corresponding property is set. 
- Lit also automatically sets up the element’s observedAttributes array 
  to match the component’s list of reactive properties.
- You rarely need to implement this callback.  
- Schlussfolgerung
  - Lit setzt automatisch die 'observedAttributes' für CE also nicht nötig manuall
  - Lit nutzt es um die Atribut-Änderungen auf properties zu übertragen mit 'setter'
  - Man muss selten selbst es implementieren

# 'adoptedCallback()' und Lit lifecycle
- Invoked when a component is moved to a new document
- Lit has no default behavior for this callback.
- This callback should only be used for advanced use cases 
  when the element behavior should change when it changes documents
- Schlussfolgerung
  - Finde keien Beispiele ausser Ausgabe für User


 # Allgemein 'reactive update cycle'
- In addition to the standard custom element lifecycle, 
   Lit components also implement a reactive update cycle.
- The reactive update cycle is triggered when a reactive property changes 
  or when the 'requestUpdate()' method is explicitly called. 
- Lit performs updates asynchronously so property changes are batched — 
  if more properties change after an update is requested, 
  but before the update starts, all of the changes are captured in the same update
- Schlussfolgerung
  - Nebst standard CE lifecycle gibt es LIT 'reactive update cycle'

## 'reactive update cycle'
1. An update is scheduled when one or more properties change 
   or when 'requestUpdate()' is called.
2. The update is performed prior to the next frame being painted.
   - Reflecting attributes are set.
   - The component’s render method is called to update its internal DOM.
3. The update is completed and the updateComplete promise is resolved.   

## hasChanged()
- Called when a reactive property is set. 

## requestUpdate() method
- Call requestUpdate() to schedule an explicit update
- This can be useful if you need the element to update 
  and render when something not related to a property changes
- Schulssfolgerung 
  - man kann 'requestUpdate' im 'connectedCallback' ausführen 

## performUpdate() method   
- When an update is performed, the performUpdate() method is called
- This method calls a number of other lifecycle methods.

## shouldUpdate() method Arguments
- changedProperties: 
  - Map with keys that are the names of changed properties 
    and values that are the corresponding previous values.

## shouldUpdate() method 
- Called to determine whether an update cycle is required.
- If shouldUpdate() returns true, which it does by default, then update proceeds normally. 
- If it returns false, the rest of the update cycle will not be called 
  but the 'updateComplete' Promise is still resolved
- You can implement shouldUpdate() to specify which property changes should cause updates
- Use the map of 'changedProperties' to compare current and previous values.
- Schulssfolgerung 
  - man nutzt 'shouldUpdate' Map mit Argument um festzulegen welsche änderungen der   
    Properties die Updates auslösen

## willUpdate() method 
- Called before update() to compute values needed during the update
- Implement willUpdate() to compute property values that depend on other properties 
  and are used in the rest of the update process.

## 'update()' 
- Called to update the component's DOM.
- Reflects property values to attributes 
  and calls render() to update the component’s internal DOM.
- Generally, you should not need to implement this method.

## render
- Called by update() and should be implemented to return a renderable result 
- The render() method has no arguments, but typically it references component properties

# nach dem Update 
- fter update() is called to render changes to the component's DOM, 
  you can perform actions on the component's DOM using these methods.

## 'firstupdated()'
- Called after the component's DOM has been updated the first time, 
  immediately before updated() is called.
- Implement firstUpdated() to perform one-time work after the component's DOM 
  has been created.   

## 'updated'
- Called whenever the component’s update finishes and the element's DOM 
  has been updated and rendered.





