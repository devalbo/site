import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import AutofillOptions from './AutofillOptions';
import { getBip0039Words } from './wordutils';

class WordInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            seedWords: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.wordSelected = this.wordSelected.bind(this);
        console.log(props.index);
    }
    
    getValidationState() {
        const wordlist = getBip0039Words();
        const inputWord = this.state.value;
        if (wordlist.indexOf(inputWord) > -1) {
            return 'success';
        }
        return 'error';
        // const length = this.state.value.length;
        // if (length > 10) return 'success';
        // else if (length > 5) return 'warning';
        // else if (length > 0) return 'error';
        // return null;
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
        this.props.onWordChange(this.props.index, e.target.value);
    }

    wordSelected(word) {
        this.setState({value: word});
    }

    render() {
        return (
            <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
                >
                <ControlLabel>Word {this.props.index}</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <AutofillOptions
                    prefix={this.state.value}
                    wordSelected={this.wordSelected}
                />
                {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
            </FormGroup>

            // <Row>
            //     <FormGroup
            //         controlId="formBasicText"
            //         validationState={this.getValidationState()}
            //         >
            //         <Col md={3}>
            //             <ControlLabel>Word {this.props.index}</ControlLabel>
            //         </Col>
            //         <Col md={6}>
            //             <FormControl
            //                 type="text"
            //                 value={this.state.value}
            //                 placeholder="Enter text"
            //                 onChange={this.handleChange}
            //             />
            //             <FormControl.Feedback />
            //         </Col>
            //         <Col md={3}>
            //             <HelpBlock>Validation is based on string length.</HelpBlock>
            //         </Col>
            //     </FormGroup>
            // </Row>
        );
    }
}

export default WordInput;