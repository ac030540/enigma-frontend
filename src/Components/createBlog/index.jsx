import React, { useState } from 'react';
import { Headline4 } from '@material/react-typography';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';

const BlogsList = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  return (
    <div className="mw7 ma3 pa2 center">
      <Headline4 className="purple">Create a blog</Headline4>
      <TextField
        label="Title"
        className="pa2 mb4 w-100"
        outlined
      >
        <Input
          value={title}
          onChange={e => setTitle(e.currentTarget.value)}
        />
      </TextField>
      <TextField
        label="Your content goes here..."
        className="pa2 mb4"
        style={{ height: '300px', width: '100%' }}
        textarea
      >
        <Input
          value={content}
          onChange={e => setContent(e.currentTarget.value)}
        />
      </TextField>
      <TextField
        label="Your tags (Comma seperated)"
        className="pa2 mb4"
        style={{ width: '100%' }}
        textarea
      >
        <Input
          value={tags}
          onChange={e => setTags(e.currentTarget.value)}
        />
      </TextField>
      <Button outlined className="">
        Submit
      </Button>
    </div>
  );
};

export default BlogsList;
