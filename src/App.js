import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JolokiaJSONTree from './components/JolokiaJSONTree';
import ComponentChooser from './components/ComponentChooser';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CloseTabButton from './components/CloseTabButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { components: [] };
  }

  getDisplayedComponents() {
    return this.state.components;
  }

  addComponent(option) {
    console.log('add component', option);
    console.log(this.state);
    this.setState({
      components: this.state.components.concat([option]),
    });
  }

  dismissTab(item) {
    console.log('dismiss tab', item);

    const components = this.state.components.filter(c => c !== item);
    this.setState({ components });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='logo.png' className="App-logo" alt="logo" />
          <h1 className="App-title">Habanero</h1>
        </header>

        <p className="App-intro">
          A quick and dirty monitoring application for Neo4j, based on JMX.
        </p>

        <div class='App-body'>
          <h2>Select a Monitoring Component to add</h2>
          <ComponentChooser filter='org.neo4j' app={this} />

          <Tabs>
            <TabList>
              <Tab>Configuration</Tab>
              <Tab>Store File Size</Tab>
              {
                ((this.state || {}).components || []).map((item, idx) => (
                  <Tab key={idx}>{item.label} <CloseTabButton app={this} item={item}/></Tab>
                ))
              }
            </TabList>

            <TabPanel>
              <JolokiaJSONTree 
                reloadTimeoutMs="1000000" 
                title='Neo4j Configuration' 
                prefix='org.neo4j'
                p='instance=kernel#0,name=Configuration' />
            </TabPanel>

            <TabPanel>
              <JolokiaJSONTree 
                reloadTimeoutMs="2000" 
                title='Store File Sizes' 
                prefix='org.neo4j'
                p='instance=kernel#0,name=Store file sizes' />
            </TabPanel>

            {
              ((this.state || {}).components || []).map((item, idx) => (
                <TabPanel key={idx}><JolokiaJSONTree prefix={item.prefix} title={item.label} p={item.value} /></TabPanel>
              ))
            }
          </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
