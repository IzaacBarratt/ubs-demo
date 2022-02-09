import React, { useState, useEffect } from "react";
import NavigationTree from "./components/navigation_tree";
import { Application } from "./interfaces/application";


function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isAppLoading, setAppIsLoading] = useState(false);
  const [selectedNavLayer, setSelectedNavLayer] = useState<string>("1.1.1");

  useEffect(() => {
    async function fetchAppsAPI() {
      setAppIsLoading(true);
      let response = await fetch('http://localhost:8080/data');
      let applicationData = await response.json() as Application[];
      setApplications(applicationData);
      setAppIsLoading(false);
    }
    fetchAppsAPI();
  }, [])

  function updateNavSelection(key: string) {
    
    setSelectedNavLayer(key)
  }

  return (
    <div>
      <h1>Pharos Coding Exercise</h1>
      
      <div>
        <h2>components</h2>
        <div id="components">
          <h3>nav tree</h3>  
          {}
          {
            (applications.length > 0) 
             ? <NavigationTree applications={applications} selectedLayer={selectedNavLayer} onUpdateSelection={updateNavSelection}/>
             : <p>Not ready yet</p>
          }

        </div>
      </div>
    </div>
  );
}

export default App;
