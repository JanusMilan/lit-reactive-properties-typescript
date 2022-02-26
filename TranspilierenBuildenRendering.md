
# Ausgangslage im Bezug zum Routing
- Haupt-Komponente 'main-viewer' beinhaltet in sich die Unter-Komponente 'address-viewer'
  - <address-viewer .userId=${this.userId}></address-viewer>
- Routing
  - Da 'address-viewer' nicht über 'slot' sondern direkt im 'main-viewer' verbaut wird 
    - so ist HIER Routing FALSCHE ANSATZ
- Statt Routing wird hier CE 'main-viewer' direkt im 'index.html' verankert 
  - <main-viewer></main-viewer>

# Rendering
- OHNE Routing
1. Transpilieren mit TSC
   - basiert auf 
     - Config 'tsconfig.json'
       - "outDir": "out-tsc"
         - Ausgabe des Transpilierens
       - "include": ["src/**/*.ts"]
         - Eingabe des Transpilierens
     - 'index.ts'
       - import "./src/main-viewer.ts"
         - Angabe der Haupt Komponente
2. Build mit Rollup
   - basiert auf 
     - 'rollup.config.js'
       - input: './index.html'
         - dort sucht Rollup die Eingabe type="module"
     - 'index.html'
       - script type="module" src="./out-tsc/src/main-viewer.js"></script> 
         - Angabe der transpilierte JavaScript Haupt Komponente
   - Build wird per default in 'dist' ausgegeben
3. Testen
   - basiert auf 
     - 'dist'
     - 'index.html'
       - <main-viewer></main-viewer>

# Schlussfolgerung: vaadinRouter Beispiel vs. dieses Beispiel
1. Im Vaadin werden Unter-Komponenten über 'slots' indirekt eingebunden 
   - Deswegen braucht mat Router um die Einbindungen konkret zu definieren
   - HIER ist Anker im 'index.html' NICHT Haupt-Komponente sondern Router-Komponente 'index.js'
     - Deswegen wird die Haupt-Komponente NICHT im 'index.html' eingebunden  
   - HIER ist klassiche 'index.ts' mit dem Link der Haupt-Komponente  NICHT nötig 
     da Haupt-Komponente NICHT im 'index.html' direkt über CE eingebunden ist
     - Hier wird Router-Komponente 'index.js' genannt was zur Verwirrung 
       mit 'index.ts' (wie HIER) mit dem Link der Haupt-Komponente führt 
       - Besser wurde die Router-Komponente 'router.js' heißen 
2. Hier ist Unter-Komponente direkt in Haupt-Komponente eingebunden
   - HIER ist Anker im 'index.html' die Haupt-Komponente 'main-viewer' 
     - Deswegen wird die Haupt-Komponente <main-viewer> im 'index.html' eingebunden  
3. In beiden Fällen 
   - sind Config für TSC 'tsconfig.json' und für Rollup 'rollup.config.js' gleich         
3. Schlussfolgerung
   - Zwei Arten der Rendering bzw. Einbindung der Unter-Komponenten
     - indirekt mit Routing über 'slot'
     - OHNE Routing über direkte Verankerung der Unter-Komponenten in Haupt-Komponente
   - Unterschiede liegen im
     - Art der Einbindung der Unter-Komponenten       
     - Konfiguration der Building
       - 'index.html' 
          - Beim Routing braucht man kein CE <> direkt zu verankern in HTML     
