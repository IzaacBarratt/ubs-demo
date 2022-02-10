import React, { useState, useEffect } from "react";
import ApplicationViewer from "./components/application_viewer";
import NavigationTree from "./components/navigation_tree";
import Slider from "./components/slider";
import { Application } from "./interfaces/application";
import "./styles.css";

function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isAppLoading, setAppIsLoading] = useState(false);
  const [selectedBCaps, setselectedBCaps] = useState<string>("1.1.1");
  const [selectedSpending, setSelectedSpending] = useState(0)

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
    setselectedBCaps(key)
  }
  function updateSliderSelection(value: number) {
    setSelectedSpending(value);
  }


  return (
    <div>
      <h1>Pharos Coding Exercise</h1>

      <div className="main">
      {
        (isAppLoading)
          ? <><h1>LOADING!!!</h1></>
          : (applications.length == 0)
        
            ? <h2>Error loading applications, please restart app</h2>
            : <div id="main-panel">
                <div className="main-panel_navigation">
                  <h2>Navigation</h2>
                    <div>
                      <NavigationTree applications={applications} onUpdateSelection={updateNavSelection}/>
                      <Slider applications={applications} onSliderUpdate={updateSliderSelection}/>    
                    </div>
                  </div>
                <div className="main-panel_app-viewer">
                  <h2>App Viewer</h2>
                  <ApplicationViewer applications={applications} selectedBCaps={selectedBCaps} selectedSpending={selectedSpending}/>
                </div>
          </div>
      }
      </div>
    </div>
  );
}

export default App;
