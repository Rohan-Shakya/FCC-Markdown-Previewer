import marked from 'marked';
import React from 'react';
import './App.css';

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}'</a>'`;
};

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true,
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      markdown: e.target.value,
    });
  };

  handleEditorMaximize = () => {
    this.setState({
      editorMaximized: !this.state.editorMaximized,
    });
  };
  render() {
    return (
      <div className='wrapper'>
        <div className='editorBox'>
          <Toolbar text='Editor' onClick={this.handleEditorMaximize} />
          <Editor markdown={this.state.markdown} onChange={this.handleChange} />
        </div>
        <div className='previewBox'>
          <Toolbar text='Previewer' />
          <Preview markdown={this.state.markdown} />
        </div>
      </div>
    );
  }
}

const Toolbar = (props) => {
  return (
    <div className='toolbar'>
      <i className='fas fa-newspaper'></i>
      {props.text}
      <i onClick={props.onClick}></i>
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      value={props.markdown}
      type='text'
      id='editor'
      onChange={props.onChange}
    />
  );
};
const Preview = (props) => {
  return (
    <div
      id='preview'
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer }),
      }}
    />
  );
};

const placeholder = `

# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, <div></div>, between 2 backticks.

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here...
And here. | Okay. | I think we get it.

- And of course, there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That looks like this.


1. And there are numbered lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://source.unsplash.com/user/erondu/700x500)`;
