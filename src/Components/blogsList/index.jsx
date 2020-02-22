import React from 'react';
import { Headline4 } from '@material/react-typography';
import BlogCard from './BlogCard';
import { gql } from 'apollo-boost';
// import blogs from './blogs';
import { Query } from "react-apollo";

const BlogsList = () => {
  const query = gql`
  {
    blogs {
      _id
      userId{
        name
      }
      title
      tags
      content
    }
  }
`;
  // const BlogsArray = ()
  return (
    <div className="mw7 ma3 pa2 center">
      <Headline4 className="purple">Blogs</Headline4>
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return data.blogs.map(blog => (
            <BlogCard
              key={blog._id}
              tags={blog.tags}
              id={blog.id}
              date={blog.date}
              name={blog.title}
              timeToRead={blog.timeToRead}
              author={blog.userId.name}
              updated={blog.updated}
              content={blog.content}
            />
          ));
        }}
      </Query>
    </div>
  );
};

export default BlogsList;
