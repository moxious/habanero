import React, { Component } from 'react';
import Jolokia from 'jolokia';
import _ from 'lodash';
// import JSONPretty from 'react-json-pretty';

class JolokiaBackedComponent extends Component {
    constructor(props) {
        super(props);
        this.name = 'Unnamed Jolokia Backed Component';

        this.timer = setInterval(() => {
            console.log('Reloading ',this.name);
            this.load();
        }, props.reloadTimeoutMs || 2000);

        this.jolokia = new Jolokia({
            url: props.url || 'http://localhost:8778/jolokia/', // use full url when in Node.js environment
            method: 'post', // force specific HTTP method
        });        
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentDidMount() {
        this.load()
            .then(data => this.setState(data))
            .catch(err => {
                console.error(`Component ${this.componentName} failed to load`, err);
            });
    }

    load() { return Promise.resolve({}); }

    getAvailable() {
        return this.jolokia.list()
            .then(data => {
                const mbeans = _.flatten(Object.keys(data).map(topLevelKey => {
                    const sub = data[topLevelKey];

                    return Object.keys(sub).map(item => `${topLevelKey}:${item}`);
                }));
                return mbeans;
            });
    }
}

export default JolokiaBackedComponent;
