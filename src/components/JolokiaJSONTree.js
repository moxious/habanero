import React, { Component } from 'react';
import JolokiaBackedComponent from './JolokiaBackedComponent';
import Promise from 'bluebird';
import Jolokia from 'jolokia';
import flatten from 'flat';
import JSONTree from 'react-json-tree'

import './JolokiaJSONTree.css';

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
};

const getItemString = (type, data, itemType, itemString) => {
    // Controls whether tree displays that something's an object with 10 children.
    // return (<span>{itemType} {itemString}</span>);
    return '';
};

class JolokiaJSONTree extends JolokiaBackedComponent {
    constructor(props) {
        super(props);
        this.name = props.title;
    }

    load() {
        // const p = 'instance=kernel#0,name=Configuration';
        const p = this.props.p;

        const key = p.startsWith(this.props.prefix + ':') ? p : (this.props.prefix + ':' + p);

        return this.jolokia.get(key)
            .then(d => this.setState(flatten.unflatten(d)))
            .catch(err => console.error('Error', err));
    }

    render() {
        if (!this.state) { return (<div />); }
        return (
            <div className="JolokiaJSONTree">
                <h2>{this.props.title}</h2>
                <JSONTree data={this.state} getItemString={getItemString} theme={{
                    extend: theme,
                    valueLabel: {
                        textDecoration: 'none'
                    },
                    // switch key for objects to uppercase when object is expanded.
                    // `nestedNodeLabel` receives additional arguments `expanded` and `keyPath`
                    nestedNodeLabel: ({ style }, nodeType, expanded) => {
                        // console.log(style, nodeType, expanded);
                        return {
                            style: {
                                ...style,
                                // textTransform: expanded ? 'uppercase' : style.textTransform
                            }
                        };
                    }
                }} />
            </div>
        );
    }
}

export default JolokiaJSONTree;
