# Reactive properties

## Reactive properties Lit 2.0
- https://lit.dev/docs/components/properties/

## Reactive properties Lit 2.0
- https://lit.dev/docs/v1/components/properties/

## Allgemein
- Lit components receive input and store their state as properties
- Reactive properties are properties 
  - that can trigger the reactive update cycle when changed, 
  - re-rendering the component, 
  - and optionally be read or written to attributes.

# Lit manages your reactive properties and their corresponding attributes 
- Reactive updates: 
  - Lit generates a getter/setter pair for each reactive property. 
  - When a reactive property changes, the component schedules an update.
- Schlussfolgerungen
  - man muss 'getter/setter' nicht proggen
  - wenn reaktive Property sich ändert dann ändert sich automatisch CE ohne extra proggen
    - Welsches Mechanismus ist es??????????????

# Attribute handling. 
- By default, Lit sets up an observed attribute corresponding to the property,
  - ALSO IST DIESER ATTRIBUT NICHT UMBEDINGT ZUERST IM TEMPLATE 
- and updates the property when the attribute changes. 
- Property values can also, optionally, be reflected back to the attribute.
- Schlussfolgerungen
  - Lit generiert automatisch ein 'observed attribute' pro reaktive Property
    - FRAGE. wie spricht man diesen an????????????????????????
  - wenn Attribut sich verändert dann wird automatisch reaktive Property angepasst     
  - ALLERDINGS ungedreht ist nicht automatisch 
    - das Änderung der reaktive Property an Komponente weitergegeben wird 
      offensichlicht geht dies nicht über Attribut
      - FRAGE: wie wird Update der Komponente (nach Änderung der reaktive Property) gemacht????
      ??


# Superclass properties
- Lit automatically applies property options declared by a superclass. 
- You don't need to redeclare properties unless you want to change options.
- Schlussfolgerungen
  - Properties werden geerbt und können angepasst werden über 'PropertiyDeclarations'

# Element upgrade. 
- If Lit component is defined after element is already in the DOM, Lit handles upgrade logic, ensuring that any properties set on an element before it was upgraded trigger the correct reactive side effects when the element upgrades.
- Schlussfolgerungen
  - 

# public properties 'property' 
- Public properties 'property' are part of the component's public API.  
- public properties—especially public reactive properties—should be treated as input.
- The component shouldn't change its own public properties, except in response to user input. 

# non-public properties 'state' für internal reactive state 
- Lit also supports internal reactive state. 
- Public properties 'property' are NOT part of the component's public API.  
- These properties don't have a corresponding attribute, 
  and are typically marked protected or private in TypeScript.

# properties vs reactive properties
- Declare your element's public reactive properties using decorators
  or the static properties field
- Use the @property decorator with a class field declaration to declare a reactive property
  - @property({attribute: false}) data = {};
- To declare properties in a static properties class field:
  static properties = {
    mode: {type: String},
    data: {attribute: false},
  };  
- Schlussfolgerung
  - Mit Decorator werden reactive Properties deklariert??????
  - mit static properties class field werden normalen Properties deklariert????

# Initialization    
- properties must be initialized in the element constructor
  - this.data = {};
- ODER sofort 
  - @property({attribute: false}) data = {};  

# 'options object' als argument to the @property decorators
- The argument to the @property decorators is an options object. 
- Omitting the argument is equivalent to specifying the default value for all options.
  - @property({attribute: false}) data = {};

