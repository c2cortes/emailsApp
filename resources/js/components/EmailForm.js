import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Alert, Button, Row, Col, FormGroup, FormControl, HelpBlock, FieldGroup } from 'react-bootstrap';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

export default class EmailForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            subject: '',
            validationErrorMessage: '',
            editorState: EditorState.createEmpty()
        };
        this.onChange = (editorState) => this.setState({editorState});
        this.onChange = this.onChange.bind(this);
        this.onUnderlineClick = this.onUnderlineClick.bind(this);
        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicClick = this.onItalicClick.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.setEditor = (editor) => {
        this.editor = editor;
        };
        this.focusEditor = () => {
        if (this.editor) {
            this.editor.focus();
        }
        };
    }

    onChange(editorState) {
        this.setState({
          editorState 
        }) 
    }

    handleKeyCommand(command){
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
    }

    sendData(){
        let contentState    = this.state.editorState.getCurrentContent(),
            subject         = this.state.subject,
            content         = contentState && convertToRaw(contentState).blocks[0].text,
            url             = '../emails/save/' + subject + '/' + content;
            
          axios.get(url)
            .then(response => {
                if(response.statusText === 'OK') {
                    window.location.href = '../emails';
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    handleSend(e) {
        e.preventDefault();

        let showAlert       = false,
            alertMessage    = '',
            subject         = this.state.subject,
            contentState    = this.state.editorState.getCurrentContent(),
            content         = contentState && convertToRaw(contentState).blocks[0].text;

        if(subject === '') {
            showAlert = true;
            alertMessage = 'Insert a subject';
        } else if(content === ''){
            showAlert = true;
            alertMessage = 'Insert a content for the email';
        } else {
            this.sendData();
        }

        this.setState({ showAlert, alertMessage });
    }

    onUnderlineClick(e) {
        e.preventDefault();
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
      }
    
      onBoldClick(e) {
        e.preventDefault();
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
      }
    
      onItalicClick(e) {
        e.preventDefault();
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
      }

    render() {
        return(
            <div>
                
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        { this.state.showAlert ? <Alert variant='danger'>{this.state.alertMessage}</Alert> : null }
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control type="text" placeholder="Enter the subject" onChange= { (val) => this.setState({subject: val.target.value} ) } />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Content</Form.Label>

                                <div className="editorContainer">
                                    <button onClick={this.onUnderlineClick}>U</button>
                                    <button onClick={this.onBoldClick}><b>B</b></button>
                                    <button onClick={this.onItalicClick}><em>I</em></button>        
                                    <div className="editors">
                                        <Editor 
                                            className='RichEditor-editor'
                                            editorState={this.state.editorState}
                                            handleKeyCommand={this.handleKeyCommand}
                                            onChange= { this.onChange }
                                        />
                                    </div>
                                </div>
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" onClick={ this.handleSend }>
                                Submit
                            </Button>
                        </Form>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('emailform')) {
    ReactDOM.render(<EmailForm />, document.getElementById('emailform'));
}
