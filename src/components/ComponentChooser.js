import React, { Component } from 'react';
import JolokiaBackedComponent from './JolokiaBackedComponent';
import Promise from 'bluebird';
import Jolokia from 'jolokia';
import flatten from 'flat';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './ComponentChooser.css';


class ComponentChooser extends JolokiaBackedComponent {
    constructor(props) {
        super(props);
    }

    load() {
        return this.getAvailable()
            .then(list => {
                return list.filter(i => i.indexOf(this.props.filter) !== -1 && i.indexOf('name=') !== -1)
                    .map(i => {
                        const label = i.substring(i.indexOf('name=') + 5);
                        const p = {
                            prefix: this.props.filter,
                            value: i,
                            label,
                        };
                        return p;
                    });
            })
            .then(available => this.setState({ available }));
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log('Selected:', selectedOption);
        this.props.app.addComponent(selectedOption);
    }

    render() {
        if (!this.state || !this.state.available) { return '<div/>'; }

        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;

        return (
            <div className="ComponentChooser">
                <Select
                    name="form-field-name"
                    value={value}
                    onChange={this.handleChange}
                    options={this.state.available}
                />
            </div>
        );
    }
}

export default ComponentChooser;