# property-options von 'options object' 
- The options object can have the following properties:
  - https://lit.dev/docs/components/properties/#property-options
  - 'attribute' 
    - Default: true. 
    - If attribute is false, the converter, reflect and type options are ignored. 
  - 'converter'
    - A custom converter for converting between properties and attributes  
  - 'hasChanged'
    - A function called whenever property is set to determine if the property has changed, 
      and should trigger an update.
    - If unspecified, LitElement uses a strict inequality check (newValue !== oldValue) 
      to determine whether the property value has changed
    - https://lit.dev/docs/components/properties/#haschanged
  - 'reflect'
    - Whether property value is reflected back to the associated attribute. 
    - Default: false. For more information, see Enabling attribute reflection.   
      - https://lit.dev/docs/components/properties/#reflected-attributes
  - 'state'  
    - Set to true to declare the property as internal reactive state
    - Also statt mit Decorator 'state' kann man auch im 'options object' über property-options
  - 'type' default converter
    - 'type' option is used by the Lit's runtime for string serialization/deserialization, 
      and should not be confused with a type-checking mechanism.
    - When converting a string-valued attribute into a property, 
      Lit's default attribute converter will parse the string into the type given, 
      and vice-versa when reflecting a property to an attribute.   
    -  If converter is set, this field is passed to the converter. 
    - If type is unspecified, the default converter treats it as type: String. 
    - See Using the default converter: 
      - https://lit.dev/docs/components/properties/#conversion-type 


# default converter von Properties
- Lit has a default converter that handles String, Number, Boolean, Array, and Object property types.
- To use the default converter, specify the type option in your property declaration
  - @property({ type: Number }) count = 0;
- If you don't specify a type or a custom converter for a property, 
  it behaves as if you'd specified type: String

# internal-reactive-state 'state'
- https://lit.dev/docs/components/properties/#internal-reactive-state
- 'state' refers to reactive properties that are not part of component's public API. 
- 'state' properties don't have corresponding attributes, and aren't intended to be used from outside the component. 
- Internal reactive state 'state' should be set by the component itself.
- Internal reactive state shouldn't be referenced from outside the component
- In TypeScript, these properties should be marked as private or protected
- We also recommend using a convention like a leading underscore (_) 
  to identify private or protected properties for JavaScript users
- 'state'  works just like public reactive properties, 
   except that there is no attribute associated with the property 
- The only option you can specify for internal reactive state is 'hasChanged' function.   


# Was passiert wenn propertie siech ändert
- A property change can trigger a reactive update cycle, 
  which causes the component to re-render its template. 

## When a property changes, the following sequence occurs
1. The property's 'setter' is called.
2. The setter calls the component's 'requestUpdate' method.
3. The property's old and new values are compared. 
   - If the property has a 'hasChanged' function, it's called with the property's old and new values.
4. update
  - If the property change is detected, an update is scheduled asynchronously. 
  - If an update is already scheduled, only a single update is executed.
5. The component's update method is called, reflecting changed properties to attributes 
  and re-rendering the component's templates.

- There are many ways to hook into and modify the reactive update cycle. 
  For more information, see Reactive update cycle.
  - https://lit.dev/docs/components/lifecycle/#reactive-update-cycle


# property vs attribute
- https://www.geeksforgeeks.org/what-is-the-difference-between-properties-and-attributes-in-html/
- When the browser parses your HTML code, it creates a corresponding DOM node. 
  - The HTML properties are accessed from this node object.
- Attribute: 
  - Attributes are defined by HTML and are used to customize a tag.
  - '<button id="AttributeDemo" onclick="myFunction()">' 
    - Attributen 'id' und 'onclick'
  - The value of an attribute is constant  
- Property
  - In contrast to the attributes, which are defined in HTML, properties belong to the DOM. 
  - Since DOM is an object in JavaScript, we can get and set properties.
    - 'document.getElementById('AttributeDemo') = 100 '
  - The value of a property is variable.
- Schlussfolgerung
  - Attribute sind im HTML und Property im JS
  - Beim Parsen von HTML ensteht DOM
    - Für alle HTML Attributen werden entsprechende Properties im DOM Node erstellt
  - Attribute sind unveränderlich und Properties nicht
    - Änderung der Properties beinfluss das DOM und nicht HTML und Attributen
  - Attribute sind immer Strings 
  - Attribute werden genutzt für User-Eingaben 
    - UND NICHT für Innere Kontolle der CE
    - Property sollen für Innere Kontolle der CE genutzt wedern
    - ALSO Reflektierung der Properties auf Attribute ist NICHT gewöhnlich
    - Es kann zur unendliche Schleigfe führen aber NICHT beim LIT
    

