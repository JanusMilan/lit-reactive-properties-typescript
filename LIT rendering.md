
# Allgemein
- A Lit component renders its template initially when it's added to the DOM on a page
- After the initial render, any change to the component's reactive properties triggers 
  an update cycle, re-rendering the component
- During an update, only the parts of the DOM that change are re-rendered  
- Lit uses shadow DOM to encapsulate the DOM a component renders

# LIT render() Method
- https://lit.dev/docs/components/rendering/
- Avoid changing the component's state.
- Avoid producing any side effects
- Use only the component's properties as input
- Return the same result when given the same property values
- In most cases you should avoid making DOM updates outside of render
  - express the component's template as a function of its state, 
    and capture its state in properties
- Beispiel
  - For example, if your component needs to update its UI when it receives an event, 
    have the event listener set a reactive property that is used in render(), rather than manipulate the DOM directly.

- Schlussfolgerung 
  - nicht mit 'render' den DOM ändern sonder das dem LIT über 'reactive property' überlassen    

