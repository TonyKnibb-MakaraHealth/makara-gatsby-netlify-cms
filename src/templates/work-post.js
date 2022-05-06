import React from "react";
import PropTypes from "prop-types";
import {kebabCase} from "lodash";
import {Helmet} from "react-helmet";
import {graphql, Link} from "gatsby";
import Layout from "../components/Layout";
import Content, {HTMLContent} from "../components/Content";

// eslint-disable-next-line
export const WorkPostTemplate = ({
                                     content,
                                     contentComponent,
                                     description,
                                     tags,
                                     title,
                                     helmet,
                                 }) => {
    const PostContent = contentComponent || Content;

    return (
        <section className="px-2 sm:px-4">
            <div className="container max-w-6xl mx-auto">

                {helmet || ""}
                <div className="">
                    <h1 className="">{title}</h1>
                    <p>{description}</p>
                    <PostContent content={content}/>
                    {tags && tags.length ? (
                        <div className="mt-4">
                            <h4>Tags</h4>
                            <ul className="">
                                {tags.map((tag) => (
                                    <li key={tag + `tag`}>
                                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </div>

            </div>
        </section>
    );
};

WorkPostTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object,
};

const WorkPost = ({data}) => {
    const {markdownRemark: post} = data;

    return (
        <Layout>
            <WorkPostTemplate
                content={post.html}
                contentComponent={HTMLContent}
                description={post.frontmatter.description}
                helmet={
                    <Helmet titleTemplate="%s | Work">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.description}`}
                        />
                    </Helmet>
                }
                tags={post.frontmatter.tags}
                title={post.frontmatter.title}
            />
        </Layout>
    );
};

WorkPost.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
};

export default WorkPost;

export const pageQuery = graphql`
  query WorkPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