# attributes
- https://lit.dev/docs/components/properties/#attributes
- While properties are great for receiving JavaScript data as input, 
- attributes are the standard way HTML allows configuring elements from markup, 
  without needing to use JavaScript to set properties.
- Providing both a property and attribute interface for their reactive properties 
  is a key way Lit components can be useful in a wide variety of environments, 
  including those rendered without a client-side templating engine, 
  such as static HTML pages served from CMSs. 
- By default, Lit sets up an observed attribute corresponding to each public reactive   
  property, and updates the property when the attribute changes. 
  Property values can also, optionally, be reflected (written back to the attribute).
- While element properties can be of any type, attributes are always strings
- To 'observe' an attribute (set a property from an attribute), 
  the attribute value must be converted from a string to match the property type.
- To 'reflect' an attribute (set an attribute from a property), 
  the property value must be converted to a string.
- Schlussfolgerung
  - DOM Properties sind NICHT gleich wie die LIT Reactive Properties 
  - 'observe' Attribut
    - nehmen Wert des Attributs und diesen in Property setzen
    - muss Beide gleichen Typ haben
  - 'reflect' Attribut
    - nehmen Wert des Property und diesen in Attributs setzen
    - Atributt Wert MUSS in String zuerst konvertiert werden


# HTML Properties vs. Reactive Properties 
- HTML Properties sind automatisch im DOM Node generiert von Browser
  - keine Deklaration nötig
  - ansprächbar über DOM JS Funktionen
  - korespondieren mit HTML Attributen automatisch 
  - Es muss zuerst ein Attribut im HTML sein
- LIT Reactive Properties
  - Deklaration durch Decoratoren nötig  
  - ansprächbar OHNE DOM JS Funktionen
  - Es muss zuerst KEIN Attribut im HTML sein
    - Lit kann korespondieren Attributen erstellen
       - NUR für 'property' automatisch und NICHT für 'state'
- die LIT Reactive Properties werden nach Rendering zum HTML Attributen 
  - genauso wie HTML Properties        

# HTML Attribut vs. korespondiere LIT Attribut
- HTML Attribut ist im HTML Tag im statischen HTML verbaut
  - Korespondiert mit DOM Node Property
- Korespondiere LIT Attribut im 'html' Template verbaut  
  - Korespondiert mit Reaktiven Property

# corresponding observed attribute 
- https://lit.dev/docs/components/properties/#observed-attributes
- default Lit creates a corresponding observed attribute for all public reactive properties. 
- The name of the observed attribute is the property name, lowercased
- To prevent an observed attribute from being created for a property, set attribute to false. 
  - @property({ attribute: false }) myData = {};
- An observed attribute can be used to provide an initial value for a property from markup. 
  - <my-element myvalue="99"></my-element>
- Schlussfolgerung
  - Nur 'property' haben Attribute 
  - Name des Attributs ist gleich wie Property nur kleingeschrieben


# Reaktive Property Änderungs Detektion
- https://lit.dev/docs/components/properties/#haschanged
- All reactive properties have a function, hasChanged(), which is called when property is set.
- 'hasChanged' compares the property's old and new values, 
  and evaluates whether or not the property has changed
- If hasChanged() returns true, Lit starts an element update if one is not already scheduled. 
- For more information on updates, see Reactive update cycle
  - https://lit.dev/docs/components/lifecycle/#reactive-update-cycle
- The default implementation of hasChanged() uses a strict inequality comparison: 
  - hasChanged() returns true if newVal !== oldVal.
- To customize hasChanged() for a property, specify it as a property option.










#  reactive-update-cycle
https://lit.dev/docs/components/lifecycle/#reactive-update-cycle
